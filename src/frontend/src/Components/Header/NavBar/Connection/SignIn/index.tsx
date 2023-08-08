import { SignInFormStyle } from "@/Components/Header/styled.ts";
import { useForm } from "react-hook-form";
import { SignInFormType } from "@/type.ts";
import { useContext } from "react";
import { ConnectionContext } from "@/context.ts";

const SignInForm = () => {
  const { setSignIn } = useContext(ConnectionContext);
  const { register, handleSubmit } = useForm<SignInFormType>();

  const onSubmit = (data: SignInFormType) => {
    console.log(data);
  };

  return (
    <SignInFormStyle onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email / Username"
        {...register("email")}
        required
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        required
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
