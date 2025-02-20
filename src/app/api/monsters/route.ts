import { getMonsters } from "@/modules/encounter/lib/getMonsters";

export async function GET() {
  const res = await getMonsters({
    pagination: {
      offset: 0,
      limit: 3,
    },
  });

  return Response.json({ length: res.length, monsters: res });
}
