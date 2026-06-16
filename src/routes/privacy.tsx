import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Susanta Banik" },
      {
        name: "description",
        content:
          "How Susanta Banik's official website handles your data, contact messages and chat with the Jarvis assistant.",
      },
      { property: "og:title", content: "Privacy Policy — Susanta Banik" },
      {
        property: "og:description",
        content: "Privacy practices for Susanta Banik's personal website.",
      },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <main className="container-prose py-20 max-w-3xl">
      <Link to="/" className="text-sm text-muted-foreground link-underline">
        ← Back to home
      </Link>
      <h1 className="font-display text-4xl mt-6 mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: {new Date().getFullYear()}
      </p>
      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl mb-2">1. Who we are</h2>
          <p>
            This site is operated by Susanta Banik as a personal portfolio. We
            collect the minimum information needed to answer messages you send.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">2. Contact form</h2>
          <p>
            When you submit the contact form, your name, email address and
            message are forwarded to a private inbox via a transactional email
            relay. Your email is used only to reply to you. We do not sell,
            share, or add it to any marketing list.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">3. Jarvis chat</h2>
          <p>
            Messages you type into the Jarvis assistant are sent to AI providers
            to generate a reply. Conversations are not stored on this server
            and are not used to identify you. Please do not share sensitive
            personal information in chat.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">4. Cookies & analytics</h2>
          <p>
            This site does not set marketing cookies. Hosting providers may keep
            short-lived access logs (IP, user-agent, timestamp) for security and
            abuse-prevention purposes only.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">5. Your rights</h2>
          <p>
            You may request deletion of any message you have sent by writing to
            the same inbox you contacted. We will action reasonable requests
            promptly.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl mb-2">6. Updates</h2>
          <p>
            This policy may change as the site evolves. The &ldquo;last
            updated&rdquo; date above will always reflect the current version.
          </p>
        </section>
      </div>
    </main>
  );
}
