import { FullScreenImageStyle } from "@/Components/Hiking/styled.ts";
import React, { KeyboardEvent, useEffect, useRef } from "react";
import { Cross } from "@/Components/Header/NavBar/Connection/svg.tsx";
import ArrowNav from "@/Components/SVG/arrowNav.tsx";

const API_KEY = import.meta.env.PROD
  ? import.meta.env.VITE_PUBLIC_BACK_URL_PROD
  : import.meta.env.VITE_PUBLIC_BACK_URL_DEV;

export const FullScreenImage = ({
  setFullScreenId,
  imageFocus,
  images,
}: {
  setFullScreenId: React.Dispatch<React.SetStateAction<number | null>>;
  imageFocus: number;
  images: number[];
}) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const handleScroll = (left: boolean, step: number) => {
    const element = scrollContainer.current;

    if (element) {
      left
        ? (element.scrollLeft -= step * window.innerWidth)
        : (element.scrollLeft += step * window.innerWidth);
    }
  };

  const handleKeys = (keyEvent: KeyboardEvent) => {
    switch (keyEvent.key) {
      case "Escape":
        setFullScreenId(null);
        break;
      case "ArrowLeft":
        handleScroll(true, 1);
        break;
      case "ArrowRight":
        handleScroll(false, 1);
        break;
    }
  };

  useEffect(() => {
    handleScroll(false, imageFocus);

    // @ts-ignore
    window.addEventListener("keydown", handleKeys);
    // @ts-ignore
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  return (
    <FullScreenImageStyle>
      <Cross onClick={() => setFullScreenId(null)} />
      <ArrowNav reverse={true} onClick={() => handleScroll(true, 1)} />
      <ArrowNav reverse={false} onClick={() => handleScroll(false, 1)} />

      <div ref={scrollContainer}>
        {images.map((id) => (
          <div key={id}>
            <img
              src={`${API_KEY}/hiking/getImage/${id}`}
              alt={`image-${imageFocus}`}
            />
          </div>
        ))}
      </div>
    </FullScreenImageStyle>
  );
};

export default FullScreenImage;
