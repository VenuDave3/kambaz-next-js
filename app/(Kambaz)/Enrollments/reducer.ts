/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Array to hold all enrollment records fetched from the server
  enrollments: [], 
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Action 1: Replaces the entire enrollment state (used when fetching from server)
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    
    // Action 2: Adds a new enrollment record (used after successful API POST)
    enrollUserInCourse: (state, action) => {
      // payload contains { user: userId, course: courseId }
      const { user, course } = action.payload;
      
      // Create a simplified new enrollment object for immediate UI update
      const newEnrollmentRecord = {
        // Using Date.now() for a unique key is acceptable for client-side state changes
        _id: new Date().getTime().toString(), 
        user: user,
        course: course,
      };
      
      state.enrollments = [...state.enrollments, newEnrollmentRecord] as any;
    },
    
    // Action 3: Removes an enrollment record (used after successful API DELETE)
    unenrollUserFromCourse: (state, action) => {
      // payload contains { user: userId, course: courseId }
      const { user, course } = action.payload;
      
      // Filter out the record that matches both the user and the course ID
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === user && enrollment.course === course)
      );
    },
  },
});

export const { setEnrollments, enrollUserInCourse, unenrollUserFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;