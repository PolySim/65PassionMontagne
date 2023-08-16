const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const write_comment = async (
  content: string,
  userId: number,
  hikingId: number,
) => {
  await fetch(`${API_KEY}/comment/add`, {
    method: "POST",
    body: JSON.stringify({
      content: content,
      hikingId: hikingId,
      userId: userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
