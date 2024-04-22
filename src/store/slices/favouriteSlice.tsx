// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';
// import { AppDispatch } from '../store';

// // Define types directly within the favoriteSlice file
// interface FavoriteData {
//   // Define the structure of your FavoriteData type here
// }

// interface FavoriteState {
//   favorites: FavoriteData[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: FavoriteState = {
//   favorites: [],
//   loading: false,
//   error: null,
// };

// const favoriteSlice = createSlice({
//   name: 'favorites',
//   initialState,
//   reducers: {
//     fetchFavoritesStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchFavoritesSuccess: (state, action: PayloadAction<FavoriteData[]>) => {
//       state.favorites = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     fetchFavoritesFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchFavoritesStart, fetchFavoritesSuccess, fetchFavoritesFailure } = favoriteSlice.actions;

// export const fetchFavorites = (collectionName: string) => async (dispatch: AppDispatch) => {
//   dispatch(fetchFavoritesStart());
//   try {
//     const querySnapshot = await firestore().collection(collectionName).get();
//     const favorites: FavoriteData[] = [];

//     querySnapshot.forEach((doc) => {
//       const favoriteData = doc.data() as FavoriteData;
//       favorites.push(favoriteData);
//     });

//     dispatch(fetchFavoritesSuccess(favorites));
//   } catch (error) {
//     dispatch(fetchFavoritesFailure('Error fetching favorites from Firestore'));
//   }
// };

// export default favoriteSlice.reducer;







import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { AppDispatch } from '../store';

// Define types directly within the favoriteSlice file
interface FavoriteData {
  // Define the structure of your FavoriteData type here
}

interface FavoriteState {
  favorites: FavoriteData[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavoritesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess: (state, action: PayloadAction<FavoriteData[]>) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFavoritesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFavoriteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFavoriteSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
      // Remove the item from the favorites array
      const index = state.favorites.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
    removeFavoriteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  removeFavoriteStart,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} = favoriteSlice.actions;

export const fetchFavorites = (collectionName: string) => async (dispatch: AppDispatch) => {
  dispatch(fetchFavoritesStart());
  try {
    const querySnapshot = await firestore().collection(collectionName).get();
    const favorites: FavoriteData[] = [];

    querySnapshot.forEach((doc) => {
      const favoriteData = { ...doc.data(), id: doc.id } as FavoriteData; // Include document ID as 'id'
      favorites.push(favoriteData);
    });

    dispatch(fetchFavoritesSuccess(favorites));
  } catch (error) {
    dispatch(fetchFavoritesFailure('Error fetching favorites from Firestore'));
  }
};

export const removeFavorite = (collectionName: string, itemId: string) => async (dispatch: AppDispatch) => {
  dispatch(removeFavoriteStart());
  try {
    await firestore().collection(collectionName).doc(itemId).delete();
    dispatch(removeFavoriteSuccess(itemId));
  } catch (error) {
    dispatch(removeFavoriteFailure('Error removing favorite from Firestore'));
  }
};

export default favoriteSlice.reducer;
