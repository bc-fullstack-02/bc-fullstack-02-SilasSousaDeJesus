import React, { useContext, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Spacer } from "../../Components/Spacer";
import api from "../../services/api";
import { Auth } from "../../@types/auth";
import AuthForm from "../../Components/AuthForm";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "../../context/AuthContext";

interface LoginProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function Login({ navigation }: LoginProps) {

  const {login, errorMessage} = useContext(AuthContext)


  function handleRegisterClick() {
    navigation.navigate("register");
  }

  return (
    <>
      <AuthForm
        formTitle="Faça o login e comece a usar!"
        submitFormButtonText="Entrar"
        submitFormButtonAction={login}
        routeName="register"
        showNameInput=""
      />

      <TouchableOpacity onPress={handleRegisterClick}>
        <Text style={styles.link}>Não possui conta? Crie uma agora!</Text>
      </TouchableOpacity>
      {errorMessage && (
        <Spacer>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </Spacer>
      )}
    </>
  );
}
