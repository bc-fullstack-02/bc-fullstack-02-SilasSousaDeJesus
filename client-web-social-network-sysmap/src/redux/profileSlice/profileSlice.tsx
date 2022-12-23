import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProfile } from "../../types/globalTypes";
import {
  getAllProfile,
  followProfile,
  unfollowProfile,
} from "../../services/api";
import Swal from "sweetalert2";

const initialState: IProfile[] = [];

export const GetAllProfile = createAsyncThunk(
  "profile/getProfile",
  async (profileCurrentId: string) => {
    const response = await getAllProfile(profileCurrentId);
    return response.data;
  }
);
export const onfollowProfile = createAsyncThunk(
  "profile/followProfile",
  async (data: any) => {
    const response = await followProfile(
      data.profileCurrentId,
      data.profileTargetId
    );
    return response.data;
  }
);
export const onUnfollowProfile = createAsyncThunk(
  "profile/UnFollowProfile",
  async (data: any) => {
    const response = await unfollowProfile(
      data.profileCurrentId,
      data.profileTargetId
    );
    return response.data;
  }
);

const showErrorAlert = () => {
  return Swal.fire("Oops!", "Error no servidor, tente mais tarde!", "error");
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllProfile.pending, (state) => {
        return state;
      })
      .addCase(GetAllProfile.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(GetAllProfile.rejected, (state) => {
        showErrorAlert();
        return state;
      });
  },
});

export const selectProfile = (state: RootState) => state.profileReducer;

export default profileSlice.reducer;
