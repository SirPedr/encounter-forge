import { EncounterBuildPage } from "@/modules/encounter/pages/EncounterBuildPage";
import { MonsterListingPage } from "@/modules/encounter/pages/MonsterListingPage";
import { getMonsters } from "@/modules/monsters/lib/getMonsters";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const LIMIT_PER_PAGE = 21;

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
    <div className="p-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EncounterBuildPage />
      </HydrationBoundary>
    </div>
  );
}
