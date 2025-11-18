/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
// No longer import from Database!
// import { assignments } from "../../../Database"; 
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [], // Start with an empty array
  assignment: { title: "New Assignment", points: 100, description: "New Description" },
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // New: Sets the assignments list from the server
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    // Updated: Now just adds the server-created assignment
    addAssignment: (state, { payload: assignment }) => {
      state.assignments = [...state.assignments, assignment] as any;
    },
    // Unchanged, but now acts on the Redux cache
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    // Unchanged, but now acts on the Redux cache
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    // Unchanged
    setAssignment: (state, { payload: assignment }) => {
      state.assignment = assignment;
    },
  },
});

export const { 
  setAssignments, // Export the new action
  addAssignment, 
  deleteAssignment, 
  updateAssignment, 
  setAssignment 
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;