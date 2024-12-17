import { api } from "@/utilities/http-client";
import { QueryKey } from "@/utilities/query-key";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: [QueryKey.Session],
    queryFn: async () =>
      api.auth.session.get({
        fetch: {
          credentials: "include",
        },
      }),
  });
}
