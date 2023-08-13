const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const get_gpx = async (hikingId: number) => {
  const res = await fetch(`${API_KEY}/hiking/gpx/${hikingId}`);
  return await res.text();
};
