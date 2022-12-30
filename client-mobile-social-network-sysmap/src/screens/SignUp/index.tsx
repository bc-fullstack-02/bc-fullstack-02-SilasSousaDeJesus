import React, { useState } from "react";
import api from "../../services/api";
import AuthForm from "../../Components/AuthForm";
import { Text, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { Auth } from "../../@types/auth";

interface SignUpProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export function SignUp({ navigation }: SignUpProps) {
  function handleLoginClick() {
    navigation.navigate("login");
  }

  async function handleSignUp(auth: Auth) {
    try {
      await api.post("/user/signup", auth);
      navigation.navigate("login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <AuthForm
        formTitle="Faça o cadastro e comece a usar!"
        submitFormButtonText="Cadastrar"
        submitFormButtonAction={handleSignUp}
        signup
        routeName="home"
      />
      <TouchableOpacity onPress={handleLoginClick}>
        <Text style={styles.link}>
          Já possui conta? Clique aqui para fazer o login
        </Text>
      </TouchableOpacity>
    </>
  );
}
