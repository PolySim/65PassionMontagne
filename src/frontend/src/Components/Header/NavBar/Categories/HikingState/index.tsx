import { HikingStateStyle, StateName } from "@/Components/Header/styled.ts";
import { useEffect, useState } from "react";
import { HikesState } from "@/type.ts";
import { getHikesState } from "@/API/getHikesStates.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HikingState = ({ visible }: { visible: boolean }) => {
  const [hikesState, setHikesState] = useState<HikesState>([
    {
      state: "",
      id: 1,
      path: "gavarnie.jpeg",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const res = await getHikesState();
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
          <StateName to={`/1/${hikingState.id}`}>{hikingState.state}</StateName>
        </div>
      ))}
    </HikingStateStyle>
  );
};

export default HikingState;
