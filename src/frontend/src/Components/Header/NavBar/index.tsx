import { Favorite, NavBarStyle } from "@/Components/Header/styled.ts";
import Categories from "@/Components/Header/NavBar/Categories";
import Connection from "@/Components/Header/NavBar/Connection";

const NavBar = () => {
  return (
    <NavBarStyle>
      <Categories />
      <Favorite to={"/favorite"}>Mes favoris</Favorite>
      <Connection />
    </NavBarStyle>
  );
};

export default NavBar;
