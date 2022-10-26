import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrStudent: [],
  user: {
    maSV: "",
    hoTen: "",
    email: "",
    soDienThoai: "",
  },
};

const userStudent = createSlice({
  name: "userStudent",
  initialState,
  reducers: {
    addNewStudent: (state, action) => {
      let user = action.payload;
      state.arrStudent.push(user);
    },
    deleteStudent: (state, action) => {
      let maSV = action.payload;
      state.arrStudent = state.arrStudent.filter((user) => {
        return user.maSV !== maSV;
      });
    },
    editStudent: (state, action) => {
      console.log(action.payload);
      const foundIdx = state.arrStudent.findIndex(
        (student) => student.maSV === action.payload.maSV
      );
      if (foundIdx !== -1) {
        console.log(foundIdx);
        state.arrStudent.splice(foundIdx, 1);
        state.arrStudent.push(action.payload);
      }
    },
    currentUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  addNewStudent,
  deleteStudent,
  editStudent,
  currentUser,
  searchStudent,
} = userStudent.actions;

export default userStudent.reducer;
