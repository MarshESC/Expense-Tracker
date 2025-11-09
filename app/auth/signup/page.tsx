import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <form className="space-y-4">
        <input placeholder="Name" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Email" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Password" type="password" className="w-full rounded border px-3 py-2 bg-transparent" />
        <button type="submit" className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Create account</button>
      </form>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">Already have an account? <Link href="/auth/signin" className="underline">Sign in</Link></div>
    </div>
  );
}
