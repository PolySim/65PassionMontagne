import { QueryResult } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const remove_favorite = async (userId: number, hikingId: number) => {
  const res = await fetch(`${API_KEY}/user/removeFavorite`, {
    method: "DELETE",
    body: JSON.stringify({
      userId: userId,
      hikingId: hikingId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return (await res.json()) as QueryResult;
};
