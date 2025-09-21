/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { SortBy, SortOrder } from "@/enums";
import SummaryPanel from "@/components/SummaryPanel";
import SearchControls from "@/components/SearchControls";
import ActivitiesTable from "@/components/ActivitiesTable";
import Pagination from "@/components/Pagination";
import { useActivities, useAddActivity, useSummary, useUpdateActivity } from "@/hooks/useActivities";
import { Button } from "@/components/ui/button";
import { ActivityModal } from "@/components/AddActivityModal";
import type { ActivityInput } from "@/types";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<ActivityInput & { id: string } | null>(null);
  const setToken = useAuthStore((s) => s.setToken);

  // Fetch activities
  const { data: activities, isPending: isActivitiesPending, refetch } = useActivities({ search, page, limit, sortBy, sortOrder });

  // Fetch summary
  const { data: summary, isPending: isSummaryPending } = useSummary();

  const { mutate: createActivity, isPending: isAdding } = useAddActivity();
  const { mutate: updateActivity, isPending: isUpdating } = useUpdateActivity();

  const handleLogout = () => {
    setToken(null);
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

  const handleEditClick = (activity: any) => {
    setEditData(activity);
    setIsEditOpen(true);
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

      <SummaryPanel summary={summary} isLoading={isSummaryPending} />

      <SearchControls
        search={search}
        setSearch={setSearch}
        limit={limit}
        setLimit={setLimit}
        onSearch={() => {
          setPage(1);
          refetch();
        }}
      />

      <Button onClick={() => setIsAddOpen(true)}>Add Activity</Button>

      <ActivityModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(data: ActivityInput) => createActivity(data)}
        isSubmitting={isAdding}
        mode="add"
      />

      <ActivityModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(data: any) => {
          if (editData) {
            updateActivity({ id: editData.id, updates: data });
          }
        }}
        isSubmitting={isUpdating}
        initialData={editData ?? undefined}
        mode="edit"
      />

      {isActivitiesPending ? (
        <p>Loading activities...</p>
      ) : (
        <ActivitiesTable
          activities={activities?.data || []}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onEditClick={handleEditClick} // Pass edit handler
        />
      )}

    <Pagination
      page={page}
      onPageChange={setPage}
      hasNextPage={activities?.pagination.page < activities?.pagination.pages} // Correct calculation
    />
    </div>
  );
}