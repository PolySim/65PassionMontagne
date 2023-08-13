import {
  HikingDescription,
  HikingResume,
  StatisticalHiking,
} from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";

const DescriptionHiking = ({ hiking }: { hiking: HikingInformation }) => {
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
        <p>{hiking.content}</p>
      </HikingResume>
    </HikingDescription>
  );
};

export default DescriptionHiking;
