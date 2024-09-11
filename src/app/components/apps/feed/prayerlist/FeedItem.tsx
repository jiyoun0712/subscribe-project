import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import IconFavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconFavorite from '@mui/icons-material/Favorite';


import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconCircle, IconFavicon, IconMessage2, IconShare, IconThumbUp } from '@tabler/icons-react';
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

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: post?.data && post?.data.likes && post?.data.likes.like
    ? {
      rotate: [-30, 0, 360],
      scale: [1, 1, 0.5, 1],
      transition: { duration:0.1, ease: 'easeInOut', type: 'spring', stiffness: 300, damping: 20, } 
    } : {
      rotate: 360, scale: 1, transition: { duration: 0.8, ease: "easeInOut" }
    },
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

      {/* Post Like Comment Share Buttons */}
      <Box>
        <Stack direction="row" gap={1} alignItems="center">

          {/* 1번째 아이콘 */}
          <Tooltip title="Like" placement="top">
            <Fab
                size="small"
                color={
                  post?.data && post?.data.likes && post?.data.likes.like ? 'primary' : 'inherit'
                }
                onClick={() => handleLike(post?.id)}
              >
              <IconThumbUp size="16" />
            </Fab>
          </Tooltip>
          <Typography variant="body1" fontWeight={600}>
            {post?.data && post?.data.likes && post?.data.likes.value}
          </Typography>


          {/* 2번째 아이콘 */}
          {/*
          <IconButton
            aria-label="like"
            color={
              post?.data && post?.data.likes && post?.data.likes.like ? 'error' : 'inherit'
            }
            onClick={() => handleLike(post?.id)}>
              <IconFavoriteBorder />
          </IconButton>
          <Typography variant="body1" fontWeight={600}>
            {post?.data && post?.data.likes && post?.data.likes.value}
          </Typography>
          */}

          {/* 3번째 아이콘 */}
          <motion.div 
            animate={post?.data && post?.data.likes && post?.data.likes.like ? { scale: [ 1.5, 1 ]} : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <IconButton 
              aria-label="like"
              color={
                post?.data && post?.data.likes && post?.data.likes.like ? 'error' : 'inherit'
              }
              onClick={() => handleLike(post?.id)}>
              <IconFavoriteBorder />
            </IconButton>
          </motion.div>
          <Typography variant="body1" fontWeight={600}>
            {post?.data && post?.data.likes && post?.data.likes.value}
          </Typography>


          {/* 4번째 아이콘 */}
          <motion.div 
            animate={ post?.data && post?.data.likes && post?.data.likes.like ? { rotate: 360 } : {}}
            transition={ post?.data && post?.data.likes && post?.data.likes.like ? { type: 'spring', bounce: 0.3, stiffness: 300, damping: 10 } : { rotate: 360, scale: 1, transition: { duration: 0.3, ease: "easeOut" }}}
          >
            <IconButton 
              aria-label="like"
              color={
                post?.data && post?.data.likes && post?.data.likes.like ? 'error' : 'inherit'
              }
              onClick={() => handleLike(post?.id)}>
                { post?.data && post?.data.likes && post?.data.likes.like ? (
                  <IconFavoriteBorder />
                ):(
                  <IconFavoriteBorder />
                )}
              
            </IconButton>
          </motion.div>
          <Typography variant="body1" fontWeight={600}>
            {post?.data && post?.data.likes && post?.data.likes.value}
          </Typography>


          {/* 5번째 아이콘 */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={iconVariants}
          >
            <IconButton 
              aria-label="like"
              onClick={() => handleLike(post?.id)}>
                { post?.data && post?.data.likes && post?.data.likes.like ? (
                  <IconFavorite sx={{ color: '#ff0000' }} />
                ):(
                  <IconFavoriteBorder />
                )}
            </IconButton>
          </motion.div>
          <Typography variant="body1" fontWeight={600}>
            {post?.data && post?.data.likes && post?.data.likes.value}
          </Typography>



        </Stack>
      </Box>
      


      <Box>
        <Stack direction="row" gap={1} alignItems="right" justifyContent="end">
          <DetailDialog id={post.id} />
        </Stack>
      </Box>


    </Box>
  </BlankCard>
  );
};


export default PostItem;
