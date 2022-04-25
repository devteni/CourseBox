import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from './courseService';


const initialState = {
    courses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};


type lecturer = {
    id: number
    firstName: string
    lastName: string
    email: string
    uniqueNumber: string
    password: string
    department: string
    school: string
    role: string
    access_token: string
    createdAt: string
    modifiedAt: string
}

export const fetchLecturerCourses = createAsyncThunk('/courses/lecturer', 
    async (user, thunkAPI) => {
        try {
            return await courseService.fetchLecturerCourses(user.id, user.access_token);;
        } catch(error: any) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchCourses = createAsyncThunk('/courses/student', 
    async (user, thunkAPI) => {
        try {
            return await courseService.fetchCourses(user.departmentId, user.access_token);;
        } catch(error: any) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
            state.isSuccess = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLecturerCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLecturerCourses.fulfilled, (state, action: { payload: any }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = action.payload;
            })
            .addCase(fetchLecturerCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.courses = [];
                state.message = JSON.stringify(action.payload);
            })
            .addCase(fetchCourses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCourses.fulfilled, (state, action: { payload: any }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.courses = [];
                state.message = JSON.stringify(action.payload);
            })
    }
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;