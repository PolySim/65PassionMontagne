import {
  ConnectionContainer,
  ConnectionCardStyle,
  ConnectionHeader,
} from "@/Components/Header/styled.ts";
import { Cross } from "@/Components/Header/NavBar/Connection/svg.tsx";
import SignInForm from "@/Components/Header/NavBar/Connection/SignIn";
import SignUpForm from "@/Components/Header/NavBar/Connection/SignUp";
import { useContext } from "react";
import { ConnectionContext } from "@/context.ts";

const ConnectionCard = () => {
  const { signIn, setSignIn } = useContext(ConnectionContext);

  return (
    <ConnectionContainer>
      <ConnectionCardStyle>
        <ConnectionHeader>
          <div onClick={() => setSignIn("")}>
            <Cross />
          </div>
          <div>
            <h1>{signIn === "signIn" ? "Connexion" : "S'inscrire"}</h1>
            <h4>
              {signIn === "signIn"
                ? "Connecte toi avec ton email ou ton username"
                : "Inscris-toi gratuitement avec ton email"}
            </h4>
          </div>
        </ConnectionHeader>
        {signIn === "signIn" ? <SignInForm /> : <SignUpForm />}
      </ConnectionCardStyle>
    </ConnectionContainer>
  );
};

export default ConnectionCard;
