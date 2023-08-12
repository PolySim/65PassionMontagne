import { CategoriesInformation } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const getCategoriesInformation =
  async (): Promise<CategoriesInformation> => {
    const res = await fetch(`${API_KEY}/categories/getInformation`);
    return (await res.json()) as CategoriesInformation;
  };
