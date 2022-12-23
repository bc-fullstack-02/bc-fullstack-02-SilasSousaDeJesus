import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {  IPost } from "../../types/globalTypes";
import { createPost, delPost, deslike, feedProfile, like, timeLine,  findOnePost, editPost } from "../../services/api";
import Swal from "sweetalert2";

const initialState: IPost[] = [];

export const GetAllPostProfile = createAsyncThunk(
  "post/getProfilePost",
  async (profileId: string) => {
    const response = await feedProfile(profileId);
    return response.data;
  }
);
export const GetOnPost = createAsyncThunk(
  "post/GetOnPost",
  async (profileId: string | undefined) => {
    const response = await findOnePost(profileId);
    return response.data;
  }
);
export const GetTimeLinePost = createAsyncThunk(
  "post/GetTimeLinePost",
  async (profileId: string) => {
    const response = await timeLine(profileId);
    return response.data;
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (data: any) => {
    return await delPost(data.profileId, data.postId);
  }
);
export const CreatePost = createAsyncThunk(
  "post/CreatePost",
  async (data: any) => {
    const response = await createPost(data.profileId, data.post);
    return response.data;
  }
);
export const EditAPost = createAsyncThunk(
  "post/EditPost",
  async (data: any) => {
    const response = await editPost(data.profileId, data.postId, data.post);
    return response.data;
  }
);


export const likePost = createAsyncThunk(
  "post/likePost",
  async (data: any) => {
    const response = await like(data.currentProfileId, data.postTargetId);
    return response.data;
  }
);
export const DeslikePost = createAsyncThunk(
  "post/deslikePost",
  async (data: any) => {
    const response = await deslike(data.currentProfileId, data.postTargetId);
    return response.data;
  }
);

const showErrorAlert = () => {
  return Swal.fire("Oops!", "Error no servidor, tente mais tarde!", "error");
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetOnPost.pending, (state) => {
        return state;
      })
      .addCase(GetOnPost.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(GetOnPost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(GetAllPostProfile.pending, (state) => {
        return state;
      })
      .addCase(GetAllPostProfile.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(GetAllPostProfile.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(GetTimeLinePost.pending, (state) => {
        return state;
      })
      .addCase(GetTimeLinePost.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(GetTimeLinePost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(CreatePost.pending, (state) => {
        return state;
      })
      .addCase(CreatePost.fulfilled, (state, action) => {
        Swal.fire("Parabéns!", "Post Criada com sucesso!", "success");
        return state;
      })
      .addCase(CreatePost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(deletePost.pending, (state) => {
        return state;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        Swal.fire("....", "Post deletado com sucesso!", "success");
        return state;
      })
      .addCase(deletePost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(likePost.pending, (state) => {
        return state;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        return state;
      })
      .addCase(likePost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(DeslikePost.pending, (state) => {
        return state;
      })
      .addCase(DeslikePost.fulfilled, (state, action) => {
        return state;
      })
      .addCase(DeslikePost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
    builder
      .addCase(EditAPost.pending, (state) => {
        return state;
      })
      .addCase(EditAPost.fulfilled, (state, action) => {
        return state;
      })
      .addCase(EditAPost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
  },
});

export const selectPosts = (state: RootState) => state.postReducer;

export default postSlice.reducer;
