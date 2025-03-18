import { MonstersList } from "@/modules/monsters/components/MonstersList/MonstersList";
import { getMonsters } from "@/modules/monsters/lib/getMonsters";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const LIMIT_PER_PAGE = 12;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10);
  const offset = (currentPage - 1) * LIMIT_PER_PAGE;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["monsters", { offset }],
    queryFn: () =>
      getMonsters({
        pagination: { offset, limit: LIMIT_PER_PAGE },
        filters: {},
      }),
  });

  return (
    <main className="p-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MonstersList />
      </HydrationBoundary>
    </main>
  );
}
