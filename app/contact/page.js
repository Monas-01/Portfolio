import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Contact — Monas Waqar",
};

const contactLinks = [
  {
    label: "Email",
    value: "monaswaqar01@gmail.com",
    href: "mailto:monaswaqar01@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/Monas-01",
    href: "https://github.com/Monas-01",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/monas-waqar",
    href: "https://www.linkedin.com/in/monas-waqar",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-28 sm:pt-32">
      <FadeIn>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mb-12 max-w-xl text-lg text-muted">
          Have a question or want to work together? Send a message or reach out
          directly.
        </p>
      </FadeIn>

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn delay={0.05}>
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="lg:pt-2">
            <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
              Direct contact
            </h2>
            <ul className="space-y-5">
              {contactLinks.map(({ label, value, href, external }) => (
                <li key={label}>
                  <p className="mb-1 text-sm font-medium text-foreground">
                    {label}
                  </p>
                  <a
                    href={href}
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="text-muted transition-colors duration-200 hover:text-accent"
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
