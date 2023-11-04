import { MenuContainer, NavBarPhoneStyle } from "@/Components/Header/styled.ts";
import { useContext, useState } from "react";
import { MainContext } from "@/context.ts";
import LogOut from "@/Components/Header/NavBar/LogOut";
import Connection from "@/Components/Header/NavBar/Connection";
import MenuPhone from "@/Components/Header/NavBarPhone/MenuPhone";
import WithStateOpen from "@/Components/Header/NavBarPhone/WithStateOpen";

const NavBarPhone = () => {
  const { user } = useContext(MainContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryWithStateOpen, setCategoryWithStateOpen] = useState<number>(0);

  const handlerStateOpen = (id: number) => {
    setCategoryWithStateOpen(id);
  };

  const handlerNavigateState = (keepOpen: boolean) => {
    setIsOpen(keepOpen);
    setCategoryWithStateOpen(0);
  };

  return (
    <NavBarPhoneStyle $isOpen={isOpen}>
      {user ? <LogOut /> : <Connection />}
      <div
        onClick={() => {
          setIsOpen((curr) => !curr);
          handlerStateOpen(0);
        }}
      >
        <span />
        <span />
        <span />
      </div>
      <MenuContainer $isOpen={isOpen}>
        <MenuPhone
          handlerStateOpen={handlerStateOpen}
          withStateOpen={categoryWithStateOpen !== 0}
          setIsOpen={setIsOpen}
        />
        <WithStateOpen
          withStateOpen={categoryWithStateOpen !== 0}
          stateOpen={categoryWithStateOpen}
          handlerNavigateState={handlerNavigateState}
        />
      </MenuContainer>
    </NavBarPhoneStyle>
  );
};

export default NavBarPhone;
