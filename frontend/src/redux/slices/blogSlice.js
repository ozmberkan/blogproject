import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  myBlogs: [],
  status: "idle",
};

export const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async () => {
  try {
    const res = await axios.get("http://localhost:5002/api/blog/all");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getBlogByCreatedID = createAsyncThunk(
  "blogs/getBlogByCreatedID",
  async (id) => {
    try {
      const res = await axios.get(`http://localhost:5002/api/blog/get/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = "success";
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getBlogByCreatedID.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogByCreatedID.fulfilled, (state, action) => {
        state.status = "success";
        state.myBlogs = action.payload;
      })
      .addCase(getBlogByCreatedID.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
