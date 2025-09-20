/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "@/services/activityService";
import { useAuthStore } from "@/store/auth";
import { SortBy, SortOrder } from "@/enums";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const setToken = useAuthStore((s) => s.setToken);

  // Fetch activities
  const { data: activities, isPending: isActivitiesPending, refetch } = useQuery({
    queryKey: ["activities", search, page, limit, sortBy, sortOrder],
    queryFn: () => fetchActivities({ search, page, limit, sortBy, sortOrder }),
  });

  // Fetch summary
//   const { data: summary, isPending: isSummaryPending } = useQuery({
//     queryKey: ["summary"],
//     queryFn: fetchSummary,
//   });

  const handleLogout = () => {
    setToken(null);
    // optionally redirect to /login
  };

  const handleSortChange = (field: SortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortBy(field);
      setSortOrder(SortOrder.ASC);
    }
    setPage(1);
    refetch();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Summary Panel */}
      {/* {isSummaryPending ? (
        <p>Loading summary...</p>
      ) : (
        <div className="mb-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>Total Emission: {summary?.totalEmission || 0}</p>
          <p>Activities Count: {summary?.totalActivities || 0}</p>
          {summary?.byCategory && (
            <div className="mt-2">
              {Object.entries(summary.byCategory).map(([cat, value]) => (
                <p key={cat}>
                  {cat}: {value}
                </p>
              ))}
            </div>
          )}
        </div>
      )} */}

      {/* Search & controls */}
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
          onClick={() => { setPage(1); refetch(); }}
        >
          Search
        </button>

        <select
          value={limit}
          onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); refetch(); }}
          className="border p-2 rounded"
        >
          {[5, 10, 20, 50].map((l) => (
            <option key={l} value={l}>{l} per page</option>
          ))}
        </select>
      </div>

      {/* Activities Table */}
      {isActivitiesPending ? (
        <p>Loading activities...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSortChange(SortBy.CATEGORY)}
              >
                Category {sortBy === SortBy.CATEGORY ? (sortOrder === SortOrder.ASC ? "↑" : "↓") : ""}
              </th>
              <th className="border p-2">Description</th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSortChange(SortBy.EMISSION)}
              >
                Emission {sortBy === SortBy.EMISSION ? (sortOrder === SortOrder.ASC ? "↑" : "↓") : ""}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSortChange(SortBy.DATE)}
              >
                Date {sortBy === SortBy.DATE ? (sortOrder === SortOrder.ASC ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {activities?.data?.map((a: any) => (
              <tr key={a.id}>
                <td className="border p-2">{a.id}</td>
                <td className="border p-2">{a.category}</td>
                <td className="border p-2">{a.description}</td>
                <td className="border p-2">{a.emission}</td>
                <td className="border p-2">{new Date(a.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
