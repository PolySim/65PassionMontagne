import { useForm } from "react-hook-form";
import { HikingInformation, StatisticalFormType } from "@/type.ts";
import { EditStatistical } from "@/Components/Admin/styled.ts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { update_statistical } from "@/API/updateStatistical.ts";

const Statistical = ({ hiking }: { hiking: HikingInformation }) => {
  const { hikingId } = useParams();
  const { register, handleSubmit, reset } = useForm<StatisticalFormType>({
    defaultValues: hiking,
  });

  useEffect(() => {
    reset({
      distance: hiking.length,
      elevation: hiking.elevation,
      time: hiking.duration,
    });
  }, [hiking]);

  const onSubmit = async (data: StatisticalFormType) => {
    if (hikingId) {
      await update_statistical({ ...data, hikingId: parseInt(hikingId) });
    }
  };

  return (
    <EditStatistical onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <p>Distance (en km)</p>
          <input {...register("distance")} type="number" step={0.1} />
        </div>
        <div>
          <p>Dénivelé (en m)</p>
          <input {...register("elevation")} type="number" />
        </div>
        <div>
          <p>Durée</p>
          <input {...register("time")} type="text" />
        </div>
      </div>
      <input
        type="submit"
        disabled={hikingId === "-1"}
        value="valider les statistiques"
      />
    </EditStatistical>
  );
};

export default Statistical;
