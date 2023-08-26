import { CreateAlbumProps } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const create_album: CreateAlbumProps = async (props) => {
  const res = await fetch(`${API_KEY}/hiking/createAlbum`, {
    method: "POST",
    body: JSON.stringify(props),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return (await res.json()) as {
    hikingId?: number;
    error?: string;
  };
};
