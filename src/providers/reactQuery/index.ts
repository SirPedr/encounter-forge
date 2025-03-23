import { isServer, QueryClient, QueryKey } from "@tanstack/react-query";

export const makeQueryClient = (initialData?: Array<[QueryKey, unknown]>) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
      },
    },
  });

  if (initialData) {
    initialData.forEach(([queryKey, queryData]) => {
      client.setQueryData(queryKey, queryData);
    });
  }

  return client;
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};
