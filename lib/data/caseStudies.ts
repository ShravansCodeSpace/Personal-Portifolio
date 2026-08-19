export interface CaseStudySection {
  heading: string;
  body: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  resolution: string;
  image: string;
  imageAlt: string;
  tags: string[];
  sections: CaseStudySection[];
  takeaways: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "sap-commerce-indexing-beyond-basics",
    title: "Indexing Beyond the Basics",
    eyebrow: "SAP Commerce performance pattern",
    summary:
      "A public-safe implementation note on a recent SAP Commerce preference feature: the business rule, the indexes I added, where uniqueness is actually required, and why one main preference lookup index did not need `unique=true` for the feature to be correct.",
    problem:
      "The platform needed preference records that could be fetched quickly for a single user and preference type without creating duplicate active buckets. The challenge was designing the right lookup indexes while separating feature-level duplicate prevention from database-level uniqueness constraints.",
    resolution:
      "I mapped each index to a real query pattern, kept the composite index for the single preference fetch, and relied on the feature's controlled save/update flow to prevent duplicate main preference buckets. Entry-level uniqueness remains valid where list values must stay unique inside a bucket.",
    image: "/assets/case-studies/indexing-overview.svg",
    imageAlt: "Abstract database indexing flow with query paths and deployment guardrails",
    tags: ["SAP Commerce", "Items.xml", "Indexing", "SQL Server", "Performance", "Deployment Risk"],
    sections: [
      {
        heading: "Requirement",
        body: [
          "The requirement was to support a user preference capability in SAP Commerce where preferences can be stored and retrieved for a user across different modes such as single-value, JSON-style, and list-style preferences. For the main preference bucket, a single user should not end up with duplicate records for the same preference context.",
          "The item type already had an index, so the work was not simply about adding more database indexes. It was about proving which query patterns needed support, preserving write performance, and deciding where each uniqueness rule belonged: main bucket resolution in the feature flow, and list-entry uniqueness at the entry level."
        ]
      },
      {
        heading: "Feature Behavior",
        body: [
          "The feature was designed around a controlled save flow. When a user saves a preference, the application resolves the existing bucket for that user, preference type, identity, and storage mode, then updates that bucket or creates one only when no matching bucket exists.",
          "That means a normal single-user flow does not blindly insert duplicate preference buckets. For list-style preferences, individual entries are handled separately: re-saving an existing value updates/reorders the existing entry rather than creating another row for the same value. That is why entry-level uniqueness for `bucket + valueHash` is still a sensible constraint, while main bucket uniqueness is not the only thing protecting the feature."
        ]
      },
      {
        heading: "Implementation I Delivered",
        body: [
          "I reviewed the access patterns first, then implemented separate indexes only where the application genuinely queried by a distinct shape. The existing scoped lookup index stayed in place, one new composite index supported the primary user-preference bucket fetch, and another composite index supported a background process that filters by type and modified time.",
          "I initially evaluated the primary composite index as a possible unique index because the business rule is one active preference bucket per user context. After reviewing how the feature writes data, the important distinction became clear: the composite index was required for fast lookup, but `unique=true` on that main lookup was not required for functional correctness because the save flow already resolves and updates the existing bucket."
        ]
      },
      {
        heading: "Indexing Review Framework",
        body: [
          "Before finalizing the change, I checked whether the application filtered on each attribute, how frequently the query ran, whether the table volume justified an index, how selective the values were, and whether any existing index already covered the same leftmost-prefix pattern.",
          "This review prevented the common mistake of indexing every new attribute by default. The goal was to keep lookup paths fast while protecting write performance, especially because SAP Commerce tables are often touched by APIs, imports, CronJobs, sync jobs, and integrations."
        ]
      },
      {
        heading: "Issue Faced During Deployment",
        body: [
          "The deployment risk appeared when the main preference lookup index was marked unique. Newly introduced dimensions can be empty on historical rows, so the database may treat those rows as duplicate candidates for the unique constraint even though the new application flow is not creating duplicates.",
          "That made the issue a data-history and constraint-scope problem rather than a feature-logic problem. The feature could prevent duplicate main buckets going forward, but a database unique constraint still has to validate everything already present in the table."
        ]
      },
      {
        heading: "Why Unique Was Not Required",
        body: [
          "`unique=true` on the main preference lookup was not the rule that made the feature safe. The feature safety came from resolving the existing bucket by user and preference context before writing, then updating that bucket instead of blindly inserting a new one.",
          "A unique database index on the main bucket could still be useful as a defensive guardrail if future imports, scripts, or direct data fixes bypassed the service path. But it was not the core implementation. Releasing that lookup as a plain composite index preserved the required read performance while keeping duplicate prevention in the controlled save flow.",
          "This does not mean every uniqueness rule was removed. For preference list entries, uniqueness on `bucket + valueHash` is still appropriate because the business rule is different: the same value should not appear twice inside the same list bucket."
        ]
      },
      {
        heading: "Why I Did Not Force A Migration",
        body: [
          "A quick migration looked attractive, but it was not the safest immediate fix. The new attributes did not exist when the older rows were created, so there was no reliable source of truth for backfilling every row. Some records could also require merging, which becomes a business decision because data may be lost depending on which row wins.",
          "The same migration would also need to run safely across every environment with different data volumes and edge cases. Since the application layer already prevented new duplicates, blocking deployment for a rushed, irreversible cleanup would have created more risk than value."
        ]
      },
      {
        heading: "Final Resolution",
        body: [
          "I removed the uniqueness flag from the main preference lookup index while keeping the composite index itself for lookup performance. This allowed the feature to use the intended fast lookup path and preserved the application-level rule that a single user should not get duplicate preference buckets.",
          "The database-level uniqueness rule for the main bucket remains a possible hardening step for later, but it should be introduced only after a deliberate cleanup plan defines how legacy rows should be backfilled, merged, or retained based on approved business rules. Entry-level uniqueness remains valid where the list-entry model needs to prevent duplicate values inside a bucket."
        ]
      },
      {
        heading: "Outcome",
        body: [
          "The feature moved forward without sacrificing performance or forcing unsafe legacy-data changes. The final design separated what was required immediately for runtime performance from what should be handled later as controlled data governance.",
          "The main engineering lesson was that SAP Commerce indexing is not just an items.xml change. It touches query design, data volume, historical records, deployment behavior, and the operational risk of every environment where the platform runs."
        ]
      }
    ],
    takeaways: [
      "Index primary lookup attributes first, then validate every other index against real query behavior.",
      "Multiple indexes on one item type are acceptable only when each supports a distinct access pattern.",
      "Application flow can be the primary duplicate-prevention mechanism for main preference buckets when writes are centralized and controlled.",
      "Use database uniqueness where the business rule needs it, such as preventing duplicate list entries within the same bucket.",
      "A unique index can be a defensive database constraint, but it is not always required on every lookup index for feature correctness.",
      "For new attributes on existing rows, legacy NULL values can block deployment even when the new feature logic is correct.",
      "A reversible metadata change can be safer than a rushed, lossy migration when uniqueness is a hardening layer."
    ]
  },
  {
    id: "orika-order-mapper-bytecode-limit",
    title: "When Mapping Becomes Too Big",
    eyebrow: "SAP Commerce debugging note",
    summary:
      "A public-safe debugging note on an SAP Commerce OCC startup failure caused by Orika generating an oversized mapper method for a large order response DTO. The generated method crossed the JVM method bytecode limit by just 5 bytes.",
    problem:
      "A colleague's feature enhancement introduced a small DTO change, but server startup failed while Spring was creating the dataMapper dependency. The visible error looked like a bean creation problem, while the real issue was Orika generating a mapper method larger than the JVM allows.",
    resolution:
      "I traced the failure to the generated OrderData to OrderWsDTO mapper, then recommended keeping common fields in Orika mapping while enriching feature-specific response fields directly on the WS DTO after base mapping.",
    image: "/assets/case-studies/orika-order-mapper-bytecode-limit.gif",
    imageAlt: "Animated explanation of Orika mapper bytecode exceeding the JVM method limit",
    tags: ["SAP Commerce", "OCC", "Java", "Orika", "DTO Mapping", "Startup Failure", "Architecture"],
    sections: [
      {
        heading: "Incident Context",
        body: [
          "One of my colleagues was working on a feature enhancement where a small DTO change caused server startup to fail. Once the issue came up, I stepped in to analyze what was failing and why it was happening.",
          "At first, the failure looked like a normal Spring bean creation issue because the stack trace surfaced around a controller dependency. The actual root cause was deeper: Orika generated a mapper method with invalid bytecode size."
        ]
      },
      {
        heading: "Root Cause",
        body: [
          "The key error was `java.lang.ClassFormatError: Invalid method Code length 65540`. The JVM allows a maximum method bytecode size of 65535 bytes, and in this case the generated mapper method crossed that limit by just 5 bytes.",
          "That small overflow was the important clue. The feature change itself was not huge, but the existing order mapper was already very close to the JVM limit. A few additional mapped fields were enough to push it over."
        ]
      },
      {
        heading: "Why It Happened",
        body: [
          "In SAP Commerce OCC, facade data objects are commonly mapped to webservice DTOs through the `dataMapper`, which uses Orika internally. A common example is `OrderData -> OrderWsDTO`.",
          "For smaller DTOs this works smoothly. But when a DTO grows over time with common fields, regional fields, and feature-specific fields, Orika can generate one very large mapping method. At that point, the risk is not the business logic itself. The risk is the size of the generated bytecode."
        ]
      },
      {
        heading: "Failure Chain",
        body: [
          "The failure chain was: controller dependency requires `dataMapper`, `dataMapper` initializes Orika mappings, Orika generates the order mapper, the generated method exceeds the JVM bytecode limit, and Spring cannot finish startup.",
          "This made the issue easy to misread if we only looked at the first visible bean in the stack trace. The controller was only where the dependency surfaced. The mapper generation was where the failure actually happened."
        ]
      },
      {
        heading: "Design Adjustment",
        body: [
          "The safer design was not to remove valid response fields. The better design was to reduce what the automatic mapper was responsible for.",
          "The common order fields can still be mapped using Orika. Feature-specific fields can then be populated directly on the target `OrderWsDTO` through a WS enrichment populator after the base mapping is complete. This keeps the API response unchanged while avoiding growth in the already-heavy generated mapper."
        ]
      },
      {
        heading: "Review Questions",
        body: [
          "During the analysis, the important questions were: is this field needed in every order response, should it be part of the default mapping, can it be populated only for the feature flow, and are we increasing a shared DTO mapper for a use case that is not truly shared?",
          "Those questions changed how I looked at large DTO design. A large DTO is not just a response contract. It can also become a hidden startup risk when too much is pushed through automatic mapping."
        ]
      },
      {
        heading: "Final Takeaway",
        body: [
          "The issue was not that the fields were wrong. The issue was that too many fields were being mapped through one generated Orika method.",
          "Sometimes the cleanest fix is not to remove the field. It is to reduce what the mapper is responsible for."
        ]
      }
    ],
    takeaways: [
      "Generated mapper code can fail at startup when a large DTO crosses the JVM method bytecode limit.",
      "A small feature change can trigger the failure if the existing mapper is already close to the limit.",
      "The first visible Spring bean failure may only be the injection point, not the true root cause.",
      "Large OCC DTOs should not automatically absorb every feature-specific field into default Orika mapping.",
      "Use Orika for common response fields and direct WS DTO enrichment for feature-specific fields when the mapper is already high-risk.",
      "Before adding fields to large order or cart responses, check whether the field is required by every API flow and field-set level."
    ]
  }
];
