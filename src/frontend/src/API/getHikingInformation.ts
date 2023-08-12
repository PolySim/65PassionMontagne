import { HikingInformation } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const get_hiking_information = async (
  hikingId: number,
): Promise<HikingInformation> => {
  const res = await fetch(`${API_KEY}/hiking/getHikingInformation/${hikingId}`);
  return (await res.json()) as HikingInformation;
};
