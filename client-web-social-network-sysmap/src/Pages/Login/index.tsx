import Heading from "../../components/Header";
import Text from "../../components/Text";
import Logo from "../../assets/react.svg";
function Login() {
  return (
    <div className="text-cyan-50 flex flex-col items-center mt-16">
      <header className="text-cyan-50 flex flex-col items-center">
        <img src={Logo} alt="" />
        <Heading>Sysmap Parrot</Heading>
        <Heading>Faça o login e comece a usar</Heading>
      </header>
      <h1>Form</h1>
      <h1>Footer</h1>
    </div>
  );
}

export default Login;
