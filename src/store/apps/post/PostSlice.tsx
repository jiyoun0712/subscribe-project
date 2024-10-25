import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';
import type { PayloadAction } from '@reduxjs/toolkit';


const PRAY_API_URL = 'https://prayapi-dev.godpeople.com'; // 새로운 API URL


interface StateType {
  post: any[];
  postContent: number;
  postSearch: string;
  comment: any[];
  
}
// 초기 상태 정의
const initialState: StateType = {
  post: [],
  postContent: 1,
  postSearch: '',
  comment: [],
};

export const PostSlice = createSlice({
  name: 'postdata',
  initialState,
  reducers: {
    SearchPost: (state, action) => {
      state.postSearch = action.payload;
    },
    getComments: (state, action) => {
      state.comment = action.payload;
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
    },
    likePostSuccess: (state, action) => {
      
      const { p_no, isLiked } = action.payload;
      state.post = state.post.map((post) =>
        post.p_no === p_no
          ? {
              ...post,
              likes: {
                ...post.likes,
                like: isLiked,
                value: post.likes.value + (isLiked ? 1 : -1),
              },
            }
          : post
      );
    },

    addCommentPostSuccess: {
      reducer: (state: StateType, action: PayloadAction<any>) => {
        //state.comment.push(action.payload);
        state.comment.unshift(action.payload); // 새로운 게시물을 배열의 맨 앞에 추가

        const { p_no, contents, r_date } = action.payload;
        state.post = state.post.map((post) =>
          post.p_no === p_no
            ? {
                ...post,
                comments:  post.comments + (post.comments===0 ? 1 : +1),
              }
            : post
        );


      },
      prepare: (newPost) => {
        return { payload:  newPost };
      },
    },
    
  },
});


export const { 
  SearchPost, 
  getPosts, 
  getComments,
  SelectPost,
  updatePostSuccess,
  addPostSuccess, 
  deletePostSuccess,
  addCommentPostSuccess,
  likePostSuccess,   } =
PostSlice.actions;



// 새로운 API 연동 함수 추가
export const fetchComments = (p_no: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, { 
      task: 'getCommentList', 
      p_no: p_no,
      limit: 20, 
    },
    { withCredentials: true }); // POST 요청
    dispatch(getComments(response.data.result)); // 상태에 메시지 저장
  } catch (err: any) {
    console.error('Error fetching welcome message:', err);
    throw err;
  }
};  

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`${PRAY_API_URL}`, { 
      task: 'getPrayPostsList', 
      kind: 'mine', 
      limit: 20 
    },
    { withCredentials: true }); // POST 요청
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
    },
    { withCredentials: true });

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
    },
    { withCredentials: true });

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
    },
    { withCredentials: true });

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

export const addComment = (p_no: number, contents: any) => async (dispatch: AppDispatch) => {
    
    try {

      // 실제 API 호출
      const response = await axios.post(`${PRAY_API_URL}`, {
        task: 'createCommentJson',
        p_no: p_no,      
        contents: contents,
      },
      { withCredentials: true });
  
      // 성공적으로 등록되었을 때 상태 업데이트
      if (response.data.success) {
        const newPost = response.data.result;
        dispatch(addCommentPostSuccess( {p_no, contents} )); // 상태에 등록된 게시물 추가
       // dispatch(getComments(response.data.posts));
      } else {
        console.error('Failed to add post:', response.data.message);
      }
    } catch (err: any) {
      console.error('Error adding post:', err);
      throw err;
    }
  };


  export const actionLike = (p_no: number, isLiked: boolean, kind: string) => async (dispatch: AppDispatch) => {
    try {
  
      // 실제 API 호출
      const response = await axios.post(`${PRAY_API_URL}`, {
        task: 'actionLikeJson',
        no: p_no,
        kind: kind, //post or comment      
      },
      { withCredentials: true });
  
      // 성공적으로 등록되었을 때 상태 업데이트
      if (response.data.success) {
        //const newPost = response.data.result;

        dispatch(likePostSuccess({ p_no, isLiked })); // 상태 업데이트

       // dispatch(actionLike(newPost)); // 상태에 등록된 게시물 추가
       // dispatch(fetchPosts()); // 등록 후 리스트 갱신
      } else {
        console.error('Failed to add post:', response.data.message);
      }
    } catch (err: any) {
      console.error('Error adding post:', err);
      throw err;
    }
  };


export default PostSlice.reducer;
