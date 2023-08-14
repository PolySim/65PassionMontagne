import { createContext } from "react";
import { ConnectionContextType, MainContextType } from "@/type.ts";

export const MainContext = createContext<MainContextType>({
  user: null,
  setUser: () => {},
});

export const ConnectionContext = createContext<ConnectionContextType>({
  signIn: "",
  setSignIn: () => {},
});
