import { Favorite, NavBarStyle } from "@/Components/Header/styled.ts";
import Categories from "@/Components/Header/NavBar/Categories";
import Connection from "@/Components/Header/NavBar/Connection";
import { useContext } from "react";
import { MainContext } from "@/context.ts";
import ProfileButton from "@/Components/Header/NavBar/Profile";

const NavBar = () => {
  const { user } = useContext(MainContext);

  return (
    <NavBarStyle>
      <Categories />
      <Favorite to={"/favorite"}>Mes favoris</Favorite>
      {user ? <ProfileButton /> : <Connection />}
    </NavBarStyle>
  );
};

export default NavBar;
