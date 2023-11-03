import { HikingStateStyle, StateName } from "@/Components/Header/styled.ts";
import { useEffect, useState } from "react";
import { HikesState } from "@/type.ts";
import { getHikesState } from "@/API/getHikesStates.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HikingState = ({
  visible,
  categoryId,
}: {
  visible: boolean;
  categoryId: number;
}) => {
  const [hikesState, setHikesState] = useState<HikesState>([
    {
      state: "",
      id: 1,
      path: "gavarnie.jpeg",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const res = await getHikesState(categoryId);
      setHikesState(res);
    };

    void getData();
  }, []);

  return (
    <HikingStateStyle $visible={visible}>
      {hikesState.map((hikingState) => (
        <div key={hikingState.state}>
          <img
            src={`${API_KEY}/hiking/imageState/${hikingState.path}`}
            alt={hikingState.state}
          />
          <StateName to={`/${categoryId}/${hikingState.id}`}>
            {hikingState.state}
          </StateName>
        </div>
      ))}
    </HikingStateStyle>
  );
};

export default HikingState;
