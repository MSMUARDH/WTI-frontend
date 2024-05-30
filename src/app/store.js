import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/Notes/noteSlice";

import detailReducer from "../features/Notes/detailsSlice";
import { userSlice } from "../features/Users/userSlice";
import { alertsSlice } from "../features/Alert/alertSlice";

export const store = configureStore({
  reducer: {
    SightDetails:detailReducer,
    Notes: notesReducer,
    user: userSlice.reducer,
    alerts: alertsSlice.reducer,
  },
});


