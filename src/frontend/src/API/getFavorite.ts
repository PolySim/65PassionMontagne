import { HikingExplore } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const get_favorites = async (userId: number) => {
  const res = await fetch(`${API_KEY}/hiking/getFavorites/${userId}`);
  return (await res.json()) as HikingExplore[];
};
