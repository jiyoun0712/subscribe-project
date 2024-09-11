import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
//import type { PayloadAction } from '@reduxjs/toolkit';

const API_URL = '/api/data/gallery/GalleryData';


interface StateType {
  gallery: any[],
  gallerySearch: string;
}


// 초기 상태 정의
const initialState: StateType = {
  gallery: [],
  gallerySearch: '',
};

export const GallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    SearchGallery: (state, action) => {
        state.gallerySearch = action.payload;
      },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
  },
});


export const { SearchGallery, getPhotos } =
GallerySlice.actions;


export const fetchPhotos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPhotos(response.data));
  } catch (err: any) {
    //throw new Error(err);
    console.error('Error fetching photos:', err); // 에러를 콘솔에 출력
    throw err;
  }
};

  

export default GallerySlice.reducer;
