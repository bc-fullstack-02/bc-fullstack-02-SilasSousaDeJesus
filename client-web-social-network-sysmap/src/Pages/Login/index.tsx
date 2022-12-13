import { useNavigate } from "react-router-dom";
import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api";
import jwt_decode from "jwt-decode";

interface UserToken {
  profile: profile;
  user: string;
}

interface payload {
  data: {
    access_token: string;
  };
}

interface profile {
  profile: {
    _id: string;
    name: string;
    user: string;
    myLikes: Array<string>;
    following: Array<string>;
    followers: Array<string>;
  };
  user: string;
}

function Login() {
  const navigate = useNavigate();
  async function handleLogin(auth: Auth) {
    const dataPayload: payload = await api.post("/authentication", auth);
    const decodedToken = jwt_decode(dataPayload.data.access_token) as UserToken;
    localStorage.setItem("profile", JSON.stringify(decodedToken.profile));
    localStorage.setItem("user", decodedToken.user);
    localStorage.setItem("token", dataPayload.data.access_token);

    return navigate("/home");
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
