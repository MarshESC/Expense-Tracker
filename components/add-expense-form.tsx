"use client";

import { useMemo } from "react";

export default function AddExpenseForm() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  return (
    <form className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input defaultValue={today} type="date" aria-label="Date" className="w-full rounded border px-3 py-2 bg-transparent" />
        <input placeholder="Amount" aria-label="Amount" className="w-full rounded border px-3 py-2 bg-transparent" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select defaultValue="PHP" aria-label="Currency" className="w-full rounded border px-3 py-2 bg-transparent">
          <option value="PHP">PHP (₱)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
        <select aria-label="Category" className="w-full rounded border px-3 py-2 bg-transparent">
          <option>Food</option>
          <option>Transport</option>
          <option>Utilities</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
      </div>
      <input placeholder="Description (optional)" aria-label="Description" className="w-full rounded border px-3 py-2 bg-transparent" />
      <div className="grid grid-cols-2 gap-3">
        <select defaultValue="none" aria-label="Recurrence" className="w-full rounded border px-3 py-2 bg-transparent">
          <option value="none">No recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button type="submit" className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Add</button>
      </div>
      <p className="text-xs text-zinc-500">Date defaults to today. You may change it or leave as is.</p>
    </form>
  );
}
