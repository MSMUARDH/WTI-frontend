import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import detailService from "./detailService";


const initialState = {
  details: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


//? Add SightData
export const AddSightData = createAsyncThunk(
  "sighdata/create",
  async (details, thunkAPI) => {
    try {
      return await detailService.AddSightData(details);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


//? get All SightData
export const getAllSightData = createAsyncThunk(
  "sightdetail/getAll",
  async (thunkAPI) => {
    try {
      return await detailService.getAllSightData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


//? delete Detail
export const deleteDetail = createAsyncThunk(
  "sighdetail/delete",
  async (detailid, thunkAPI) => {
    try {
      return await detailService.deleteSightDetail(detailid);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);




//?update Detail
export const updateSightDetail = createAsyncThunk(
  "sighdetail/update",
  async (sightDetails, thunkAPI) => {
    try {
      return await detailService.updateDetail(sightDetails);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const detailsSlice = createSlice({
  name: "sightdetail",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddSightData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddSightData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("from slice payload ADD data", action.payload);
        state.details.push(action.payload);
      })
      .addCase(AddSightData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllSightData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSightData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.details = action.payload;
      })
      .addCase(getAllSightData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.details = action.payload;

      })
      .addCase(deleteDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateSightDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSightDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(updateSightDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = detailsSlice.actions;

export default detailsSlice.reducer;