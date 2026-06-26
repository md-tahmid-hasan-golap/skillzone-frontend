import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";
import { useAuth } from "@clerk/nextjs";

export const useDashboardAnalytics = () => {
  const axiosSecure = UseAxiosSecure();
  const { userId } = useAuth(); // Clerk Auth User ID

  // Fetch Overview Data
  const useOverviewData = () => {
    return useQuery({
      queryKey: ["dashboardOverview"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/api/dashboard/overview", {
          headers: {
            "x-clerk-user-id": userId,
          },
        });
        return data.data; // Return the strictly defined data chunk
      },
      enabled: !!userId,
    });
  };

  // Fetch Chart Data for visualization
  const useChartData = () => {
    return useQuery({
      queryKey: ["dashboardChartData"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/api/dashboard/chart-data", {
          headers: {
            "x-clerk-user-id": userId,
          },
        });
        return data.data;
      },
      enabled: !!userId,
    });
  };

  // Fetch Table Data (Paginated)
  const useTableData = (page = 1, limit = 10) => {
    return useQuery({
      queryKey: ["dashboardTableData", page, limit],
      queryFn: async () => {
        const { data } = await axiosSecure.get(
          `/api/dashboard/table-data?page=${page}&limit=${limit}`,
          {
            headers: {
              "x-clerk-user-id": userId,
            },
          },
        );
        return { items: data.data, meta: data.meta };
      },
      enabled: !!userId,
      placeholderData: (previousData) => previousData, // keepPreviousData approach in latest queries
    });
  };

  return {
    useOverviewData,
    useChartData,
    useTableData,
  };
};
