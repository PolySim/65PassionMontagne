import { Favorite, NavBarStyle } from "@/Components/Header/styled.ts";
import Categories from "@/Components/Header/NavBar/Categories";
import Connection from "@/Components/Header/NavBar/Connection";
import { useContext } from "react";
import { MainContext } from "@/context.ts";
import LogOut from "@/Components/Header/NavBar/LogOut";

const NavBar = () => {
  const { user } = useContext(MainContext);

  return (
    <NavBarStyle>
      <Categories />
      <Favorite to={"/favorite"}>Mes favoris</Favorite>
      {user ? <LogOut /> : <Connection />}
    </NavBarStyle>
  );
};

export default NavBar;
