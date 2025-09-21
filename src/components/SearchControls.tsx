interface SearchControlsProps {
  search: string;
  setSearch: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;
  onSearch: () => void;
}

export default function SearchControls({
  search,
  setSearch,
  limit,
  setLimit,
  onSearch,
}: SearchControlsProps) {
  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      <input
        type="text"
        placeholder="Search activities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={onSearch}
      >
        Search
      </button>
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {[5, 10, 20, 50].map((l) => (
          <option key={l} value={l}>
            {l} per page
          </option>
        ))}
      </select>
    </div>
  );
}