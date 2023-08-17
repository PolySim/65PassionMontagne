import { HikingExplore } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const get_hikes = async (
  categoryId: number,
  stateId: number | undefined,
) => {
  if (stateId) {
    const res = await fetch(`${API_KEY}/hiking/hikes/${categoryId}/${stateId}`);
    return (await res.json()) as HikingExplore[];
  }
  const res = await fetch(`${API_KEY}/hiking/hikes/${categoryId}`);
  return (await res.json()) as HikingExplore[];
};
