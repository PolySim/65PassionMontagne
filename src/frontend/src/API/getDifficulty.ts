const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const get_difficulty = async () => {
  const res = await fetch(`${API_KEY}/difficulty/getAll`);
  return (await res.json()) as { id: number; difficulty: string }[];
};
