import {
  Comments,
  DownloadHiking,
  HikingDescription,
  HikingResume,
  StatisticalHiking,
} from "@/Components/Hiking/styled.ts";
import { CommentsType, HikingInformation } from "@/type.ts";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "@/context.ts";
import { add_favorite } from "@/API/addFavorite.ts";
import { get_comments } from "@/API/getComments.ts";
import Comment from "@/Components/Hiking/Description/Comment";
import WriteComment from "@/Components/Hiking/Description/WriteComment";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const DescriptionHiking = ({ hiking }: { hiking: HikingInformation }) => {
  const params = useParams();
  const hikingId = parseInt(params.hikingId || "1");
  const { user, setUser } = useContext(MainContext);
  const [comments, setComments] = useState<CommentsType>([]);

  const handlerFavorite = async () => {
    if (user && !user.favorite.includes(hikingId)) {
      const res = await add_favorite(user.id, hikingId);
      if ("result" in res) {
        setUser((curr) =>
          curr ? { ...curr, favorite: [...curr.favorite, hikingId] } : null,
        );
      }
      console.log(res);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await get_comments(hikingId);
      if ("error" in res) {
        console.log(res);
        return;
      }
      setComments(res);
    };

    void getData();
  }, []);

  return (
    <HikingDescription>
      <StatisticalHiking>
        <div>
          <p>Distance</p>
          <p>{hiking.length} km</p>
        </div>
        <div>
          <p>Dénivelé</p>
          <p>{hiking.elevation} m</p>
        </div>
        <div>
          <p>Durée</p>
          <p>{hiking.duration}</p>
        </div>
      </StatisticalHiking>
      <HikingResume>
        {hiking.content ? (
          <>
            <h5>Description</h5>
            <p>
              {hiking.content.split("\n").map((line, index) =>
                index + 1 === hiking.content.split("\n").length ? (
                  <React.Fragment key={index}>{line}</React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ),
              )}
            </p>
          </>
        ) : null}
        {hiking.indication ? (
          <>
            <h5>Indication</h5>
            <p>
              {hiking.indication.split("\n").map((line, index) =>
                index + 1 === hiking.indication.split("\n").length ? (
                  <React.Fragment key={index}>{line}</React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ),
              )}
            </p>
          </>
        ) : null}
      </HikingResume>
      <DownloadHiking>
        <h5>Tu es intéressé ? </h5>
        <div>
          <a href={`${API_KEY}/hiking/gpx/${hikingId}`} download>
            Télécharge le tracet GPX
          </a>
          <div onClick={handlerFavorite}>Ajoute le en favori</div>
        </div>
      </DownloadHiking>
      <WriteComment user={user} setComments={setComments} />
      <Comments>
        {comments.map((comment, i) => (
          <Comment key={`comment- ${i}`} comment={comment} />
        ))}
      </Comments>
    </HikingDescription>
  );
};

export default DescriptionHiking;
