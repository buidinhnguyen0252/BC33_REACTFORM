import { configureStore } from "@reduxjs/toolkit";
import UserStudent from "./userStudent/UserStudent";

export const store = configureStore({
  reducer: {
    userStudent: UserStudent,
  },
});
