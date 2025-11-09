export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Budgets</h1>
      <form className="space-y-4 max-w-md">
        <input placeholder="Category (or total)" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Amount" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Currency" className="w-full rounded border px-3 py-2 bg-transparent" />
        <select className="w-full rounded border px-3 py-2 bg-transparent">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button type="submit" className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Save</button>
      </form>
      <div className="rounded-lg border">
        <div className="grid grid-cols-5 gap-2 p-4 text-sm text-zinc-500">
          <div>Category</div><div>Amount</div><div>Currency</div><div>Period</div><div className="text-right">Actions</div>
        </div>
        <div className="grid grid-cols-5 items-center gap-2 p-4">
          <div>—</div><div>—</div><div>—</div><div>—</div>
          <div className="text-right space-x-2"><button className="rounded border px-2 py-1 text-sm">Edit</button><button className="rounded border px-2 py-1 text-sm">Delete</button></div>
        </div>
      </div>
    </div>
  );
}
