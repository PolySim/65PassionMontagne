import { CommentsType } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const get_comments = async (hikingId: number) => {
  const res = await fetch(`${API_KEY}/comment/get/${hikingId}`);
  return (await res.json()) as CommentsType | { error: string };
};
