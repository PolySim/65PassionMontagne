import React from "react";

export type MainContextType = {};

export type ConnectionContextType = {
  signIn: "" | "signIn" | "signUp";
  setSignIn: React.Dispatch<React.SetStateAction<"" | "signIn" | "signUp">>;
};

export type SignInFormType = {
  password: string;
  email: string;
};

export type SignUpFormType = {
  password: string;
  email: string;
  username: string;
};
