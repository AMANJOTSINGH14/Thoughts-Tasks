import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchThoughtsApi, fetchPublicThoughtsApi, addThoughtApi, editThoughtApi, deleteThoughtApi, toggleThoughtPrivacyApi,likeThoughtApi } from '../../services/Api';

const initialState = {
  thoughts: [],
  loading: false,
  error: null,
};
export const likeThought = createAsyncThunk('thoughts/likeThought', async (thoughtId) => {
  const response = await likeThoughtApi(thoughtId);
  return response.data;
});
export const fetchThoughts = createAsyncThunk('thoughts/fetchThoughts', async (userId) => {
  const response = await fetchThoughtsApi(userId);
  return response.data;
});

export const fetchPublicThoughts = createAsyncThunk('thoughts/fetchPublicThoughts', async () => {
  const response = await fetchPublicThoughtsApi();
  return response.data;
});

export const addThought = createAsyncThunk('thoughts/addThought', async ({ userId, text }) => {
  const response = await addThoughtApi(userId, text);
  return response.data;
});

export const editThought = createAsyncThunk('thoughts/editThought', async ({ userId, thoughtId, text }) => {
  const response = await editThoughtApi(userId, thoughtId, text);
  return response.data;
});

export const deleteThought = createAsyncThunk('thoughts/deleteThought', async ({ userId, thoughtId }) => {
  await deleteThoughtApi(userId, thoughtId);
  return thoughtId;
});

export const toggleThoughtPrivacy = createAsyncThunk('thoughts/toggleThoughtPrivacy', async ({ userId, thoughtId }) => {
  const response = await toggleThoughtPrivacyApi(userId, thoughtId);
  return response.data;
});

const thoughtsSlice = createSlice({
  name: 'thoughts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThoughts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThoughts.fulfilled, (state, action) => {
        state.loading = false;
        state.thoughts = action.payload;
      })
      .addCase(fetchThoughts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPublicThoughts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicThoughts.fulfilled, (state, action) => {
        state.loading = false;
        state.thoughts = action.payload;
      })
      .addCase(fetchPublicThoughts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addThought.fulfilled, (state, action) => {
        state.thoughts.push(action.payload);
      })
      .addCase(editThought.fulfilled, (state, action) => {
        const index = state.thoughts.findIndex((thought) => thought._id === action.payload._id);
        state.thoughts[index] = action.payload;
      })
      .addCase(deleteThought.fulfilled, (state, action) => {
        state.thoughts = state.thoughts.filter((thought) => thought._id !== action.payload);
      })
      .addCase(toggleThoughtPrivacy.fulfilled, (state, action) => {
        const index = state.thoughts.findIndex((thought) => thought._id === action.payload._id);
        state.thoughts[index] = action.payload;
      }).addCase(likeThought.fulfilled, (state, action) => {
        const index = state.thoughts.findIndex((thought) => thought._id === action.payload._id);
        if (index !== -1) {
          state.thoughts[index] = action.payload;
        }
      });
  },
});

export default thoughtsSlice.reducer;
