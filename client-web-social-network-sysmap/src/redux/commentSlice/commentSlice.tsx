import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IComment } from "../../types/globalTypes";
import { createComment, getCommentPost } from "../../services/api";
import Swal from "sweetalert2";

const initialState: IComment[] = [];

export const GetCommentPost = createAsyncThunk(
  "comment/GetCommentPost",
  async (postId: string | undefined) => {
    const response = await getCommentPost(postId);
    return response.data;
  }
);
export const CreateAComment = createAsyncThunk(
  "comment/CreateAPost",
  async (body: any) => {
    const response = await createComment(body);
    return response.data;
  }
);

const showErrorAlert = () => {
  return Swal.fire("Oops!", "Error no servidor, tente mais tarde!", "error");
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetCommentPost.pending, (state) => {
        return state;
      })
      .addCase(GetCommentPost.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(GetCommentPost.rejected, (state) => {
        showErrorAlert();
        return state;
      });
  },
});

export const selectComment = (state: RootState) => state.commentReducer;

export default commentSlice.reducer;
