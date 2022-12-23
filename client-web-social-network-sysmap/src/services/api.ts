import axios, { AxiosResponse } from "axios";
import {
  IComment,
  ICreatePost,
  ILogin,
  IRegistration,
  IUpdateUser,
  TokenState,
} from "../types/globalTypes";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});
// user
export const signup = async (
  registration: IRegistration
): Promise<AxiosResponse> => {
  let url = `/user/signup`;

  return api.post(url, {
    user: registration.user,
    password: registration.password,
    name: registration.name,
  });
};

export const Login = async (login: ILogin): Promise<TokenState> => {
  let url = `/authentication`;
  return await api.post(url, login);
};

export const deleteUser = async (id: string): Promise<AxiosResponse> => {
  let url = `/user/delete/${id}`;
  return api.delete(url);
};
export const editUSer = async (
  id: string,
  update: IUpdateUser
): Promise<AxiosResponse> => {
  let url = `/user/edit/${id}`;
  return api.put(url, update);
};

// post

export const findOnePost = async (
  postId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/post/onepost/${postId}`;
  return api.get(url);
};

export const timeLine = async (
  profileId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/post/timeLine/${profileId}`;
  return api.get(url);
};
export const feedProfile = async (
  profileId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/post/feed/${profileId}`;
  return api.get(url);
};
export const createPost = async (
  profileId: string | undefined,
  post: ICreatePost
): Promise<AxiosResponse> => {
  let url = `/post/${profileId}`;
  return api.post(url, { title: post.title, description: post.description });
};

export const editPost = async (
  profileId: string | undefined,
  postId: string | undefined,
  post: ICreatePost
): Promise<AxiosResponse> => {
  let url = `/post/update/${profileId}/${postId}`;
  return api.put(url, { title: post.title, description: post.description });
};
export const delPost = async (
  profileId: string | undefined,
  postId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/post/delete/${profileId}/${postId}`;
  return api.delete(url);
};

export const like = async (
  currentProfileId: string | undefined,
  postTargetId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/post/like/${currentProfileId}/${postTargetId}`;
  return api.post(url);
};
export const deslike = async (
  currentProfileId: string | undefined,
  postTargetId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/post/deslike/${currentProfileId}/${postTargetId}`;
  return api.post(url);
};

// profile
export const finOne = async (
  profileId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/profile/${profileId}`;
  return api.get(url);
};
export const getAllProfile = async (
  profileCurrentId: string
): Promise<AxiosResponse> => {
  let url = `/profile/showAllProfile/${profileCurrentId}`;
  return api.get(url);
};

export const followProfile = async (
  profileCurrentId: string,
  profileTargetId: string
): Promise<AxiosResponse> => {
  let url = `/profile/follow/${profileCurrentId}/${profileTargetId}`;
  return api.post(url);
};
export const unfollowProfile = async (
  profileCurrentId: string,
  profileTargetId: string
): Promise<AxiosResponse> => {
  let url = `/profile/unfollow/${profileCurrentId}/${profileTargetId}`;
  return api.post(url);
};

// comments

export const getCommentPost = async (
  postId: string | undefined
): Promise<AxiosResponse> => {
  let url = `/comment/${postId}`;
  return api.get(url);
};
export const createComment = async (body: any): Promise<AxiosResponse> => {
  let url = `/comment/${body.profileId}/${body.postId}`;
  return api.post(url, body.comment);
};
