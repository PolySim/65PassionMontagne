const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const delete_image = async (hikingId: number, imageId: number) => {
  const res = await fetch(`${API_KEY}/hiking/deleteImage`, {
    method: "DELETE",
    body: JSON.stringify({
      hikingId: hikingId,
      imageId: imageId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(await res.json());
};
