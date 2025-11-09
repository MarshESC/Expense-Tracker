"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      Continue with Google
    </button>
  );
}
