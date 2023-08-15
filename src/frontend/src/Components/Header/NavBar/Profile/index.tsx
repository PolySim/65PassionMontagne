import { ProfileButtonStyle } from "@/Components/Header/styled.ts";
import { useContext } from "react";
import { MainContext } from "@/context.ts";

const ProfileButton = () => {
  const { user } = useContext(MainContext);

  return <ProfileButtonStyle>{user?.username}</ProfileButtonStyle>;
};

export default ProfileButton;
