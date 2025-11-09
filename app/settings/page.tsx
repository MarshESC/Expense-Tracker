export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <form className="space-y-4 max-w-md">
        <select className="w-full rounded border px-3 py-2 bg-transparent">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <input placeholder="Default currency (e.g., USD)" className="w-full rounded border px-3 py-2 bg-transparent" />
        <button type="submit" className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Save</button>
      </form>
    </div>
  );
}
