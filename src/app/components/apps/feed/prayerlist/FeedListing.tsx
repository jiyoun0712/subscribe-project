import Grid from '@mui/material/Grid'
import { useEffect } from 'react';
import { useSelector, useDispatch } from'@/store/hooks';
import { fetchPosts } from '@/store/apps/feed/FeedSlice';
import FeedItem from './FeedItem';
//import { PostTextBox } from './PostTextBox';
import { PostType } from '../../../../(DashboardLayout)/types/apps/feed';

const Post = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const getPosts: PostType[] = useSelector((state) => state.feedReducer.posts);

  return (
    <Grid container spacing={3}>
      {/*
      <Grid item sm={12}>
        <PostTextBox />
      </Grid>
      */}
      {getPosts.map((posts) => {
        return (
          <Grid item sm={12} key={posts.id}>
            <FeedItem post={posts} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Post;
