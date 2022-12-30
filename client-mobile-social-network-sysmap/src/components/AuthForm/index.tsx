import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text } from "react-native";
import { Heading } from "../../Components/Heading";
import logo from "../../../assets/images/logo.png";
import { Input } from "../../Components/Input";
import { User, Lock } from "phosphor-react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";
import { Spacer } from "../../Components/Spacer";
import { Button } from "../../Components/Button";
import { Auth } from "../../@types/auth";

interface AuthFormProps {
  formTitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void ;
  linkDescription?: string;
  routeName?: string;
  signup?: boolean;
  showNameInput?: string;
}

export default function AuthForm({
  formTitle,
  submitFormButtonText,
  signup,
  submitFormButtonAction,
}: AuthFormProps) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      contentContainerStyle={styles.containerPosition}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <Image source={logo} style={styles.logo} resizeMethod="auto" />
      <Heading title="Sysmap Parrot" subtitle={formTitle} />
      <Input.Root>
        <Input.Icon>
          <User color={THEME.COLORS.CAPTION_400} />
        </Input.Icon>
        <Input.Input
          value={user}
          onChangeText={setUser}
          placeholder="Digite o seu usuário"
          placeholderTextColor={THEME.COLORS.INPUT}
          autoCapitalize="none"
          autoCorrect
        />
      </Input.Root>
      <Spacer />
      {signup ? (
        <>
          <Input.Root>
            <Input.Icon>
              <User color={THEME.COLORS.CAPTION_400} />
            </Input.Icon>
            <Input.Input
              value={name}
              onChangeText={setName}
              placeholder="Digite o seu nickname"
              placeholderTextColor={THEME.COLORS.INPUT}
              autoCapitalize="none"
              autoCorrect
            />
          </Input.Root>
          <Spacer />
        </>
      ) : null}
      <Input.Root>
        <Input.Icon>
          <Lock color={THEME.COLORS.CAPTION_400} />
        </Input.Icon>
        <Input.Input
          value={password}
          onChangeText={setPassword}
          placeholder="Digite a sua senha"
          placeholderTextColor={THEME.COLORS.INPUT}
          autoCapitalize="none"
          autoCorrect
          secureTextEntry
        />
      </Input.Root>
      <Spacer />
      <Button
        title={submitFormButtonText}
        onPress={() => submitFormButtonAction({ user, password, name })}
      />
      <Spacer />
    </KeyboardAvoidingView>
  );
}
