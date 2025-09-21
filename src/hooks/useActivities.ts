/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addActivity, deleteActivity, fetchActivities, fetchSummary, updateActivity } from "@/services/activityService";
import type { ActivityInput, FetchActivitiesParams } from "@/types";
import { toast } from "react-toastify";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] }); // refresh list
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Activity deleted successfully");
    },
  });
};

export const useActivities = (params: FetchActivitiesParams) => {
  return useQuery({
    queryKey: ["activities", params],
    queryFn: () => fetchActivities(params),
  });
}

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: fetchSummary,
  });
}


export const useAddActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: (data: ActivityInput) => addActivity(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["activities"] });
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    toast.success("Activity added successfully");
  },
  onError: (err: any) => {
    toast.error(err?.message || "Failed to add activity");
  },
});
} 

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; updates: Partial<ActivityInput> }) =>
      updateActivity(data.id, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] }); // Refresh activities
      queryClient.invalidateQueries({ queryKey: ["summary"] }); // Refresh summary
      toast.success("Activity updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update activity");
    },
  });
};