"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

async function submitJson(url: string, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  if (!response.ok || !json.ok) throw new Error(json.error || "Submission failed.");
  return json;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    try {
      await submitJson("/api/contact", event.currentTarget);
      event.currentTarget.reset();
      setState("success");
      setMessage("Thanks. Your message has been received.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <label className="grid gap-2 text-sm font-medium">
        Name
        <input className="field" name="name" required minLength={2} autoComplete="name" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input className="field" name="email" type="email" required autoComplete="email" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea className="field min-h-32" name="message" required minLength={20} />
      </label>
      <button className="button button-primary w-fit" disabled={state === "loading"} type="submit">
        <Send size={16} />
        {state === "loading" ? "Sending..." : "Send message"}
      </button>
      <p className="min-h-6 text-sm" role="status" aria-live="polite" style={{ color: state === "error" ? "#dc2626" : "var(--text-secondary)" }}>
        {message}
      </p>
    </form>
  );
}

export function FeedbackForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    try {
      await submitJson("/api/feedback", event.currentTarget);
      event.currentTarget.reset();
      setState("success");
      setMessage("Thanks. Your feedback was submitted.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <label className="grid gap-2 text-sm font-medium">
        Name
        <input className="field" name="name" autoComplete="name" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Email optional
        <input className="field" name="email" type="email" autoComplete="email" />
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Feedback
        <textarea className="field min-h-28" name="message" required minLength={10} />
      </label>
      <button className="button button-primary w-fit" disabled={state === "loading"} type="submit">
        {state === "loading" ? "Submitting..." : "Submit feedback"}
      </button>
      <p className="min-h-6 text-sm" role="status" aria-live="polite" style={{ color: state === "error" ? "#dc2626" : "var(--text-secondary)" }}>
        {message}
      </p>
    </form>
  );
}
