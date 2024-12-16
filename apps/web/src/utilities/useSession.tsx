import { api } from "@/utilities/http-client";
import { useQuery } from "@tanstack/react-query";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () =>
      api.auth.session.get({
        fetch: {
          credentials: "include",
        },
      }),
  });
}
