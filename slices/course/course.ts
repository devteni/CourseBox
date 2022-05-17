import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from './courseService';

type course = {
    id: number,
    courseCode: string,
    courseName: string,
    userId: string,
    departmentId: string,
    schoolId: string,
    courseDesc: string,
    createdAt: string,
    modifiedAt: string,
}

interface IState {
    courses: course[],
    courseMaterials: [],
    isError: boolean, 
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const initialState: IState = {
    courses: [],
    courseMaterials: [],
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

type Lecturer = {
    id: string,
    access_token: string
}

export const fetchLecturerCourses = createAsyncThunk('/courses/lecturer', 
    async (user: Lecturer, thunkAPI) => {
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

type User = {
    departmentId: string,
    access_token: string,
}

export const fetchCourses = createAsyncThunk('/courses/student', 
    async (user: User, thunkAPI) => {
        try {
            return await courseService.fetchCourses(user.departmentId, user.access_token);
        } catch(error: any) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
);

type coursePayload = {
    courseId: string,
    access_token: string
}

export const fetchCourseMaterials = createAsyncThunk('/courses/materials', 
   async (payload: coursePayload, thunkAPI) => {
       try {
           return await courseService.fetchCourseMaterials(payload.courseId, payload.access_token);
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
        },
        setCourseMaterials: (state, action) => {
            state.courseMaterials = action.payload;
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
            .addCase(fetchCourseMaterials.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCourseMaterials.fulfilled, (state, action: { payload: any }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.courseMaterials = action.payload;
            })
            .addCase(fetchCourseMaterials.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.courseMaterials = [];
                state.message = JSON.stringify(action.payload);
            })
    }
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;