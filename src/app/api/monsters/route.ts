import { getMonsters } from "@/modules/encounter/lib/getMonsters";
import { QUERY_SCHEMA } from "@/modules/encounter/lib/validateMonstersQuery";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const validatedParams = QUERY_SCHEMA.safeParse({
    pagination: {
      limit: searchParams.get("limit"),
      offset: searchParams.get("offset"),
    },
    filters: {
      name: searchParams.get("name"),
      environments: searchParams.get("environments")?.split(","),
      type: searchParams.get("type")?.split(","),
      challenge_rating: {
        min: searchParams.get("minCR"),
        max: searchParams.get("maxCR"),
      },
      xpGeneral: {
        min: searchParams.get("xpGeneralMin"),
        max: searchParams.get("xpGeneralMax"),
      },
      xpInLair: {
        min: searchParams.get("xpLairMin"),
        max: searchParams.get("xpLairMax"),
      },
    },
  });

  if (!validatedParams.success) {
    return Response.json(
      { error: validatedParams.error.issues },
      { status: 400 }
    );
  }

  return Response.json({ monsters: await getMonsters(validatedParams.data) });
}
