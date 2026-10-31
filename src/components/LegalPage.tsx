export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <div className="wrap section max-w-3xl">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
      <div className="mt-8 space-y-7 text-muted">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="mb-2 text-xl text-fg">{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
