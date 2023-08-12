import { HeaderHikingStyle } from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

const HeaderHiking = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <HeaderHikingStyle>
      <img
        src={`${API_KEY}/hiking/getImage/${hiking.main_image}`}
        alt={hiking.title}
      />
    </HeaderHikingStyle>
  );
};

export default HeaderHiking;
