import AuthForm from "../../components/AuthForm";
import api from "../../services/api";

function SignUp() {

  async function handleSignUp(email: string, password: string) {
    const data = await api.post("/user/signup", { email, password });
    console.log(data)
  }

  return (
    <AuthForm
      formTitle="Faça um cadastro e comece a usar"
      submitFormButtonText="Cadastrar"
      linkDescription="Já possui conta? Entre agora!"
      routeName="/"
      submitFormButtonAction={handleSignUp}
    />
  );
}

export default SignUp;
