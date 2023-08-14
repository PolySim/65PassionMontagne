import { SignUpFormType, SignUpType } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const sign_up = async (data: SignUpFormType) => {
  const res = await fetch(`${API_KEY}/user/signUp`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return (await res.json()) as SignUpType;
};
