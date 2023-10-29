import { HikingSearch } from "@/type.ts";
import {
  HikesSearchContainer,
  HikingSearchResult,
  Navigate,
} from "@/Components/Home/hikesSearch/styled.ts";

const HikesSearch = ({ hikes }: { hikes: HikingSearch[] }) => {
  return (
    <HikesSearchContainer>
      {hikes.map((hiking) => (
        <HikingSearchResult key={hiking.id}>
          <p>{hiking.title}</p>
          <p>
            <span>{hiking.state}</span> - <span>{hiking.difficulty}</span>
          </p>
          <Navigate
            to={`/${hiking.categoriesId}/${hiking.state_id}/${hiking.id}`}
          />
        </HikingSearchResult>
      ))}
    </HikesSearchContainer>
  );
};

export default HikesSearch;
