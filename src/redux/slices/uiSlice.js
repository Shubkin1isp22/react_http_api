import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state) => {
      state.ModalOpen = true;
    },
    closeModal: (state) => {
      state.ModalOpen = false;
    },
    toggleModal: (state) => {
      state.ModalOpen = !state.ModalOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = uiSlice.actions;

export default uiSlice.reducer;