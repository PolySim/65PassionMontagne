import { MainTitle, HeaderStyle } from "@/Components/Header/styled.ts";
import { useEffect, useState } from "react";
import NavBarLaptop from "@/Components/Header/NavBarLaptop";

export default function Header(): JSX.Element {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <HeaderStyle>
      <MainTitle to={"/"}>65 Passion Montagne</MainTitle>
      {width < 1000 ? <></> : <NavBarLaptop />}
    </HeaderStyle>
  );
}
