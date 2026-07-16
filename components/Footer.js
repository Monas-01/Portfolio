const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/monas-waqar",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/monas-waqar",
    external: true,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; 2026 Monas Waqar. All Rights Reserved.
        </p>

        <ul className="flex items-center gap-6">
          {footerLinks.map(({ label, href, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="text-sm text-muted transition-colors duration-200 hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
