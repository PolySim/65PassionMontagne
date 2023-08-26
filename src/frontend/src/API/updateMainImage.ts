const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const update_main_image = async (
  hikingId: number,
  mainImage: number,
) => {
  const res = await fetch(`${API_KEY}/hiking/updateMainImage`, {
    method: "PUT",
    body: JSON.stringify({
      hikingId: hikingId,
      mainImage: mainImage,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(await res.json());
};
