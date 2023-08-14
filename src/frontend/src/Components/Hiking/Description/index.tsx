import {
  DownloadHiking,
  HikingDescription,
  HikingResume,
  StatisticalHiking,
} from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const DescriptionHiking = ({ hiking }: { hiking: HikingInformation }) => {
  const params = useParams();
  const hikingId = parseInt(params.hikindId || "1");

  return (
    <HikingDescription>
      <StatisticalHiking>
        <div>
          <p>Distance</p>
          <p>{hiking.length} km</p>
        </div>
        <div>
          <p>Dénivelé</p>
          <p>{hiking.elevation} m</p>
        </div>
        <div>
          <p>Durée</p>
          <p>{hiking.duration}</p>
        </div>
      </StatisticalHiking>
      <HikingResume>
        <h5>Description</h5>
        <p>{hiking.content}</p>
        <h5>Indication</h5>
        <p>{hiking.indication}</p>
      </HikingResume>
      <DownloadHiking>
        <h5>Tu es intéressé ? </h5>
        <div>
          <a href={`${API_KEY}/hiking/gpx/${hikingId}`} download>
            Télécharge le tracet GPX
          </a>
          <div>Ajoute le en favori</div>
        </div>
      </DownloadHiking>
    </HikingDescription>
  );
};

export default DescriptionHiking;
