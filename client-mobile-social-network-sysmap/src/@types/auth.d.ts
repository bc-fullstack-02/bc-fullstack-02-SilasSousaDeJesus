import { IProfile } from "./reducer";

export interface Auth {
    user: string;
    name?: string;
    password: string;
}

export interface UserToken {
    profile : IProfile;
    user: string;
}