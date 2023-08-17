import {
  CommentInformation,
  CommentStyle,
  ImageUser,
  WriteCommentStyle,
} from "@/Components/Hiking/styled.ts";
import { CommentsType, UserType } from "@/type.ts";
import React, { useRef } from "react";
import { write_comment } from "@/API/writeComment.ts";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const WriteComment = ({
  user,
  setComments,
}: {
  user: UserType | null;
  setComments: React.Dispatch<React.SetStateAction<CommentsType>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const hikingId = parseInt(params.hikingId || "1");

  const sendComment = (element: HTMLInputElement | null) => {
    if (element && user) {
      const content = element.value;
      void write_comment(content, user.id, hikingId);
      const date = new Date();

      // Tableau de noms de mois en français
      const mois = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ];

      // Construction de la date sous forme de chaîne
      const dateString =
        date.getDate() + " " + mois[date.getMonth()] + " " + date.getFullYear();
      setComments((curr) => [
        ...curr,
        {
          content: content,
          userId: user.id,
          username: user.username,
          date: dateString,
        },
      ]);
      element.value = "";
    }
  };

  return (
    <CommentStyle>
      <div>
        <ImageUser>
          <img
            src={`${API_KEY}/user/image/${user?.id || -1}`}
            alt={user?.username || "65 Passion Montagne"}
          />
        </ImageUser>
        <CommentInformation>
          <p>{user?.username || "65 Passion Montagne"}</p>
          <p>10 août 2023</p>
        </CommentInformation>
      </div>
      <WriteCommentStyle>
        <input
          minLength={3}
          placeholder="Ecris ce que tu penses de ce parcours"
          ref={inputRef}
        />
        <div onClick={() => sendComment(inputRef.current)}>Envoyer</div>
      </WriteCommentStyle>
    </CommentStyle>
  );
};

export default WriteComment;
