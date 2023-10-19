import { HikingContent, HikingStyle } from "@/Components/Hiking/styled.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HikingInformation } from "@/type.ts";
import { get_hiking_information } from "@/API/getHikingInformation.ts";
import EditHeader from "@/Components/Admin/EditHiking/Herder";
import EditDescription from "@/Components/Admin/EditHiking/Description";
import EditLocation from "@/Components/Admin/EditHiking/EditLocation";

const EditHiking = () => {
  const { hikingId } = useParams();
  const [hiking, setHiking] = useState<HikingInformation>({
    content: "",
    images: [],
    main_image: -1,
    main_image_position: 50,
    state: "1",
    title: "",
    difficulty: "1",
    elevation: 0,
    length: 0,
    indication: "",
    duration: "0 h 00",
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
        <EditHeader hiking={hiking} setHiking={setHiking} />
        <HikingContent>
          <EditDescription hiking={hiking} />
          <EditLocation hiking={hiking} setHiking={setHiking} />
        </HikingContent>
      </div>
    </HikingStyle>
  );
};

export default EditHiking;
