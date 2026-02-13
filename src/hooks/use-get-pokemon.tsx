import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "@/types/pokemon";
import { getPokemon } from "@/lib/queries";

const useGetPokemon = (species: string) =>
  useQuery<Pokemon>({
    queryKey: ["pokemon"],
    queryFn: () => getPokemon(species),
  });

export default useGetPokemon;
