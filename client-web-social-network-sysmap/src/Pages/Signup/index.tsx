import AuthForm, { Auth } from "../../components/AuthForm";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  async function handleSignUp(auth: Auth) {
    try {
      await api.post("/user/signup", auth);
      navigate("/");
    } catch (error) {
      alert("Error creating new user.");
    }
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
