import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import { Box, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentIcon from '@mui/icons-material/Comment';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { useSelector, useDispatch } from'@/store/hooks';
import { fetchPosts } from '@/store/apps/feed/FeedSlice';

//import { PostTextBox } from './PostTextBox';
import { GalleryType } from '../../../../(DashboardLayout)/types/apps/gallery';

interface Props {
    post: GalleryType;
}

const Image = styled('img')(({ theme}) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}))

const Contents = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: '1rem',
    top: '70%',
    padding: '0 3rem 1rem 1rem',
    lineHeight: 1.5,
}))  

const ReelsImage = ({ post }: Props) => {
  return (
    <Grid container>
        <Grid item sm={12} lg={12}>
            <Box>
                <Image src={post.cover} />
                <Contents>
                    <h3>{post.id}</h3>
                    <p>{post.name}</p>
                </Contents>
                <FavoriteIcon className="reels-btn-like" />
                <CommentIcon className="reels-btn-comment" />
                <ShareIcon className="reels-btn-share" />
                <MoreHorizIcon className="reels-btn-more" />
            </Box>
        </Grid>
    </Grid>
  );
};

export default ReelsImage;
