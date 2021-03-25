import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AppThunk, RootState} from '../redux/store';
import {User} from "../types/User";
import authService from '../archive/services/auth-service';

interface AuthState {
    isLoading: boolean;
    user: any;
}

const initialState: AuthState = {
    isLoading:false,
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest: state => {
            state.isLoading = true;
        },
        authRequestSuccess: state => {
            state.isLoading = false;
        },
        authRequestError: state => {

        }
    }
});

export const {authRequest, authRequestSuccess, authRequestError} = authSlice.actions;

export const authRequestAsync = (user: User): AppThunk => async dispatch => {
    dispatch(authRequest());

    console.log('cigan');
    await authService.registerUser(user);
    console.log('BAJRAM');
    dispatch(authRequestSuccess());
};

export default authSlice.reducer;
