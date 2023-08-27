import { MainTitle, HeaderStyle } from "@/Components/Header/styled.ts";
import { useEffect, useState } from "react";
import NavBar from "@/Components/Header/NavBar";
import NavBarPhone from "@/Components/Header/NavBarPhone";

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
      <MainTitle to={"/"}>
        {width < 300 ? "Pss Mtn" : "65 Passion Montagne"}
      </MainTitle>
      {width < 1000 ? <NavBarPhone /> : <NavBar />}
    </HeaderStyle>
  );
}
