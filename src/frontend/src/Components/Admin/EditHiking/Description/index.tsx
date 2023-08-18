import { HikingDescription } from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import Statistical from "@/Components/Admin/EditHiking/Description/Statistical";
import EditDescriptionContent from "@/Components/Admin/EditHiking/Description/EditDescription";

const EditDescription = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <HikingDescription>
      <Statistical hiking={hiking} />
      <EditDescriptionContent hiking={hiking} />
    </HikingDescription>
  );
};

export default EditDescription;
