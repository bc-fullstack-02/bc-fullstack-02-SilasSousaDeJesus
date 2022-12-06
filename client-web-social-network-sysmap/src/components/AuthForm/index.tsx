import Heading from "../../components/Header";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { TextInput } from "../../components/textInput";
import Logo from "../../assets/react.svg";
import { Lock, User } from "phosphor-react";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

interface AuthFormProps {
  formTitle: string;
  submitFormButtonText: string;
  linkDescription: string;
  routeName: string;
  submitFormButtonAction: (email: string, password: string) => void;
}

function AuthForm({
  formTitle,
  submitFormButtonText,
  linkDescription,
  submitFormButtonAction,
  routeName,
}: AuthFormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    submitFormButtonAction(form.elements.email.value, form.elements.password.value)
  }

  return (
    <div className="text-cyan-50 flex flex-col items-center mt-16">
      <header className="text-cyan-50 flex flex-col items-center">
        <img src={Logo} alt="" />
        <Heading size="lg">Sysmap Parrot</Heading>
        <Text className="mt-1 opacity-50">{formTitle}</Text>
      </header>
      <form
        className="mt-10 flex flex-col gap-4 items-stretch w-full max-w-sm"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label htmlFor="user" className="flex flex-col gap-2">
          <Text>Login</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input
              id="email"
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
        <Button type="submit" className="mt-4">
          {submitFormButtonText}
        </Button>
      </form>
      <footer className="flex flex-col items-center gap-4 mt-8">
        <Text asChild size="sm">
          <Link
            to={routeName}
            className="text-gray-400 underline hover:text-green-200 "
          >
            {linkDescription}
          </Link>
        </Text>
      </footer>
    </div>
  );
}

export default AuthForm;
