import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
//import type { PayloadAction } from '@reduxjs/toolkit';

const API_URL = '/api/data/gallery/GalleryData';
const PRAY_API_URL = 'https://prayapi-dev.godpeople.com'; // 새로운 API URL

interface StateType {
  gallery: any[],
  gallerySearch: string;
  welcomeMessage: any[]; // 새로운 상태 추가
}


// 초기 상태 정의
const initialState: StateType = {
  gallery: [],
  gallerySearch: '',
  welcomeMessage: [], // 초기값 설정
};

export const GallerySlice = createSlice({
  name: 'gallerydata',
  initialState,
  reducers: {
    SearchGallery: (state, action) => {
        state.gallerySearch = action.payload;
      },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
    getWelcomeMessage: (state, action) => {
      state.welcomeMessage = action.payload; // 새로운 상태 업데이트
    },
  },
});


export const { SearchGallery, getPhotos, getWelcomeMessage } =
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

// 새로운 API 연동 함수 추가
export const fetchWelcomeMessage = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, { task: 'getWelcome' }); // POST 요청
    dispatch(getWelcomeMessage(response.data.result)); // 상태에 메시지 저장
  } catch (err: any) {
    console.error('Error fetching welcome message:', err);
    throw err;
  }
};  

export default GallerySlice.reducer;
