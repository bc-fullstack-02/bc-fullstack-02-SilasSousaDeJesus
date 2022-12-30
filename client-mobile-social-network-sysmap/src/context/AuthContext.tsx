import React, { ReactElement, ReactNode, useReducer } from "react";
import api from "../services/api";
import jwt_decode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { Action, IProfile } from "../@types/reducer";
import { Auth, UserToken } from "../@types/auth";

interface IAuthContext {
  token: string | null;
  user: string | null;
  profile: IProfile;
  isLoading: boolean;
  errorMessage: string | null;
  login?: (auth: Auth) => void;
  register?: () => void;
  tryLocalLogin?: () => void;
  logout?: () => void;
}
const defaultValue = {
  token: null,
  user: null,
  profile: {
    _id: "",
    name: "",
    user: {
      _id: "",
      user: "",
    },
    myLikes: [],
    following: [],
    followers: [],
  },
  isLoading: true,
  errorMessage: null,
};
const Context = React.createContext<IAuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: any, action: Action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          ...action.payload,
          errorMessage: null,
        };
      case "user_created":
        return { ...state, errorMessage: null };
      case "logout":
        return { token: null, profile: null, user: null, errorMessage: null };
      case "add_error":
        return { ...state, errorMessage: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);
  const login = async ({ user, password }: Auth) => {
    try {
      const response = await api.post("/authentication", { user, password });

      const { access_token } = response.data;
      const dataTokenPayload: any = jwt_decode(access_token);
      const profile = dataTokenPayload.profile;
      const userCurrent = dataTokenPayload.user;
      await SecureStore.setItemAsync("token", access_token);
      await SecureStore.setItemAsync("user", userCurrent);
      await SecureStore.setItemAsync("profile", JSON.stringify(profile));

      return dispatch({
        type: "login",
        payload: { token: access_token, profile, user: userCurrent },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: "add_error",
        payload: "Houve um erro no login.",
      });
    }
  };

  const register = async ({ user, name, password }: Auth) => {
    try {
      await api.post(`/user/signup`, { user, name, password });

      dispatch({
        type: "user_created",
      });
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Houve um erro no cadastro",
      });
    }
  };

  const tryLocalLogin = async () => {
    let token, user, profile: IProfile;
    try {
      token = await SecureStore.getItemAsync("token");
      user = await SecureStore.getItemAsync("user");
      profile = JSON.parse((await SecureStore.getItemAsync("profile")) || "{}");

      dispatch({ type: "login", payload: { token, profile, user } });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("profile");

      dispatch({
        type: "logout",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        login,
        register,
        tryLocalLogin,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
