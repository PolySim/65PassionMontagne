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

export type CategoriesInformation = {
  name: string;
  name_en: string;
  id: number;
}[];

export type HikesState = {
  id: number;
  state: string;
  path: string;
}[];

export type HikingInformation = {
  main_image: number;
  state: string;
  content: string;
  title: string;
  difficulty: string;
  length: number;
  elevation: number;
  duration: string;
  images: number[];
};
