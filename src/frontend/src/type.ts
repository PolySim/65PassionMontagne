import React from "react";

export type MainContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type UserType = {
  id: number;
  username: string;
  profilePicturePath: string;
  role: number;
  favorite: number[];
};

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
  main_image: number | null;
  state: string;
  content: string;
  indication: string;
  title: string;
  difficulty: string;
  length: number;
  elevation: number;
  duration: string;
  images: number[];
};

export type SignInType =
  | UserType
  | {
      error: "password" | "username";
    };

export type SignUpType =
  | UserType
  | {
      error: "email" | "username";
    };

export type QueryResult =
  | {
      result: string;
    }
  | {
      error: string;
    };

export type CommentsType = {
  content: string;
  userId: number;
  username: string;
  date: string;
}[];

export type HikingExplore = {
  id: number;
  main_image: number;
  title: string;
  state_id?: number;
};

export type HeaderFormType = {
  title: string;
  difficulty: number;
  state: number;
};

export type StatisticalFormType = {
  distance: number;
  elevation: number;
  time: string;
};

export type ContentFormType = {
  description: string;
  indication: string;
};

export type CreateAlbumProps = (props: {
  title: string;
  difficulty: number;
  state: number;
  categoryId: number;
}) => Promise<{
  hikingId?: number;
  error?: string;
}>;
