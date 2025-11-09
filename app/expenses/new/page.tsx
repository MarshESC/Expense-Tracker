import Link from "next/link";

export default function NewExpensePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New Expense</h1>
        <Link href="/expenses" className="text-sm underline">Back</Link>
      </div>
      <form className="space-y-4 max-w-md">
        <input placeholder="Date" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Amount" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Currency (e.g., USD)" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Category" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Description (optional)" className="w-full rounded border px-3 py-2 bg-transparent" />
        <div className="grid grid-cols-2 gap-3">
          <select className="w-full rounded border px-3 py-2 bg-transparent">
            <option value="none">No recurrence</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button type="submit" className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Save</button>
        </div>
      </form>
    </div>
  );
}
