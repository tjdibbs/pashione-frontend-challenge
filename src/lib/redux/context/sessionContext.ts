import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<App.SessionInitialState> = {};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    Login: (
      state,
      { payload }: PayloadAction<Partial<App.SessionInitialState>>
    ) => {
      state.user = payload.user;
      state.token = payload.token;
    },

    LogOut: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
  },
});

export const { Login, LogOut } = sessionSlice.actions;
