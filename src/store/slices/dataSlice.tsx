// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';
// import { AppDispatch } from '../store';


// interface UserData {

// }

// interface UserState {
//   allData: UserData[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   allData: [],
//   loading: false,
//   error: null,
// };

// const dataSlice = createSlice({
//   name: 'data',
//   initialState,
//   reducers: {
//     fetchDataStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchDataSuccess: (state, action: PayloadAction<UserData[]>) => {
//       state.allData = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     fetchDataFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

// export const fetchData = (collectionName:any) => async (dispatch: AppDispatch) => {
//   dispatch(fetchDataStart());
//   try {
//     const querySnapshot = await firestore().collection(collectionName).get();
//     const allData: UserData[] = [];

//     querySnapshot.forEach((doc) => {
//       const userData = doc.data() as UserData;
//       allData.push(userData);
//     });

//     dispatch(fetchDataSuccess(allData));
//   } catch (error) {
//     dispatch(fetchDataFailure('Error fetching data from Firestore'));
//   }
// };

// export default dataSlice.reducer;








import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { AppDispatch } from '../store';

interface UserData {
  // Define your user data interface properties here
}

interface UserState {
  allData: UserData[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  allData: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<UserData[]>) => {
      state.allData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeDataSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    removeDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  removeDataStart,
  removeDataSuccess,
  removeDataFailure,
} = dataSlice.actions;

export const fetchData = (collectionName: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchDataStart());
  try {
    const querySnapshot = await firestore().collection(collectionName).get();
    const allData: UserData[] = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data() as UserData;
      allData.push(userData);
    });

    dispatch(fetchDataSuccess(allData));
  } catch (error) {
    dispatch(fetchDataFailure('Error fetching data from Firestore'));
  }
};

export const removeData = (collectionName: string, itemId: string) => async (dispatch: AppDispatch) => {
  dispatch(removeDataStart());
  try {
    await firestore().collection(collectionName).doc(itemId).delete();
    dispatch(removeDataSuccess());
  } catch (error) {
    dispatch(removeDataFailure('Error removing data from Firestore'));
  }
};

export default dataSlice.reducer;
