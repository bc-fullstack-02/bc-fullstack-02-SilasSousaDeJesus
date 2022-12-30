export interface Action {
    type: string;
    payload?: any
}

  
  export interface IPost {
    _id: string;
    title: string;
    description: string;
    profile: IProfile;
    comments: Array<string>;
    likes: Array<string>;
    image: string;
    image_url: string;
  }
  
  export interface IPayloadToken {
    profile: IProfile;
    user: string;
  }
  
  export interface IProfile {
    _id: string;
    name: string;
    user: {
      _id: string;
      user: string;
    };
    myLikes: Array<string>;
    following: Array<string>;
    followers: Array<string>;
  }
  
  export interface IComment {
    _id: string;
    description: string;
    profile: IProfile;
    post: string;
    likes: Array<string>;
  }