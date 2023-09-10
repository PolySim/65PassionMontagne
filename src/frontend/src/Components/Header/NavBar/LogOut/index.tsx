import { LotOutStyle } from "@/Components/Header/styled.ts";
import { useContext } from "react";
import { MainContext } from "@/context.ts";

const LogOut = () => {
  const { setUser } = useContext(MainContext);

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return <LotOutStyle onClick={handleLogOut}>Deconnexion</LotOutStyle>;
};

export default LogOut;
