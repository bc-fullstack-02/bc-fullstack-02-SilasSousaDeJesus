import React from "react";
import { ReactNode, useReducer } from "react";
import { Action } from "../@types/reducer";
import api from "../services/api";
import { getAuthHeader } from "../services/auth";

const defaultValue = { posts: [], errorMessage: null };
const Context = React.createContext(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: any, action: Action) => {
    switch (action.type) {
      case "create_post":
        return { ...state };
      case "show_posts":
        return { ...state, posts: action.payload };
      case "like_post":
        return { ...state };
      case "unlike_post":
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const getPost = async () => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.get("/post", authHeader);
      dispatch({
        type: "show_posts",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async ({ currentProfileId, postTargetId }) => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.post(  `/post/like/${currentProfileId}/${postTargetId}`,   authHeader);
      await getPost();
    } catch (error) {
      console.error(error);
    }
  };

  const unlikePost = async ({ currentProfileId, postTargetId }) => {
    try {
      const authHeader = await getAuthHeader();
      const response = await api.post(
        `/post/deslike/${currentProfileId}/${postTargetId}`,
        authHeader
      );
      await getPost();
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (profileId, { title, description }) => {
    try {
      const response = await api.post(
        `/post/${profileId}`,
        { title, description },
      );
      await getPost();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider value={{ ...state, getPost, likePost, unlikePost, createPost }}>
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
