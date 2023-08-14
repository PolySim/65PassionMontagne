import { SignInFormStyle } from "@/Components/Header/styled.ts";
import { useForm } from "react-hook-form";
import { SignInFormType } from "@/type.ts";
import { useContext, useState } from "react";
import { ConnectionContext, MainContext } from "@/context.ts";
import { sign_In } from "@/API/signIn.ts";

const SignInForm = () => {
  const [error, setError] = useState<"password" | "username" | null>(null);
  const { setSignIn } = useContext(ConnectionContext);
  const { register, handleSubmit } = useForm<SignInFormType>();
  const { setUser } = useContext(MainContext);

  const onSubmit = async (data: SignInFormType) => {
    const res = await sign_In(data);
    if ("id" in res) {
      setUser(res);
      setSignIn("");
    } else {
      setError(res.error);
    }
  };

  return (
    <SignInFormStyle onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email / Username"
        {...register("email")}
        style={error === "username" ? { border: "2px solid red" } : {}}
        required
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        required
        style={error === "password" ? { border: "2px solid red" } : {}}
      />
      <input type="submit" value="Connexion" />
      <div>
        <p>
          Mot de passe oublié ? <span>Reset</span>
        </p>
        <p>
          Pas de compte ?{" "}
          <span onClick={() => setSignIn("signUp")}>S'inscrire</span>
        </p>
      </div>
    </SignInFormStyle>
  );
};

export default SignInForm;
