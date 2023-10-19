import { useForm } from "react-hook-form";
import { HeaderFormType, HikesState, HikingInformation } from "@/type.ts";
import {
  BackgroundImageHeader,
  HeaderHikingStyle,
} from "@/Components/Hiking/styled.ts";
import { HeaderForm, SelectHeader } from "@/Components/Admin/styled.ts";
import { useEffect, useState } from "react";
import { get_difficulty } from "@/API/getDifficulty.ts";
import { getHikesState } from "@/API/getHikesStates.ts";
import { useParams } from "react-router-dom";
import { update_header } from "@/API/updateHeader.ts";
import { create_album } from "@/API/createAlbum.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const EditHeader = ({ hiking }: { hiking: HikingInformation }) => {
  const { hikingId, categoryId } = useParams();
  const { register, handleSubmit } = useForm<HeaderFormType>();
  const [states, setStates] = useState<HikesState>([
    {
      id: 1,
      state: "",
      path: "",
    },
  ]);
  const [difficulties, setDifficulties] = useState<
    { id: number; difficulty: string }[]
  >([
    {
      id: 1,
      difficulty: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const difficultyResult = await get_difficulty();
      setDifficulties(difficultyResult);
      const stateResult = await getHikesState();
      setStates(stateResult);
    };

    void getData();
  }, [hiking]);

  const onSubmit = async (data: HeaderFormType) => {
    if (hikingId && hikingId !== "-1") {
      void (await update_header({ ...data, hikingId: parseInt(hikingId) }));
    } else if (hikingId === "-1" && categoryId) {
      const newHikingId = await create_album({
        ...data,
        categoryId: parseInt(categoryId),
      });
      if ("hikingId" in newHikingId && newHikingId.hikingId) {
        const newUrl = `/admin/${categoryId}/${newHikingId.hikingId}`;
        window.history.replaceState({}, "", newUrl);
        window.location.reload();
      }
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
      <HeaderForm onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          defaultValue={hiking.title}
          placeholder="Titre de l'activité"
          required
          {...register("title")}
        />
        <SelectHeader
          defaultValue={hiking.difficulty}
          {...register("difficulty")}
        >
          {difficulties.map((difficulty) => (
            <option
              key={difficulty.difficulty}
              value={difficulty.id}
              selected={difficulty.difficulty === hiking.difficulty}
            >
              {difficulty.difficulty}
            </option>
          ))}
        </SelectHeader>
        <SelectHeader defaultValue={hiking.state} {...register("state")}>
          {states.map((state) => (
            <option
              key={state.state}
              value={state.id}
              selected={state.state === hiking.state}
            >
              {state.state}
            </option>
          ))}
        </SelectHeader>
        <input type="submit" value="Valider" />
      </HeaderForm>
    </HeaderHikingStyle>
  );
};

export default EditHeader;
