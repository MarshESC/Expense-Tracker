import Link from "next/link";
import GoogleSignInButton from "@/components/google-signin-button";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form className="space-y-4">
        <input placeholder="Email" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Password" type="password" className="w-full rounded border px-3 py-2 bg-transparent" />
        <button type="submit" className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Continue</button>
      </form>
      <GoogleSignInButton />
      <div className="text-sm text-zinc-600 dark:text-zinc-400">Don’t have an account? <Link href="/auth/signup" className="underline">Sign up</Link></div>
    </div>
  );
}
