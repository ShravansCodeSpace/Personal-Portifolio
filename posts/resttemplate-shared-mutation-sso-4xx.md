---
title: "When a 4xx Spike Was Not Just Bad Input"
subtitle: "Debugging shared RestTemplate message converter mutation in an SAP Commerce SSO flow"
date: "2026-08-19"
tags:
  - SAP Commerce
  - Hybris
  - Spring
  - RestTemplate
  - SSO
  - OCC
  - Concurrency
  - Architecture
cover: "../public/assets/case-studies/resttemplate-shared-mutation.svg"
---

# SAP Commerce Debugging Notes: When a 4xx Spike Was Not Just Bad Input

Recently, I analyzed an issue where a mobile login/user-details endpoint started showing a sharp increase in 4xx responses.

At first glance, it looked like an SSO token problem.

The logs had signals like:

```text
invalid_grant
AUT_1803
refresh_token parameter is incorrect
'messageConverters' must not contain null elements
```

The first few errors point you toward tokens.

But the last one points somewhere else entirely:

```text
Spring HTTP message converter configuration
```

## The Important Distinction

The problem was not that `StandardCharsets.UTF_8` was added.

Adding an explicit UTF-8 `StringHttpMessageConverter` can be valid.

In this flow, the SSO/user-details call reads the response as `String.class`, then passes that response to a parser.

So Spring needs a `StringHttpMessageConverter` to decode the response bytes into a Java `String` before parsing happens.

The real issue was how the converter was added.

```java
restTemplate.getMessageConverters().removeIf(c -> c instanceof StringHttpMessageConverter);
restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
```

`getMessageConverters()` does not return a safe copy.

It returns the actual mutable converter list inside the shared Spring singleton `RestTemplate`.

That means the code was changing live HTTP client configuration during request execution.

## What Can Go Wrong?

In a high-traffic login flow, this creates a race window:

```text
Request A starts
  gets shared RestTemplate
  removes StringHttpMessageConverter

Request B starts at the same time
  gets the same shared RestTemplate
  tries to use converters
  sees incomplete/inconsistent list
  SSO call fails

Request A adds UTF-8 converter back
```

Even if Request A eventually adds the converter back, Request B can fail during the temporary bad state.

That explains the production symptom:

```text
Mobile login/user-details endpoint
  -> SSO validation/refresh
    -> shared RestTemplate converter list is unstable
      -> token/user calls fail
        -> endpoint returns 400/401/4xx
```

## Bad Design

- Mutating `getMessageConverters()` during request execution
- Repeatedly adding/removing converters on a singleton `RestTemplate`
- Blindly adding `FormHttpMessageConverter` multiple times
- Treating framework configuration as hot-path request logic

## Better Design

- Configure converters once during bean creation or startup
- Use a dedicated SSO `RestTemplate` with stable converters
- If defensive cleanup is unavoidable, copy the list, clean it, remove nulls, synchronize carefully, then call `setMessageConverters(updated)` once

## Final Takeaway

The bug was not UTF-8.

The bug was runtime mutation of a shared HTTP client configuration object.

Encoding configuration belongs at startup, not in the hot request path.

This case reminded me that not every 4xx spike is caused by a bad client request.

Sometimes the API response is only the smoke, and the fire is hidden inside shared infrastructure code.

---

**LinkedIn hashtags:**

`#SAPCommerce` `#Hybris` `#SpringFramework` `#RestTemplate` `#SSO` `#OCC` `#Concurrency` `#PerformanceOptimization` `#SoftwareArchitecture`
