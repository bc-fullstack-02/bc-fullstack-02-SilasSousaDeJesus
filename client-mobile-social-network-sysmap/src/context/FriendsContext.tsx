import React, { useContext } from "react";
import { ReactNode, useReducer } from "react";
import { Action } from "../@types/reducer";
import api from "../services/api";
import { getAuthHeader } from "../services/auth";
import  getDataUser  from "../services/getUser";
import { Context as AuthContext } from "./AuthContext";

const defaultValue = { profiles: [], errorMessage: null, profileCurrentId: "" };
const Context = React.createContext(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: any, action: Action) => {
    switch (action.type) {
      case "show_friends":
        return { ...state, profiles: action.payload };
      case "follow_friends":
        return { ...state };
      case "unfollow_friends":
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getFriends = async () => {
    const userCurrent =  getDataUser()
    
    try {
      const authHeader = await getAuthHeader();
      const response = await api.get(
        `/profile/showAllProfile/${(await userCurrent).profile._id}`,
        authHeader
      );
      dispatch({
        type: "show_friends",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const followFriends = async (
    {profileCurrentId, profileTargetId}
  ) => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.post( `/profile/follow/${profileCurrentId}/${profileTargetId}`, authHeader);
      dispatch({
        type: "follow_friends",
        payload: response.data,
      });
      await getFriends()
    } catch (error) {
      console.error(error);
    }
  };

  const unfollowFriends = async (
    { profileCurrentId, profileTargetId }
  ) => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.post( `/profile/unfollow/${profileCurrentId}/${profileTargetId}`, authHeader);
      dispatch({
        type: "unfollow_friends",
        payload: response.data,
      });
      await getFriends()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{ ...state, getFriends, followFriends, unfollowFriends }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
