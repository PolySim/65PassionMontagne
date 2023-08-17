import { useForm } from "react-hook-form";
import { HeaderFormType, HikesState, HikingInformation } from "@/type.ts";
import { HeaderHikingStyle } from "@/Components/Hiking/styled.ts";
import { HeaderForm, SelectHeader } from "@/Components/Admin/styled.ts";
import { useEffect, useState } from "react";
import { get_difficulty } from "@/API/getDifficulty.ts";
import { getHikesState } from "@/API/getHikesStates.ts";
import { useParams } from "react-router-dom";
import { update_header } from "@/API/updateHeader.ts";

const EditHeader = ({ hiking }: { hiking: HikingInformation }) => {
  const { hikingId } = useParams();
  const { register, handleSubmit } = useForm<HeaderFormType>();
  const [states, setStates] = useState<HikesState>([
    {
      id: -1,
      state: "",
      path: "",
    },
  ]);
  const [difficulties, setDifficulties] = useState<
    { id: number; difficulty: string }[]
  >([
    {
      id: -1,
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

  const onSubmit = (data: HeaderFormType) => {
    if (hikingId) {
      void update_header({ ...data, hikingId: parseInt(hikingId) });
    }
  };

  return (
    <HeaderHikingStyle $main_image={hiking.main_image}>
      <HeaderForm onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          defaultValue={hiking.title}
          placeholder="Titre de l'activité"
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
