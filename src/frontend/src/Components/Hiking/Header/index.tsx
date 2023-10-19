import {
  BackgroundImageHeader,
  HeaderHikingStyle,
  StarFavorite,
} from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import { Star } from "@/Components/SVG/star.tsx";
import { useContext } from "react";
import { MainContext } from "@/context.ts";
import { useParams } from "react-router-dom";
import { add_favorite } from "@/API/addFavorite.ts";
import { remove_favorite } from "@/API/removeFavorite.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HeaderHiking = ({ hiking }: { hiking: HikingInformation }) => {
  const { user, setUser } = useContext(MainContext);
  const params = useParams();
  const hikingId = parseInt(params.hikingId || "-1");

  const handlerFavorite = async () => {
    if (user && user.favorite.includes(hikingId)) {
      const res = await remove_favorite(user.id, hikingId);
      if ("result" in res) {
        setUser((curr) =>
          curr
            ? {
                ...curr,
                favorite: curr.favorite.filter((id) => id !== hikingId),
              }
            : null,
        );
      }
      console.log(res);
    } else if (user) {
      const res = await add_favorite(user.id, hikingId);
      if ("result" in res) {
        setUser((curr) =>
          curr ? { ...curr, favorite: [...curr.favorite, hikingId] } : null,
        );
      }
      console.log(res);
    }
  };

  return (
    <HeaderHikingStyle>
      <BackgroundImageHeader image_position={hiking.main_image_position}>
        <img
          src={`${API_KEY}/hiking/getImage/${hiking.main_image}`}
          alt="main image"
        />
      </BackgroundImageHeader>
      <div />
      <h3>{hiking.title}</h3>
      <p>{hiking.difficulty}</p>
      <p>{hiking.state}</p>
      <StarFavorite
        onClick={handlerFavorite}
        $isSelected={user?.favorite.includes(hikingId) || false}
      >
        <Star />
      </StarFavorite>
    </HeaderHikingStyle>
  );
};

export default HeaderHiking;
