import AddExpenseForm from "@/components/add-expense-form";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Totals */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4"><div className="text-sm text-zinc-500">Today</div><div className="mt-2 text-2xl font-bold">₱0.00</div></div>
        <div className="rounded-lg border p-4"><div className="text-sm text-zinc-500">This Week</div><div className="mt-2 text-2xl font-bold">₱0.00</div></div>
        <div className="rounded-lg border p-4"><div className="text-sm text-zinc-500">This Month</div><div className="mt-2 text-2xl font-bold">₱0.00</div></div>
        <div className="rounded-lg border p-4"><div className="text-sm text-zinc-500">This Year</div><div className="mt-2 text-2xl font-bold">₱0.00</div></div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Add Expense */}
        <section className="rounded-lg border p-4 lg:col-span-1">
          <h2 className="mb-3 text-sm font-medium">Add Expense</h2>
          <AddExpenseForm />
        </section>

        {/* Analytics */}
        <section className="rounded-lg border p-4 lg:col-span-2">
          <h2 className="mb-3 text-sm font-medium">Analytics</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded border p-3">
              <div className="mb-2 text-sm text-zinc-500">Spending by Category</div>
              <div className="h-64 w-full bg-zinc-50 dark:bg-zinc-900" />
            </div>
            <div className="rounded border p-3">
              <div className="mb-2 text-sm text-zinc-500">Spending Over Time</div>
              <div className="h-64 w-full bg-zinc-50 dark:bg-zinc-900" />
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Budgets */}
        <section className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-medium">Budgets</h2>
          <form className="space-y-3 max-w-md">
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Category (or total)" className="w-full rounded border px-3 py-2 bg-transparent" />
              <input placeholder="Amount" className="w-full rounded border px-3 py-2 bg-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select defaultValue="PHP" className="w-full rounded border px-3 py-2 bg-transparent">
                <option value="PHP">PHP (₱)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
              <select defaultValue="monthly" className="w-full rounded border px-3 py-2 bg-transparent">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <button type="submit" className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Save Budget</button>
          </form>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm"><span>Food</span><span>₱0 / ₱10,000</span></div>
              <div className="mt-1 h-2 w-full rounded bg-zinc-200 dark:bg-zinc-800"><div className="h-2 w-0 rounded bg-blue-600" /></div>
            </div>
          </div>
        </section>

        {/* Export */}
        <section className="rounded-lg border p-4">
          <h2 className="mb-3 text-sm font-medium">Export</h2>
          <div className="space-y-3 max-w-md">
            <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Export CSV</button>
            <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Export PDF</button>
          </div>
        </section>
      </div>
    </div>
  );
}
