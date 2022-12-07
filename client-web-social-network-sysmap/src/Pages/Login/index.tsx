import AuthForm from "../../components/AuthForm";
import api from "../../services/api";
import jwt_decode from "jwt-decode";

interface UserToken {
  profile : string;
  user: string;
}

function Login() {
  async function handleLogin(email: string, password: string) {
    const data = await api.post("/authentication", { email, password });
    // console.log(jwt_decode(data.accessToken)) as UserToken;
  }

  return (
    <AuthForm
      formTitle="Faça o login e comece a usar"
      linkDescription="Não possui conta? Crie uma agora!"
      submitFormButtonText="Entrar"
      routeName="signup"
      submitFormButtonAction={handleLogin}
    />
  );
}

export default Login;
