"use client";

import React, { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setForm(initialFormState);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="rounded-2xl border border-border bg-white p-7 sm:p-9 shadow-sm">
      <h2 className="mb-6 text-xs font-mono uppercase tracking-widest text-muted">
        Send a message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-foreground/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-border bg-[#f2f0ec]/50 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-foreground focus:bg-white focus:ring-1 focus:ring-foreground disabled:opacity-60"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-foreground/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-border bg-[#f2f0ec]/50 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-foreground focus:bg-white focus:ring-1 focus:ring-foreground disabled:opacity-60"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-foreground/80"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full resize-y rounded-xl border border-border bg-[#f2f0ec]/50 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-foreground focus:bg-white focus:ring-1 focus:ring-foreground disabled:opacity-60"
            placeholder="How can I help?"
          />
        </div>

        {status === "success" && (
          <p
            role="status"
            className="rounded-xl border border-foreground/30 bg-[#f2f0ec] px-4 py-3 text-sm text-foreground font-medium"
          >
            Message sent successfully. I&apos;ll get back to you soon.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="rounded-xl border border-foreground/30 bg-[#f2f0ec] px-4 py-3 text-sm text-foreground font-medium"
          >
            {errorMessage}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-7 py-3 text-sm font-medium text-[#f2f0ec] hover:bg-[#2a2a2a] active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}

