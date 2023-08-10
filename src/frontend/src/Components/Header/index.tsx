import { MainTitle, HeaderStyle } from "@/Components/Header/styled.ts";
import { useEffect, useState } from "react";
import NavBar from "@/Components/Header/NavBar";

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
      <NavBar />
    </HeaderStyle>
  );
}
