import {
  BackCategories,
  LinkMenuPhone,
  MenuPhoneStyle,
} from "@/Components/Header/styled.ts";
import { useEffect, useState } from "react";
import { HikesState } from "@/type.ts";
import { getHikesState } from "@/API/getHikesStates.ts";

const WithStateOpen = ({
  withStateOpen,
  stateOpen,
  handlerNavigateState,
}: {
  withStateOpen: boolean;
  stateOpen: number;
  handlerNavigateState: (keepOpen: boolean) => void;
}) => {
  const [hikingState, setHikingState] = useState<HikesState>([
    {
      state: "",
      id: 1,
      path: "gavarnie.jpeg",
    },
  ]);

  const getData = async () => {
    try {
      const data = await getHikesState(stateOpen);
      setHikingState(data);
    } catch (e) {
      throw new Error(`get hiking state (${stateOpen}) error : ${e}`);
    }
  };

  useEffect(() => {
    if (stateOpen === 0) {
      return;
    }
    void getData();
  }, [stateOpen]);

  return (
    <MenuPhoneStyle $withStateOpen={withStateOpen}>
      <BackCategories onClick={() => handlerNavigateState(true)}>
        Retour aux catégories
      </BackCategories>
      <LinkMenuPhone
        to={`${stateOpen}`}
        onClick={() => handlerNavigateState(false)}
      >
        Tout voir
      </LinkMenuPhone>
      {hikingState.map((state) => (
        <LinkMenuPhone
          to={`${stateOpen}/${state.id}`}
          key={state.id}
          onClick={() => handlerNavigateState(false)}
        >
          {state.state}
        </LinkMenuPhone>
      ))}
    </MenuPhoneStyle>
  );
};

export default WithStateOpen;
