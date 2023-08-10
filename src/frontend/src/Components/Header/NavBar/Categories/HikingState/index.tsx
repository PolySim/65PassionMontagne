import { HikingStateStyle, StateName } from "@/Components/Header/styled.ts";
import { hikingStates } from "@/Components/Header/NavBar/Categories/HikingState/hikingState.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HikingState = ({ visible }: { visible: boolean }) => {
  return (
    <HikingStateStyle $visible={visible}>
      {hikingStates.map((hikingState) => (
        <div key={hikingState.state}>
          <img
            src={`${API_KEY}/hiking/imageState/${hikingState.path}`}
            alt={hikingState.state}
          />
          <StateName to={`/1/${hikingState.id}`}>{hikingState.state}</StateName>
        </div>
      ))}
    </HikingStateStyle>
  );
};

export default HikingState;
