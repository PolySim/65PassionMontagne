import { ExploreStyle } from "@/Components/Explore/styled.ts";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { get_hikes } from "@/API/getHikes.ts";
import { HikingExplore } from "@/type.ts";
import HikingExploreCard from "@/Components/Explore/hikingExploreCard";
import { get_favorites } from "@/API/getFavorite.ts";
import { MainContext } from "@/context.ts";

const Explore = () => {
  const [hikes, setHikes] = useState<HikingExplore[]>([
    {
      id: -1,
      main_image: 1,
      title: "",
    },
  ]);
  const { categoryId, stateId } = useParams();
  const { user } = useContext(MainContext);

  useEffect(() => {
    const getData = async () => {
      if (categoryId && categoryId !== "favorite" && stateId) {
        const data = await get_hikes(parseInt(categoryId), parseInt(stateId));
        setHikes(data);
      } else if (categoryId && categoryId !== "favorite") {
        const data = await get_hikes(parseInt(categoryId), undefined);
        setHikes(data);
      } else if (categoryId && user?.id) {
        const data = await get_favorites(user?.id);
        setHikes(data);
      }
    };

    void getData();
  }, [categoryId, stateId, user]);

  return (
    <ExploreStyle>
      {hikes.map((hiking) => (
        <HikingExploreCard key={hiking.title} hiking={hiking} />
      ))}
    </ExploreStyle>
  );
};

export default Explore;
