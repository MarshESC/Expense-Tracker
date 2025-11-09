import Link from "next/link";

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <Link href="/expenses/new" className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Add Expense</Link>
      </div>
      <div className="rounded-lg border">
        <div className="grid grid-cols-2 gap-3 border-b p-4 sm:grid-cols-4">
          <input placeholder="From date" className="w-full rounded border px-2 py-1 bg-transparent" />
          <input placeholder="To date" className="w-full rounded border px-2 py-1 bg-transparent" />
          <input placeholder="Category" className="w-full rounded border px-2 py-1 bg-transparent" />
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Filter</button>
        </div>
        <div className="divide-y">
          <div className="grid grid-cols-4 gap-2 p-4 text-sm text-zinc-500">
            <div>Date</div><div>Category</div><div>Amount</div><div className="text-right">Actions</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-2 p-4">
            <div>—</div><div>—</div><div>—</div>
            <div className="text-right space-x-2">
              <Link href="/expenses/1/edit" className="rounded border px-2 py-1 text-sm">Edit</Link>
              <button className="rounded border px-2 py-1 text-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
