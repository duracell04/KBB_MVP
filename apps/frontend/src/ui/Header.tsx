import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#architecture", label: "Architecture" },
  { href: "#use-case", label: "Use case" },
  { href: "#demo", label: "60s demo" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/5">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg font-semibold tracking-tight text-white">
          KBB
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-cloud/80 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kbb-labs/KBB_MVP"
            className="rounded-full border border-cyan/50 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan shadow-glow transition hover:bg-cyan/20"
          >
            GitHub
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-cloud/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan sm:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-ink/95 px-4 pb-4 pt-2 sm:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-cloud/80 transition hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
