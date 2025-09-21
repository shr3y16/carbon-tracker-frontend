/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortBy, SortOrder } from "@/enums";
import { ConfirmDialog } from "./ConfirmDialog";
import { useDeleteActivity } from "@/hooks/useActivities";
import { useState } from "react";

interface ActivitiesTableProps {
  activities: any[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (field: SortBy) => void;
  onEditClick: (activity: any) => void;
}

export default function ActivitiesTable({
  activities,
  sortBy,
  sortOrder,
  onSortChange,
  onEditClick,
}: ActivitiesTableProps) {

  const { mutate: deleteActivity } = useDeleteActivity();

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!deletingId) return;
    deleteActivity(deletingId, {
      onSettled: () => {
        setDeletingId(null);
        setConfirmOpen(false);
      },
    });
  };

const handleCancel = () => {
  setDeletingId(null);  // ✅ Reset deletingId so button returns to normal
  setConfirmOpen(false);
};  

  return (
    <>
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          <th
            className="border p-2 cursor-pointer"
            onClick={() => onSortChange(SortBy.CATEGORY)}
          >
            Category {sortBy === SortBy.CATEGORY ? (sortOrder === SortOrder.ASC ? "↑" : "↓") : ""}
          </th>
          <th className="border p-2">Description</th>
          <th
            className="border p-2 cursor-pointer"
            onClick={() => onSortChange(SortBy.EMISSION)}
          >
            Emission {sortBy === SortBy.EMISSION ? (sortOrder === SortOrder.ASC ? "↑" : "↓") : ""}
          </th>
          <th
            className="border p-2 cursor-pointer"
            onClick={() => onSortChange(SortBy.DATE)}
          >
            Date {sortBy === SortBy.DATE ? (sortOrder === SortOrder.ASC ? "↑" : "↓") : ""}
          </th>
        </tr>
      </thead>
      <tbody>
        {activities.map((a) => (
          <tr key={a.id}>
            <td className="border p-2">{a.id}</td>
            <td className="border p-2">{a.category}</td>
            <td className="border p-2">{a.description}</td>
            <td className="border p-2">{a.emission}</td>
            <td className="border p-2">{new Date(a.date).toLocaleDateString()}</td>
            <td className="border p-2">
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => onEditClick(a)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDeleteClick(a.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <ConfirmDialog
    open={confirmOpen}
    title="Delete Activity"
    description="Are you sure you want to delete this activity? This action cannot be undone."
    onConfirm={handleConfirm}
    onCancel={handleCancel}
  />
  </>
  );
}