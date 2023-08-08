import { ConnectionStyle, LogInButton } from "@/Components/Header/styled.ts";
import { useState } from "react";
import ConnectionCard from "@/Components/Header/NavBar/Connection/ConnectionCard";
import { ConnectionContext } from "@/context.ts";

const Connection = () => {
  const [signIn, setSignIn] = useState<"" | "signIn" | "signUp">("signUp");

  return (
    <ConnectionContext.Provider
      value={{
        signIn,
        setSignIn,
      }}
    >
      <ConnectionStyle>
        <LogInButton onClick={() => setSignIn("signIn")} $signIn>
          Connexion
        </LogInButton>
        <LogInButton onClick={() => setSignIn("signUp")} $signIn={false}>
          S'inscrire
        </LogInButton>
        {signIn === "" ? <></> : <ConnectionCard />}
      </ConnectionStyle>
    </ConnectionContext.Provider>
  );
};

export default Connection;
