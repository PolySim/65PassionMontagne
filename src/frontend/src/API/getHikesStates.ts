import { HikesState } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const getHikesState = async (
  categoryId: number,
): Promise<HikesState> => {
  const res = await fetch(`${API_KEY}/hiking/hikesState/${categoryId}`);
  return (await res.json()) as HikesState;
};
