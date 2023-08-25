const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const reorder_images = async (images: number[]) => {
  const res = await fetch(`${API_KEY}/hiking/reorderImages`, {
    method: "PUT",
    body: JSON.stringify({ images: images }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(await res.json());
};
