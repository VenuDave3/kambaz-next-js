/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: modules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // Logic from 4.4.3.1 (Add)
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(), 
        lessons: [],
        
        // 🛑 FIX 1: Access properties using 'module' (the destructured payload name)
        name: module.name, 
        course: module.course, 
      };
      
      // 🛑 FIX 2: Use the reliable push method for Redux Toolkit/Immer
      state.modules.push(newModule); 
    },
    
    // ... (rest of the reducer is unchanged and correct) ...
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

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;