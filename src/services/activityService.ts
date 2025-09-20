import { SortBy, SortOrder } from '@/enums';
import { api } from '@/lib/axios';
import type { FetchActivitiesParams } from '@/types';

export const fetchActivities = async ({
  search = "",
  page = 1,
  limit = 10,
  sortBy = SortBy.DATE,
  sortOrder = SortOrder.DESC,
}: FetchActivitiesParams = {}) => {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  params.append("sortBy", sortBy);
  params.append("sortOrder", sortOrder);

  const res = await api.get(`/activity/all?${params.toString()}`);
  return res.data;
};