import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit';


const PRAY_API_URL = 'https://prayapi-dev.godpeople.com'; // 새로운 API URL


interface PostType {
  contents: string;
  color: string;
}


interface StateType {
  post: any[],
  gallerySearch: string;
  
}
// 초기 상태 정의
const initialState: StateType = {
  post: [],
  gallerySearch: '',
  
};

export const PostSlice = createSlice({
  name: 'postdata',
  initialState,
  reducers: {
    SearchGallery: (state, action) => {
        state.gallerySearch = action.payload;
      },
    getPosts: (state, action) => {
      state.post = action.payload;
    },
    addPostSuccess: (state: StateType, action: PayloadAction<PostType>) => {
      state.post.push(action.payload);
    
    },
    // 삭제 성공 시 상태에서 해당 게시물 제거
    deletePostSuccess: (state: StateType, action: PayloadAction<number>) => {
      state.post = state.post.filter((post) => post.p_no !== action.payload);
    },
  },
});


export const { SearchGallery, getPosts, addPostSuccess, deletePostSuccess  } =
PostSlice.actions;



// 새로운 API 연동 함수 추가
export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, { task: 'getPrayPostsList', limit: 20 }); // POST 요청
    dispatch(getPosts(response.data.result.list)); // 상태에 메시지 저장
  } catch (err: any) {
    console.error('Error fetching welcome message:', err);
    throw err;
  }
};  

export const addPost = (contents: string, color: string) => async (dispatch: AppDispatch) => {
  try {
    // const newPost = {
    //   p_no,
    //   content,
    //   color,
    //   datef: new Date().toDateString(),
    //   deleted: false,
    // };
    const newPost = {
      contents,
      color,
    };

    // 실제 API 호출
    const response = await axios.post(`${PRAY_API_URL}`, {
      task: 'createPrayPostsJson',
      contents: contents,
      color: color,      
    });

    // 성공적으로 등록되었을 때 상태 업데이트
    if (response.data.success) {
    
      dispatch(addPostSuccess(newPost)); // 상태에 등록된 게시물 추가
      dispatch(fetchPosts()); // 등록 후 리스트 갱신
    } else {
      console.error('Failed to add post:', response.data.message);
    }
  } catch (err: any) {
    console.error('Error adding post:', err);
    throw err;
  }
};

// 게시물 삭제 API 연동 함수
export const deletePost = (p_no: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, {
      task: 'deletePrayPostsJson',
      p_no: p_no, // 삭제할 게시물 번호 전달
    });

    if (response.data.success) {
      dispatch(deletePostSuccess(p_no)); // 상태에서 삭제된 게시물 제거
    } else {
      console.error('Failed to delete post:', response.data.message);
    }
  } catch (err: any) {
    console.error('Error deleting post:', err);
    throw err;
  }
};


export default PostSlice.reducer;
