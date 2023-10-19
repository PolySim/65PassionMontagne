const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const update_main_image_position = async (
  hikingId: string,
  position: number,
) => {
  const res = await fetch(`${API_KEY}/hiking/updateMainImagePosition`, {
    method: "PUT",
    body: JSON.stringify({
      hikingId: hikingId,
      newPosition: position,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(await res.json());
};
