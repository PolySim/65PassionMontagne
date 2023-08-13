import { HeaderHikingStyle, StarFavorite } from "@/Components/Hiking/styled.ts";
import { HikingInformation } from "@/type.ts";
import { Star } from "@/Components/SVG/star.tsx";

const HeaderHiking = ({ hiking }: { hiking: HikingInformation }) => {
  return (
    <HeaderHikingStyle $main_image={hiking.main_image}>
      <div />
      <h3>{hiking.title}</h3>
      <p>{hiking.difficulty}</p>
      <p>{hiking.state}</p>
      <StarFavorite $isSelected={false}>
        <Star />
      </StarFavorite>
    </HeaderHikingStyle>
  );
};

export default HeaderHiking;
