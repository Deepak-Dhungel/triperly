import { footerLinks } from "@/constants/home-page.constant";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-primary-soft rounded-base shadow-xs border-t border-default m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-body sm:text-center">
          © {currentYear}{" "}
          <a href="/" className="hover:underline hover:text-[var(--accent)]">
            TripErly™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          {footerLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                className="hover:underline hover:text-[var(--accent)] me-4 md:me-6 focus-visible:outline-none "
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
