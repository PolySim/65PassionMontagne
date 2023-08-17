import { HeaderFormType } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const update_header = async (
  props: HeaderFormType & { hikingId: number },
) => {
  const res = await fetch(`${API_KEY}/hiking/updateHeader`, {
    method: "PUT",
    body: JSON.stringify(props),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  console.log(await res.json());
};
