import { IProfile } from "./reducer";

export interface Post{
    _id: string,
    title: string,
    description: string,
    profile:{
        name: IProfile
    };
    likes: string[],
    comments: [],
    image: string
}