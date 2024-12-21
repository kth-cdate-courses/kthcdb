import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSession() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Session],
    queryFn: async () =>
      api.auth.session.get({
        fetch: {
          credentials: "include",
        },
      }),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async () =>
      api.auth.logout.post(
        {},
        {
          fetch: {
            credentials: "include",
          },
        },
      ),
  });

  async function logout() {
    const { status } = await mutateAsync();
    if (status === 200) {
      queryClient.invalidateQueries({
        exact: true,
        queryKey: [QueryKey.Session],
      });
    }
  }

  return {
    isLoading,
    isAuthenticated: data?.data?.authenticated,
    user: data?.data?.user,
    logout,
  };
}
