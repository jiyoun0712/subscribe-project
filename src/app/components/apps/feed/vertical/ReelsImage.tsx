import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import { Box, Grid, Avatar } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

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
    position:'static',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxHeight: '112px',
    overflowX: 'hidden',
    minHeight: 0,
    overflowY: 'hidden',
    lineHeight: 1.45,
    alignSelf: 'auto',
    justifyContent: 'flex-start',
    flexGrow: 1,
}))  
const Buttons = styled('div')(({ theme }) => ({
    position:'static',
    display: 'flex',
    marginBottom: '4px',
    alignContent: 'stretch',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    boxSizing: 'border-box',
    alignItems: 'center',
}))  

const ReelsImage = ({ post }: Props) => {
  return (
    <Grid container
    style={{
        width: '100%',  // Box의 최대 너비를 설정
        height: '100%',
      }}>
        <Grid item sm={12} lg={12}
        style={{
            width: '100%',  // Box의 최대 너비를 설정
            height: '100%',
          }}>
            <Box
            style={{
                width: '100%',  // Box의 최대 너비를 설정
                height: '100%',
              }}>
                <Image src={post.cover} />
                <div style={{
                        width:'100%',
                        height:'100%',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        top: '0',

                        backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.35) 100%)',
                      }}>
                    
                    <div style={{
                        position:'absolute',
                        display:'flex',
                        top:'0',
                        bottom:'0',
                        right:'0',
                        alignItems:'end',
                        padding:'20px 12px 20px 16px',
                      }}>
                        <Contents>
                            <div style={{
                                display:'flex',
                                alignItems:'center',
                                }}>
                                <span style={{
                                whiteSpace: 'nowrap',
                                overflowX: 'hidden',
                                overflowY: 'hidden',                                
                                }}>
                                <Avatar
                                    src={"/images/profile/user-1.jpg"}
                                    alt={'ProfileImg'}
                                    sx={{
                                        width: 35,
                                        height: 35,
                                    }}
                                    />
                                </span>
                                <span style={{
                                    fontSize:'14px',
                                    color:'#fff',
                                    fontWeight:400,
                                    marginLeft:10,
                                }}>{'베드로'}</span>
                            </div>
                            <div style={{
                                    marginRight:10,
                                    display:'flex',
                                }}>
                                <span style={{
                                    fontSize:'16px',
                                    color:'#fff',
                                    fontWeight:400,
                                    maxHeight: 42,
                                }}>
                                {post.name}</span>
                                <span style={{
                                    fontSize:'14px',
                                    color:'#fff',
                                    fontWeight:400,
                                    flexShrink:0,
                                }}>...더보기</span>
                            </div>
                        </Contents>
                        <Buttons>
                            <div style={{
                                    display:'flex',
                                    marginBottom:'30px',
                                }}>
                            <FavoriteBorderOutlinedIcon className="reels-btn-like" />
                            </div>
                            <div style={{
                                    display:'flex',
                                    marginBottom:'30px',
                                }}>
                            <CommentOutlinedIcon className="reels-btn-comment" />
                            </div>
                            <div style={{
                                    display:'flex',
                                    marginBottom:'30px',
                                }}>
                            <ShareOutlinedIcon className="reels-btn-share" />
                            </div>
                            <div style={{
                                    display:'flex',
                                    
                                }}>
                            <MoreHorizOutlinedIcon className="reels-btn-more" />
                            </div>
                        </Buttons>
                    </div>
                </div>
            </Box>
        </Grid>
    </Grid>
  );
};

export default ReelsImage;
