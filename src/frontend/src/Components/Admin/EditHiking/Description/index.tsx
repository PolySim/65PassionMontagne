import { HikingDescription } from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import Statistical from "@/Components/Admin/EditHiking/Description/Statistical";

const EditDescription = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <HikingDescription>
      <Statistical hiking={hiking} />
    </HikingDescription>
  );
};

export default EditDescription;
