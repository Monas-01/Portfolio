"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!supabase) {
      setStatus("error");
      setErrorMessage(
        "Contact form is not configured. Please set Supabase environment variables."
      );
      return;
    }

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      },
    ]);

    if (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
      return;
    }

    setForm(initialFormState);
    setStatus("success");
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
        Send a message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
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
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent disabled:opacity-60"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
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
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent disabled:opacity-60"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium"
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
            className="w-full resize-y rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent disabled:opacity-60"
            placeholder="How can I help?"
          />
        </div>

        {status === "success" && (
          <p
            role="status"
            className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
          >
            Message sent successfully. I&apos;ll get back to you soon.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
