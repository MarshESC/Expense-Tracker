export default function ExportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Export</h1>
      <div className="space-y-3 max-w-md">
        <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Export CSV</button>
        <button className="w-full rounded-md border px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Export PDF</button>
      </div>
    </div>
  );
}
