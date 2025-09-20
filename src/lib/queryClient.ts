import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // prevents refetch every time you switch tabs
      retry: 1, // retry failed requests once
    },
  },
});
