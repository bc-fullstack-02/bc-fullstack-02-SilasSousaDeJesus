import Heading from "../../components/Header";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { TextInput } from "../../components/textInput";
import Logo from "../../assets/react.svg";
import { Lock, User } from "phosphor-react";

function Login() {
  return (
    <div className="text-cyan-50 flex flex-col items-center mt-16">
      <header className="text-cyan-50 flex flex-col items-center">
        <img src={Logo} alt="" />
        <Heading size="lg">Sysmap Parrot</Heading>
        <Text className="mt-1 opacity-50">Faça o login e comece a usar</Text>
      </header>
      <form className="mt-10 flex flex-col gap-4 items-stretch w-full max-w-sm">
        <label htmlFor="user" className="flex flex-col gap-2">
          <Text>Login</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input
              id="user"
              type="text"
              placeholder="Digite seu login"
            />
          </TextInput.Root>
        </label>
        <label
          htmlFor="password"
          className="flex flex-col gap-4 items-stretch w-full max-w-sm "
        >
          <Text>Senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </TextInput.Root>
        </label>
        <Button type="submit" className="mt-4">Entrar</Button>
      </form>
      <h1>Footer</h1>
    </div>
  );
}

export default Login;
