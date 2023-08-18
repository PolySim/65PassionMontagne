import { HikingContent, HikingStyle } from "@/Components/Hiking/styled.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HikingInformation } from "@/type.ts";
import { get_hiking_information } from "@/API/getHikingInformation.ts";
import HikingLocation from "@/Components/Hiking/Location";
import EditHeader from "@/Components/Admin/EditHiking/Herder";
import EditDescription from "@/Components/Admin/EditHiking/Description";

const EditHiking = () => {
  const { hikingId } = useParams();
  const [hiking, setHiking] = useState<HikingInformation>({
    content: "",
    images: [1],
    main_image: 1,
    state: "",
    title: "",
    difficulty: "",
    elevation: 0,
    length: 0,
    indication: "",
    duration: "",
  });

  useEffect(() => {
    const getData = async () => {
      if (hikingId) {
        const data = await get_hiking_information(parseInt(hikingId));
        setHiking(data);
      }
    };

    void getData();
  }, []);

  return (
    <HikingStyle>
      <div>
        <EditHeader hiking={hiking} />
        <HikingContent>
          <EditDescription hiking={hiking} />
          <HikingLocation hiking={hiking} />
        </HikingContent>
      </div>
    </HikingStyle>
  );
};

export default EditHiking;
