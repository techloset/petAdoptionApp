
// import { createSlice } from '@reduxjs/toolkit';


// const initialState = {
//   credentialUserId: null,
// };

// const credentialSlice = createSlice({
//   name: 'credential',
//   initialState,
//   reducers: {
//     setCredentialUserId(state, action) {
//       state.credentialUserId = action.payload;
//     },
//   },
// });

// export const { setCredentialUserId } = credentialSlice.actions;

// export default credentialSlice.reducer;







import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentialUserId: null,
};

const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    setCredentialUserId(state, action) {
      state.credentialUserId = action.payload;
    },
    clearCredentialUserId(state) {
      state.credentialUserId = null;
    },
  },
});

export const { setCredentialUserId, clearCredentialUserId } = credentialSlice.actions;

export default credentialSlice.reducer;
