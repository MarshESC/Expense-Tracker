"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import clsx from "clsx";
import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "demo", "pricing", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Only add scroll listener on homepage
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Call once to set initial state
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Show original navigation when not on homepage
  const isHomepage = pathname === "/";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur dark:bg-black/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          {isHomepage ? (
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "home")}
              className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ExpenseTracker
            </a>
          ) : (
            <Link href="/dashboard" className="text-base font-semibold">ExpenseTracker</Link>
          )}

          <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            {isHomepage ? (
              // Homepage: Show smooth scroll navigation
              links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleSmoothScroll(e, l.href)}
                  className={clsx(
                    "rounded-md px-2 py-1 hover:text-black dark:hover:text-white transition-colors",
                    activeSection === l.href.replace("#", "") && "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  )}
                >
                  {l.label}
                </a>
              ))
            ) : (
              // Other pages: Show original navigation
              [
                { href: "/dashboard", label: "Dashboard" },
                { href: "/expenses", label: "Expenses" },
                { href: "/budgets", label: "Budgets" },
                { href: "/export", label: "Export" },
                { href: "/settings", label: "Settings" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "rounded-md px-2 py-1 hover:text-black dark:hover:text-white",
                    pathname?.startsWith(l.href) && "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                  )}
                >
                  {l.label}
                </Link>
              ))
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isHomepage ? (
            <a
              href="/dashboard"
              className="hidden sm:inline text-sm underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Get Started
            </a>
          ) : (
            <Link href="/auth/signin" className="hidden sm:inline text-sm underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sign in
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
