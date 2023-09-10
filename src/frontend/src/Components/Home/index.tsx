import { Find, HomeStyle } from "@/Components/Home/styled.ts";
import { useEffect, useRef } from "react";
import SearchSVG from "@/Components/Home/SearchSVG.tsx";

export default function Home(): JSX.Element {
  const images = [1, 2, 3, 4];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    const interval = setInterval(() => {
      if (element) {
        element.scrollLeft === window.innerWidth * 3
          ? (element.scrollLeft = 0)
          : (element.scrollLeft += window.innerWidth);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HomeStyle>
      <div ref={containerRef}>
        {images.map((elt) => (
          <img src={`/Home/${elt}.jpg`} alt={`image-${elt}`} key={elt} />
        ))}
      </div>
      <Find>
        <h4>Trouve ton bonheur </h4>
        <div>
          <SearchSVG />
          <input
            type="search"
            placeholder="Recherche des randos, escalades, refuges ..."
          />
        </div>
      </Find>
    </HomeStyle>
  );
}
