import { HikingSearch } from "@/type.ts";
import {
  HikesSearchContainer,
  HikingSearchResult,
  Navigate,
} from "@/Components/Home/hikesSearch/styled.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HikesSearch = ({ hikes }: { hikes: HikingSearch[] }) => {
  const [indexFocus, setIndexFocus] = useState<number>(0);
  const navigate = useNavigate();

  const handlerEnter = async () => {
    const hiking = hikes.find((_hiking, index) => index === indexFocus);
    if (indexFocus === -1 || !hiking) return;
    navigate(`/${hiking.categoriesId}/${hiking.state_id}/${hiking.id}`);
  };

  const handlerKeyDown = (e: KeyboardEvent) => {
    if (hikes.length === 0) {
      setIndexFocus(-1);
      return;
    }
    if (e.key === "ArrowDown") {
      setIndexFocus((curr) => (curr < hikes.length - 1 ? curr + 1 : curr));
    } else if (e.key === "ArrowUp") {
      setIndexFocus((curr) => (curr > 0 ? curr - 1 : curr));
    } else if (e.key === "Enter") {
      void handlerEnter();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlerKeyDown);

    return () => window.removeEventListener("keydown", handlerKeyDown);
  }, [indexFocus, hikes]);

  return (
    <HikesSearchContainer>
      {hikes.map((hiking, index) => (
        <HikingSearchResult $isFocus={index === indexFocus} key={hiking.id}>
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
