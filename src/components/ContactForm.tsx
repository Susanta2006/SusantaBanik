import { useState, type FormEvent } from "react";
import { CheckCircle2, CircleAlert, Send } from "lucide-react";
import { contactSchema, fieldErrors } from "../lib/contact-schema.ts";
import { SITE } from "../data/site.ts";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

const FIELDS = ["name", "email", "subject", "message"] as const;

/**
 * Web3Forms access key. These keys are designed to be public: they only let
 * the form deliver mail to the owner's inbox, so they are safe in browser code
 * (the original site used the same approach). The endpoint is the same one.
 */
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "85b50799-228a-4d46-8dec-63c72ca82d95";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = Object.fromEntries(
      FIELDS.map((k) => [k, String(fd.get(k) ?? "")]),
    );

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setState({ kind: "idle" });
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)
        ?.focus();
      return;
    }
    setErrors({});
    setState({ kind: "sending" });

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: parsed.data.name,
          email: parsed.data.email,
          replyto: parsed.data.email,
          subject:
            parsed.data.subject ||
            `New portfolio message from ${parsed.data.name}`,
          message: parsed.data.message,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (res.ok && data.success) {
        form.reset();
        setState({ kind: "ok" });
        return;
      }
      setState({
        kind: "error",
        message:
          data.message ||
          `Your message could not be sent. Please email ${SITE.email} instead.`,
      });
    } catch {
      setState({
        kind: "error",
        message: `Network error. Check your connection, or email ${SITE.email}.`,
      });
    }
  }
  const sending = state.kind === "sending";
  const input = (name: string) => ({
    name,
    id: `contact-${name}`,
    className: "field",
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4"
      aria-describedby="contact-status"
    >
      {/* Honeypot: people never see or fill this. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-semibold"
          >
            Name
          </label>
          <input
            {...input("name")}
            autoComplete="name"
            required
            maxLength={120}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-semibold"
          >
            Email
          </label>
          <input
            {...input("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-semibold"
        >
          Subject <span className="font-normal text-muted">(optional)</span>
        </label>
        <input {...input("subject")} maxLength={200} />
        <FieldError id="contact-subject-error" message={errors.subject} />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold"
        >
          How can I help?
        </label>
        <textarea
          {...input("message")}
          rows={6}
          required
          maxLength={4000}
          className="field resize-y"
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="btn btn-primary disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
          {!sending && <Send aria-hidden className="h-4 w-4" />}
        </button>
        <p className="text-sm text-muted">
          Or email{" "}
          <a className="text-link font-semibold" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
      </div>

      <div
        id="contact-status"
        role={state.kind === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {state.kind === "ok" && (
          <p className="flex items-center gap-2 text-sm font-semibold text-ok">
            <CheckCircle2 aria-hidden className="h-4 w-4" /> Message sent. I’ll
            reply to the email address you gave.
          </p>
        )}
        {state.kind === "error" && (
          <p className="flex items-start gap-2 text-sm font-semibold text-danger">
            <CircleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{" "}
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
