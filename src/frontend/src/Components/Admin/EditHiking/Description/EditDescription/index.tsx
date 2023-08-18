import { ContentFormType, HikingInformation } from "@/type.ts";
import { EditHikingContent } from "@/Components/Admin/styled.ts";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { update_content } from "@/API/updateContent.ts";

const EditDescriptionContent = ({ hiking }: { hiking: HikingInformation }) => {
  const { hikingId } = useParams();
  const { register, handleSubmit } = useForm<ContentFormType>();

  const onSubmit = async (data: ContentFormType) => {
    if (hikingId) {
      await update_content({ ...data, hikingId: parseInt(hikingId) });
    }
  };

  return (
    <EditHikingContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Description</h5>
        <textarea defaultValue={hiking.content} {...register("description")} />
        <h5>Indication</h5>
        <textarea
          defaultValue={hiking.indication}
          {...register("indication")}
        />
        <input type="submit" value="Valider les descriptions" />
      </form>
    </EditHikingContent>
  );
};

export default EditDescriptionContent;
