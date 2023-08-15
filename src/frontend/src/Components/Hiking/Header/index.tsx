import { HeaderHikingStyle, StarFavorite } from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import { Star } from "@/Components/SVG/star.tsx";
import { useContext } from "react";
import { MainContext } from "@/context.ts";
import { useParams } from "react-router-dom";
import { add_favorite } from "@/API/addFavorite.ts";
import { remove_favorite } from "@/API/removeFavorite.ts";

const HeaderHiking = ({ hiking }: { hiking: HikingInformation }) => {
  const { user, setUser } = useContext(MainContext);
  const params = useParams();
  const hikingId = parseInt(params.hikingId || "-1");

  const handlerFavorite = async () => {
    console.log(user?.favorite, hikingId);
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
    <HeaderHikingStyle $main_image={hiking.main_image}>
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
