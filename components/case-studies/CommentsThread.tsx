"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

interface PublicComment {
  id: string;
  displayName: string;
  context: string;
  message: string;
  createdAt: string;
}

interface CommentsThreadProps {
  caseStudyId: string;
}

type LoadState = "loading" | "ready" | "unavailable";

export function CommentsThread({ caseStudyId }: CommentsThreadProps) {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [displayName, setDisplayName] = useState("");
  const [context, setContext] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [ownerToolsAvailable, setOwnerToolsAvailable] = useState(false);
  const [ownerMode, setOwnerMode] = useState(false);
  const [ownerToken, setOwnerToken] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace("#", "");
    const shouldShowOwnerTools = params.get("owner") === "comments" || hash === "owner-comments";

    setOwnerToolsAvailable(shouldShowOwnerTools);
    if (!shouldShowOwnerTools) {
      setOwnerMode(false);
      setOwnerToken("");
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadComments() {
      setLoadState("loading");
      try {
        const response = await fetch(`/api/comments?caseStudyId=${encodeURIComponent(caseStudyId)}`, {
          cache: "no-store"
        });
        const payload = (await response.json()) as { comments?: PublicComment[]; unavailable?: boolean };

        if (!active) return;
        setComments(payload.comments || []);
        setLoadState(payload.unavailable ? "unavailable" : "ready");
      } catch {
        if (!active) return;
        setLoadState("unavailable");
      }
    }

    loadComments();

    return () => {
      active = false;
    };
  }, [caseStudyId]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseStudyId,
          displayName,
          context,
          message,
          website
        })
      });
      const payload = (await response.json()) as { comment?: PublicComment; error?: string };

      if (!response.ok || !payload.comment) {
        setStatus(payload.error || "Comment could not be posted.");
        return;
      }

      setComments((current) => [...current, payload.comment as PublicComment]);
      setDisplayName("");
      setContext("");
      setMessage("");
      setWebsite("");
      setStatus("Comment posted. Thanks for adding a technical perspective.");
      setLoadState("ready");
    } catch {
      setStatus("Comments are temporarily unavailable.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteComment(commentId: string) {
    if (!ownerToken) {
      setStatus("Enter the owner delete token first.");
      return;
    }

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { "x-owner-token": ownerToken }
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus(payload.error || "Comment could not be deleted.");
        return;
      }

      setComments((current) => current.filter((comment) => comment.id !== commentId));
      setStatus("Comment deleted.");
    } catch {
      setStatus("Comment could not be deleted.");
    }
  }

  return (
    <section className="border-t border-outline-variant/20 py-12" id="comments">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
        <div className="max-w-xl">
          <p className="font-label text-label-caps uppercase tracking-[0.3em] text-primary/40">Reviewer comments</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,7vw,3.4rem)] uppercase leading-none text-primary">
            Add your technical take
          </h2>
          <p className="mt-5 leading-7 text-on-surface-variant">
            Public comments are open for developers, architects, and freelancers. Name is optional; thoughtful
            technical feedback is the whole point.
          </p>
          {ownerToolsAvailable ? (
            <>
              <button
                type="button"
                className="mt-6 font-label text-label-caps uppercase text-primary-container/60 transition hover:text-primary"
                onClick={() => setOwnerMode((value) => !value)}
              >
                Owner delete mode
              </button>
              {ownerMode ? (
                <label className="mt-4 block">
                  <span className="font-label text-label-caps uppercase text-primary/40">Delete token</span>
                  <input
                    className="mt-2 w-full rounded border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none transition focus:border-primary"
                    type="password"
                    value={ownerToken}
                    onChange={(event) => setOwnerToken(event.target.value)}
                    placeholder="Only site owner"
                  />
                </label>
              ) : null}
            </>
          ) : null}
        </div>

        <div className="space-y-6">
          <form className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-6" onSubmit={submitComment}>
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="font-label text-label-caps uppercase text-primary/40">Name optional</span>
                <input
                  className="mt-2 w-full rounded border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none transition focus:border-primary"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  maxLength={48}
                  placeholder="Anonymous reviewer"
                />
              </label>
              <label>
                <span className="font-label text-label-caps uppercase text-primary/40">Context optional</span>
                <input
                  className="mt-2 w-full rounded border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none transition focus:border-primary"
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                  maxLength={64}
                  placeholder="Developer, architect, freelancer..."
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="font-label text-label-caps uppercase text-primary/40">Comment</span>
              <textarea
                className="mt-2 min-h-36 w-full resize-y rounded border border-outline-variant/30 bg-background px-4 py-3 text-on-surface outline-none transition focus:border-primary"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={800}
                required
                placeholder="Share feedback on the approach, tradeoff, risk handling, or what you would do differently."
              />
            </label>
            <label className="hidden" aria-hidden="true">
              Website
              <input value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm text-on-surface-variant/70">{message.length}/800 characters</p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded border border-outline-variant/40 px-6 py-3 font-label text-label-caps uppercase text-primary transition duration-300 hover:bg-primary hover:text-background disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Posting..." : "Post comment"}
              </button>
            </div>
            {status ? <p className="mt-4 text-sm text-primary-container/80" role="status">{status}</p> : null}
          </form>

          <div className="space-y-4">
            {loadState === "loading" ? (
              <p className="rounded border border-outline-variant/20 p-5 text-on-surface-variant">Loading comments...</p>
            ) : null}
            {loadState === "unavailable" ? (
              <p className="rounded border border-outline-variant/20 p-5 text-on-surface-variant">
                Comments are temporarily unavailable, but the article remains readable.
              </p>
            ) : null}
            {loadState === "ready" && comments.length === 0 ? (
              <p className="rounded border border-outline-variant/20 p-5 text-on-surface-variant">
                No comments yet. You can be the first reviewer to add a technical perspective.
              </p>
            ) : null}
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-lg border border-outline-variant/20 bg-background/50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary">{comment.displayName}</p>
                    <p className="mt-1 text-sm text-on-surface-variant/60">
                      {[comment.context, formatter.format(new Date(comment.createdAt))].filter(Boolean).join(" // ")}
                    </p>
                  </div>
                  {ownerToolsAvailable && ownerMode ? (
                    <button
                      type="button"
                      className="rounded border border-outline-variant/30 p-2 text-on-surface-variant transition hover:border-primary hover:text-primary"
                      aria-label="Delete comment"
                      onClick={() => deleteComment(comment.id)}
                    >
                      <Trash2 aria-hidden className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
                <p className="mt-4 leading-7 text-on-surface-variant">{comment.message}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
