import { categories } from "@/Components/Header/categories.ts";
import {
  Category,
  LogInButton,
  NavBarLaptopStyle,
} from "@/Components/Header/styled.ts";

const NavBarLaptop = () => {
  return (
    <NavBarLaptopStyle>
      <div>
        <div>Categories</div>
        <div>
          {categories.map((category) => (
            <Category key={category.name} to={`/${category.id}`}>
              {category.name}
            </Category>
          ))}
        </div>
      </div>
      <Category to={"/favorite"}>Mes favoris</Category>
      <LogInButton>Log in</LogInButton>
    </NavBarLaptopStyle>
  );
};

export default NavBarLaptop;
