import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconCircle, IconMessage2, IconShare, IconThumbUp } from '@tabler/icons-react';
import uniqueId from 'lodash/uniqueId';
import Link from "next/link";
import { useDispatch, useSelector } from'@/store/hooks';
import { likePosts, addComment } from '@/store/apps/feed/FeedSlice';
//import PostComments from './PostComments';
import BlankCard from '../../../shared/BlankCard';
import DetailDialog from './DetailDialog';

import { Comment as CommentType, PostType } from '../../../../(DashboardLayout)/types/apps/feed';

interface Props {
  post: PostType;
}

const PostItem = ({ post }: Props) => {
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);
  const handleLike = async (postId: number) => {
    dispatch(likePosts(postId));
  };
  const [comText, setComText] = useState<any>('');

  const onSubmit = async (id: number, comment: CommentType) => {
    const commentId = uniqueId('#COMMENT_');
    const newComment: any = {
      id: commentId,
      profile: {
        id: uniqueId('#COMMENT_'),
        avatar: post?.profile.avatar,
        name: post?.profile.name,
        time: 'now',
      },
      data: {
        comment: comment,
        likes: {
          like: false,
          value: 0,
        },
        replies: [],
      },
    };

    dispatch(addComment(id, newComment));
    setComText('');
  };

  return (
    <BlankCard>
    <Box p={3}>
      
      <Stack direction={'row'} gap={2} alignItems="center">
        <Avatar alt="Remy Sharp" src={post?.profile.avatar} />
        <Typography variant="h6">{post?.profile.name}</Typography>
        <Typography variant="caption" color="textSecondary">
          <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
          {post?.profile.time}
        </Typography>
      </Stack>
      
      
      {/**Post Content**/}
      <Box py={2}>{post?.data.summary}</Box>


      {/** Type A :: 개인 **/}
      {post.type === 'A' && (post.data.images.length > 0) ? (
        <Box>
          <Grid container spacing={3} mb={2}>
            {post?.data.images.map((photo) => {
              return (
                <Grid item sm={12} lg={photo.featured ? 12 : 6} key={photo.img}>
                  <Typography
                      component={Link}
                      href={`/apps/feed/detail/${post.id}`}
                    >
                    <CardMedia
                      component="img"
                      sx={{ borderRadius: customizer.borderRadius / 4, height: 360 }}
                      image={photo.img}
                      alt="cover"
                      width={'100%'}
                    />
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        ''
      )}

      {/** Type B :: 교회 **/}
      {post.type === 'B' && (post.data.images.length > 0)? (
        <Box>
          <Grid container spacing={3} mb={2}>
            {post?.data.images.map((photo) => {
              return (
                <Grid item sm={12} lg={photo.featured ? 12 : 6} key={photo.img}>
                  <Typography
                      component={Link}
                      href={`/apps/feed/detail/${post.id}`}
                    >
                  <CardMedia
                    component="img"
                    sx={{ borderRadius: customizer.borderRadius / 4, height: 360 }}
                    image={photo.img}
                    alt="cover"
                    width={'100%'}
                  />
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
        ''
      )}

      {/** Type C :: 광고 **/}
      {post.type === 'C' && (post?.data.video) ? (

     
        <CardMedia
          sx={{
            borderRadius: customizer.borderRadius / 4,
            height: 300,
            mb: 2,
          }}
          component="iframe"
          src={`https://www.youtube.com/embed/${post?.data.video}`}
        />
      ) : (
        ''
      )}
     

   {/*}
    <Stack direction={'row'} gap={2} alignItems="center" justifyContent="flex-end">
        <Button size="small">더보기</Button>
    </Stack>
    */}
      <DetailDialog id={post.id} />

    </Box>
  </BlankCard>
  );
};


export default PostItem;
