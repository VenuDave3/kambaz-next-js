/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
// import { modules } from "../../../Database"; // 1. REMOVE THIS (from 5.3.5.1)
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: [], // 2. CHANGE THIS to an empty array (from 5.3.5.1)
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // 3. ADD THIS new function (from 5.3.5.1)
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    // All your old reducers from Chapter 4 stay the same
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId
      );
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

// 4. ADD "setModules" to the export list
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;