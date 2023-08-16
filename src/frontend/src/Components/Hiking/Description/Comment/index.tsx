import { CommentsType } from "@/type.ts";
import {
  CommentInformation,
  CommentStyle,
  ImageUser,
} from "@/Components/Hiking/styled.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const Comment = ({ comment }: { comment: CommentsType[0] }) => {
  return (
    <CommentStyle>
      <div>
        <ImageUser>
          <img
            src={`${API_KEY}/user/image/${comment.userId}`}
            alt={comment.username}
          />
        </ImageUser>
        <CommentInformation>
          <p>{comment.username}</p>
          <p>10 août 2023</p>
        </CommentInformation>
      </div>
      <div>{comment.content}</div>
    </CommentStyle>
  );
};

export default Comment;
