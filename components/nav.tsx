"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import clsx from "clsx";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/expenses", label: "Expenses" },
  { href: "/budgets", label: "Budgets" },
  { href: "/export", label: "Export" },
  { href: "/settings", label: "Settings" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur dark:bg-black/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-base font-semibold">ExpenseTracker</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            {links.map((l) => (
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
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/signin" className="hidden sm:inline text-sm underline">Sign in</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
