import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/FerdinandMorena", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ferdinand-morena/", icon: Linkedin },
  { label: "Email", href: "mailto:fmmphahle01@gmail.com", icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-line bg-ink px-6 pb-8 pt-16 md:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="bp-tag mb-3 block text-blueprint-soft">FIG. 12 — END OF DOCUMENT</span>
            <p className="max-w-md font-display text-2xl leading-snug text-text md:text-3xl">
              Ferdinand Mphahle Morena. Full stack engineer, based in Limpopo, South Africa.
            </p>
          </div>

          <ul className="flex items-center gap-6">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex items-center gap-2 text-mist-400 transition-colors hover:text-blueprint-soft"
                >
                  <Icon size={18} strokeWidth={1.75} />
                  <span className="bp-tag text-current">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bp-hairline my-10" />

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="bp-tag text-mist-600">
            © {year} Ferdinand Morena. Designed &amp; built from scratch.
          </p>

          <a
            href="#hero"
            className="bp-tag inline-flex items-center gap-2 text-mist-400 transition-colors hover:text-blueprint-soft"
          >
            Back to top
            <ArrowUp size={12} strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
