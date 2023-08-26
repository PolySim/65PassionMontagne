const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const upload_gpx = async (formData: FormData, hikingId: number) => {
  const res = await fetch(`${API_KEY}/hiking/uploadGpx/${hikingId}`, {
    method: "POST",
    body: formData,
  });
  console.log(await res.json());
};
