import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit';


const PRAY_API_URL = 'https://prayapi-dev.godpeople.com'; // 새로운 API URL


interface StateType {
  post: any[];
  postContent: number;
  postSearch: string;
  
}
// 초기 상태 정의
const initialState: StateType = {
  post: [],
  postContent: 1,
  postSearch: '',
  
};

export const PostSlice = createSlice({
  name: 'postdata',
  initialState,
  reducers: {
    SearchPost: (state, action) => {
        state.postSearch = action.payload;
      },
    getPosts: (state, action) => {
      state.post = action.payload;
    },
    SelectPost: (state: StateType, action) => {
      console.log(action.payload)
      state.postContent = action.payload;
    },
    // 삭제 성공 시 상태에서 해당 게시물 제거
    deletePostSuccess: (state: StateType, action: PayloadAction<number>) => {
      state.post = state.post.filter((post) => post.p_no !== action.payload);
    },

    addPostSuccess: {
      reducer: (state: StateType, action: PayloadAction<any>) => {
       // state.post.push(action.payload);
        state.post.unshift(action.payload); // 새로운 게시물을 배열의 맨 앞에 추가
      },
      prepare: (newPost) => {
        return { payload: newPost };
      },
    },
    updatePostSuccess: {
      reducer: (state: StateType, action: PayloadAction<any>) => {
        state.post = state.post.map((post) =>
          post.p_no === action.payload.p_no
            ? { ...post, 'contents': action.payload.value, 'color': action.payload.scolor }
            : post,
        );
      },
      prepare: (p_no, value, scolor) => {
        return {
          payload: { p_no, value, scolor },
        };
      },
    }
  },
});


export const { 
  SearchPost, 
  getPosts, 
  SelectPost,
  updatePostSuccess,
  addPostSuccess, 
  deletePostSuccess  } =
PostSlice.actions;



// 새로운 API 연동 함수 추가
export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, { task: 'getPrayPostsList', kind: 'mine', limit: 20 }); // POST 요청
    dispatch(getPosts(response.data.result.list)); // 상태에 메시지 저장
  } catch (err: any) {
    console.error('Error fetching welcome message:', err);
    throw err;
  }
};  

export const UpdatePost = (p_no: number, contents: string, color: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, {
      task: 'updatePrayPostsJson',
      p_no: p_no,
      contents: contents,
      color: color,
    });

    if (response.data.success) {
      dispatch(updatePostSuccess(p_no, contents, color)); // 상태 업데이트
    } else {
      console.error('Failed to update post:', response.data.message);
    }
  } catch (err: any) {
    console.error('Error updating post:', err);
    throw err;
  }
};


export const addPost = (contents: string, color: string) => async (dispatch: AppDispatch) => {
  try {

    // 실제 API 호출
    const response = await axios.post(`${PRAY_API_URL}`, {
      task: 'createPrayPostsJson',
      contents: contents,
      color: color,      
    });

    // 성공적으로 등록되었을 때 상태 업데이트
    if (response.data.success) {
      const newPost = response.data.result;
      dispatch(addPostSuccess(newPost)); // 상태에 등록된 게시물 추가
     // dispatch(fetchPosts()); // 등록 후 리스트 갱신
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
