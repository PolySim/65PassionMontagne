import { NavBarPhoneStyle } from "@/Components/Header/styled.ts";
import { useContext, useState } from "react";
import { MainContext } from "@/context.ts";
import LogOut from "@/Components/Header/NavBar/LogOut";
import Connection from "@/Components/Header/NavBar/Connection";
import MenuPhone from "@/Components/Header/NavBarPhone/MenuPhone";

const NavBarPhone = () => {
  const { user } = useContext(MainContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <NavBarPhoneStyle $isOpen={isOpen}>
      {user ? <LogOut /> : <Connection />}
      <div onClick={() => setIsOpen((curr) => !curr)}>
        <span />
        <span />
        <span />
      </div>
      <MenuPhone isOpen={isOpen} setIsOpen={setIsOpen} />
    </NavBarPhoneStyle>
  );
};

export default NavBarPhone;
