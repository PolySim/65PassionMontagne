import { SignInFormStyle } from "@/Components/Header/styled.ts";
import { useForm } from "react-hook-form";
import { SignUpFormType } from "@/type.ts";
import { useContext } from "react";
import { ConnectionContext } from "@/context.ts";

const SignUpForm = () => {
  const { setSignIn } = useContext(ConnectionContext);
  const { register, handleSubmit } = useForm<SignUpFormType>();

  const onSubmit = () => {};

  return (
    <SignInFormStyle onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        {...register("username")}
        required
      />
      <input type="text" placeholder="Email" {...register("email")} required />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        required
      />
      <input type="submit" value="S'inscrire" />
      <div>
        <p>
          Déjà un compte ?{" "}
          <span onClick={() => setSignIn("signIn")}>Connexion</span>
        </p>
      </div>
    </SignInFormStyle>
  );
};

export default SignUpForm;
