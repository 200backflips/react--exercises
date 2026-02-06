import type { Pokemon } from "@/types/pokemon";
import { create } from "zustand";
import { getPokemon } from "./queries";

interface Boats {
  boats: number;
  setBoats: (boats: number) => void;
}

export const useBoats = create<Boats>((set) => ({
  boats: 0,
  setBoats: (boats: number) => set({ boats }),
}));

interface UsePokemon {
  pokemon: Pokemon | undefined;
  isLoadingPokemon: boolean;
  setPokemon: (species: string) => Promise<void>;
}

export const usePokemon = create<UsePokemon>((set) => ({
  pokemon: undefined,
  isLoadingPokemon: false,
  setPokemon: async (species: string) => {
    set({ isLoadingPokemon: true });
    const pokemon = await getPokemon(species);
    set({ pokemon });
    set({ isLoadingPokemon: false });
  },
}));
