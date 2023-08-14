import { SignInFormType, SignInType } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const sign_In = async (data: SignInFormType) => {
  const res = await fetch(`${API_KEY}/user/signIn`, {
    method: "POST",
    body: JSON.stringify({ password: data.password, username: data.email }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return (await res.json()) as SignInType;
};
