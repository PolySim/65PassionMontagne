import { ExploreStyle } from "@/Components/Explore/styled.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_hikes } from "@/API/getHikes.ts";
import { HikingExplore } from "@/type.ts";
import HikingExploreCard from "@/Components/Explore/hikingExploreCard";

const Explore = () => {
  const [hikes, setHikes] = useState<HikingExplore[]>([
    {
      id: -1,
      main_image: 1,
      title: "",
    },
  ]);
  const { categoryId, stateId } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (categoryId && stateId) {
        const data = await get_hikes(parseInt(categoryId), parseInt(stateId));
        setHikes(data);
      } else if (categoryId) {
        const data = await get_hikes(parseInt(categoryId), undefined);
        setHikes(data);
      }
    };

    void getData();
  }, [categoryId, stateId]);

  return (
    <ExploreStyle>
      {hikes.map((hiking) => (
        <HikingExploreCard key={hiking.title} hiking={hiking} />
      ))}
    </ExploreStyle>
  );
};

export default Explore;
