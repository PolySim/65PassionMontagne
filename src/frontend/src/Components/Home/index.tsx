import { Find, HomeStyle } from "@/Components/Home/styled.ts";
import React, { useEffect, useRef, useState } from "react";
import SearchSVG from "@/Components/Home/SearchSVG.tsx";
import { HikingSearch } from "@/type.ts";
import { findHikes } from "@/Components/Home/findHiking.ts";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export default function Home(): JSX.Element {
  const [allHikes, setAllHikes] = useState<HikingSearch[]>([]);
  const [hikesSearch, setHikesSearch] = useState<HikingSearch[]>([]);
  const images = [1, 2, 3, 4];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void getData();

    const element = containerRef.current;
    const interval = setInterval(() => {
      handlerBgImg(element);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlerBgImg = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollLeft === window.innerWidth * 3
        ? (element.scrollLeft = 0)
        : (element.scrollLeft += window.innerWidth);
    }
  };

  const getData = async () => {
    try {
      const res = await fetch(`${API_KEY}/hiking/getAllHikes`);
      const data = await res.json();
      setAllHikes(data);
    } catch (e) {
      throw new Error(`get all hikes error : ${e}`);
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHikesSearch(findHikes(allHikes, e.target.value));
  };

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
            onChange={handlerChange}
            type="search"
            placeholder="Recherche des randos, escalades, refuges ..."
          />
        </div>
        {hikesSearch.map((hiking) => (
          <div key={hiking.id}>{hiking.title}</div>
        ))}
      </Find>
    </HomeStyle>
  );
}
