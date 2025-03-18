"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { MonsterCard } from "../MonsterCard/MonsterCard";
import { useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Monster } from "@prisma/client";

export const MonstersList = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const offset = (page - 1) * 10;

  const { data: monsters } = useQuery<Monster[]>({
    queryKey: ["monsters", { offset }],
    placeholderData: keepPreviousData,
    queryFn: () =>
      fetch(`/api/monsters?offset=${offset}&limit=12`)
        .then((res) => res.json())
        .then((a) => a.monsters),
  });

  return (
    <section>
      <ol className="grid grid-cols-3 gap-4" aria-label="monster list">
        {monsters?.map((monster) => (
          <li key={monster.id}>
            <MonsterCard monster={monster} />
          </li>
        ))}
      </ol>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                window.history.pushState({}, "", "/?page=1");
              }}
              isActive={page === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                window.history.pushState({}, "", "/?page=2");
              }}
              isActive={page === 2}
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                window.history.pushState({}, "", "/?page=3");
              }}
              isActive={page === 3}
            >
              3
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};
