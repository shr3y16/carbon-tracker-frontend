import { SortBy, SortOrder } from "@/enums";
import { api } from "@/lib/axios";
import type { ActivityInput, FetchActivitiesParams } from "@/types";

export const fetchActivities = async ({
    search = "",
    page = 1,
    limit = 10,
    sortBy = SortBy.DATE,
    sortOrder = SortOrder.DESC,
}: FetchActivitiesParams) => {
    const params = new URLSearchParams();
    params.append("search", search);
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("sortBy", sortBy);
    params.append("sortOrder", sortOrder);

    const res = await api.get(`/activity/all?${params.toString()}`);
    return res.data;
};

export const fetchSummary = async () => {
    const res = await api.get("/activity/summary");
    return res.data;
};

export const addActivity = async (data: ActivityInput) => {
    const res = await api.post("/activity/add", data);
    return res.data;
};

export const updateActivity = async (id: number, data: Partial<ActivityInput>) => {
  const res = await api.patch(`/activity/update/${id}`, data);
  return res.data;
};

export const deleteActivity = async (id: number) => {
  const res = await api.delete(`/activity/remove/${id}`);
  return res.data;
};
