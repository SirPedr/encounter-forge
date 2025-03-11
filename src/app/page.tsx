import { MonsterCard } from "@/modules/monsters/components/MonsterCard/MonsterCard";
import { getMonsters } from "@/modules/monsters/lib/getMonsters";

export default async function Home() {
  const monsters = await getMonsters({
    pagination: { offset: 0, limit: 5 },
    filters: {},
  });

  return (
    <section className="grid grid-cols-3 gap-2 p-2">
      {monsters.map((monster) => (
        <MonsterCard key={monster.id} monster={monster} />
      ))}
    </section>
  );
}
