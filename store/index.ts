import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';
import authReducer from '../slices/auth/auth';
import courseReducer from '../slices/course/course';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        course: courseReducer
    },
});
  
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
