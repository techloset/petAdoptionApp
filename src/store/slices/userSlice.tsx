import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserData, UserState} from '../../types/Types';
import firestore from '@react-native-firebase/firestore';
import {AppDispatch} from '../store';

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserDataStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUserDataSuccess: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchUserDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserData: state => {
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  clearUserData,
} = userSlice.actions;

export const getUserData =(userId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchUserDataStart());
    try {
      const docRef = firestore().collection('users').doc(userId);
      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        const userData = docSnapshot.data() as UserData;
        dispatch(fetchUserDataSuccess(userData));
      } else {
        dispatch(fetchUserDataFailure('User data not found in Firestore'));
      }
    } catch (error) {
      dispatch(fetchUserDataFailure('Error fetching user data from Firestore'));
    }
  };

export default userSlice.reducer;
