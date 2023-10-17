import {
  ButtonExploreTopo,
  HikingExploreCardStyle,
} from "@/Components/Explore/styled.ts";
import { HikingExplore } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HikingExploreCard = ({ hiking }: { hiking: HikingExplore }) => {
  return (
    <HikingExploreCardStyle>
      <div>
        <img
          src={`${API_KEY}/hiking/getImage/${hiking.main_image}`}
          alt={hiking.title}
        />
      </div>
      <p>{hiking.title}</p>
      <ButtonExploreTopo
        to={
          hiking.state_id ? `${hiking.state_id}/${hiking.id}` : `${hiking.id}`
        }
      >
        Voir le topo
      </ButtonExploreTopo>
    </HikingExploreCardStyle>
  );
};

export default HikingExploreCard;
