import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const defaultState = JSON.stringify({
  mode: "default",
  user: {
    name: "Timi James",
    phone: "+2349017241037",
    email: "oderindejames02@gmail.com",
    website: "https://timijames.com",
    address: {
      street: "44 sholanke street",
      zipcode: "100216",
    },
    createdAt: new Date(),
  },
});

const initialState: Partial<App.SessionInitialState> = JSON.parse(
  Cookies.get("state") ?? defaultState
);

console.log({ initialState });

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
      Cookies.set("state", JSON.stringify(state));
    },

    Mode: (state, actions: PayloadAction<App.SessionInitialState["mode"]>) => {
      state.mode = actions.payload;
      Cookies.set("state", JSON.stringify(state));
    },

    LogOut: (state) => {
      state.user = undefined;
      state.token = undefined;
      Cookies.remove("state");
    },
  },
});

export const { Login, LogOut, Mode } = sessionSlice.actions;
