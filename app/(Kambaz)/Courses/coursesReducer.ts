/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // ✅ UPDATED: Payload is expected to be an object: { newCourseData, userId }
    addNewCourse: (state, { payload }) => {
      const newCourse = { 
        ...payload.newCourseData, 
        _id: uuidv4(),
        // 🛑 NEW: Store the ID of the user who created the course
        user: payload.userId, 
      };
      
      // Using .push() is the idiomatic way to mutate state safely in Redux Toolkit
      state.courses.push(newCourse);
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;