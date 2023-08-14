import { SignInFormStyle } from "@/Components/Header/styled.ts";
import { useForm } from "react-hook-form";
import { SignUpFormType } from "@/type.ts";
import { useContext, useState } from "react";
import { ConnectionContext, MainContext } from "@/context.ts";
import { sign_up } from "@/API/signUp.ts";

const SignUpForm = () => {
  const [error, setError] = useState<"email" | "username" | null>(null);
  const { setSignIn } = useContext(ConnectionContext);
  const { setUser } = useContext(MainContext);
  const { register, handleSubmit } = useForm<SignUpFormType>();

  const onSubmit = async (data: SignUpFormType) => {
    const res = await sign_up(data);
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
        placeholder="Username"
        {...register("username")}
        style={error === "username" ? { border: "2px solid red" } : {}}
        minLength={3}
        required
      />
      <input
        type="text"
        placeholder="Email"
        {...register("email")}
        required
        style={error === "email" ? { border: "2px solid red" } : {}}
        minLength={10}
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        minLength={6}
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
