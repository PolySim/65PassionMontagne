import { AdminStyle } from "@/Components/Admin/styled.ts";
import React, { useEffect, useState } from "react";
import { HikingExplore } from "@/type.ts";
import { get_hikes } from "@/API/getHikes.ts";
import { useParams } from "react-router-dom";
import {
  ButtonExploreTopo,
  HikingExploreCardStyle,
} from "@/Components/Explore/styled.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const SelectHiking = () => {
  const [hikes, setHikes] = useState<HikingExplore[]>([
    {
      id: -1,
      title: "",
      main_image: -1,
    },
  ]);
  const { categoryId } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (categoryId) {
        const data = await get_hikes(parseInt(categoryId), undefined);
        setHikes(data);
      }
    };

    void getData();
  }, []);

  return (
    <AdminStyle>
      {hikes.map((hiking) => (
        <React.Fragment key={hiking.title}>
          {hiking.id !== -1 && (
            <HikingExploreCardStyle>
              <div>
                <img
                  src={`${API_KEY}/hiking/getImage/${hiking.main_image}`}
                  alt={hiking.title}
                />
              </div>
              <p>{hiking.title}</p>
              <ButtonExploreTopo to={`${hiking.id}`}>
                Modifier cette activité
              </ButtonExploreTopo>
            </HikingExploreCardStyle>
          )}
        </React.Fragment>
      ))}
      <HikingExploreCardStyle>
        <div>
          <img src={`${API_KEY}/categories/getImage/1`} alt={"new hiking"} />
        </div>
        <p>Nouvelle activité</p>
        <ButtonExploreTopo to={`-1`}>Créer une activité</ButtonExploreTopo>
      </HikingExploreCardStyle>
    </AdminStyle>
  );
};

export default SelectHiking;
