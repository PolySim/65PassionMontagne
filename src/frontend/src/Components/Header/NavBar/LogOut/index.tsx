import { LotOut } from "@/Components/Header/styled.ts";
import { useContext } from "react";
import { MainContext } from "@/context.ts";

const LogOut = () => {
  const { setUser } = useContext(MainContext);

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return <LotOut onClick={handleLogOut}>Deconnexion</LotOut>;
};

export default LogOut;
