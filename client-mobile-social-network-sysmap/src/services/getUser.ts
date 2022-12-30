import jwt_decode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store'
import { IProfile } from '../@types/reducer';

export  default async function getDataUser(){
     let token, user, profile: IProfile;
      token = await SecureStore.getItemAsync("token");
      user = await SecureStore.getItemAsync("user");
      profile = JSON.parse((await SecureStore.getItemAsync("profile")) || "{}");
    return {token, user, profile}
}
