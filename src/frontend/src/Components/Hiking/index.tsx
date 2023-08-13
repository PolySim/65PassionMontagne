import { HikingStyle } from "@/Components/Hiking/styled.ts";
import HeaderHiking from "@/Components/Hiking/Header";
import { useEffect, useState } from "react";
import { HikingInformation } from "@/type.ts";
import { get_hiking_information } from "@/API/getHikingInformation.ts";
import { useParams } from "react-router-dom";

const Hiking = () => {
  const params = useParams();
  const hikingId = parseInt(params.hikingId || "1");

  const [hiking, setHiking] = useState<HikingInformation>({
    content: "",
    images: [1],
    main_image: 1,
    state: "",
    title: "",
    difficulty: "",
    elevation: 0,
    length: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const data = await get_hiking_information(hikingId);
      setHiking(data);
    };

    getData();
  }, []);

  return (
    <HikingStyle>
      <div>
        <HeaderHiking hiking={hiking} />
      </div>
    </HikingStyle>
  );
};

export default Hiking;
