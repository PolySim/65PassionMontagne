import { UserType } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const sign_in_token = async (token: string) => {
  const res = await fetch(`${API_KEY}/user/signInToken`, {
    method: "POST",
    body: JSON.stringify({ token: token }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return (await res.json()) as UserType;
};
