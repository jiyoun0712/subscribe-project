import React,{ useEffect, useState, useRef } from 'react';
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

    onSwipeLeft: (slideId: number, deltaX: number) => void; // 추가된 prop
}


// 개행 문자를 <br />로 변환하는 함수
const convertNewlineToBreak = (text: string) => {
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };

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
   
    overflowX: 'hidden',
    minHeight: 0,
    overflowY: 'hidden',
    lineHeight: 1.45,
    alignSelf: 'auto',
    justifyContent: 'flex-start',
    flexGrow: 1,
    transition: 'max-height 0.5s ease', // 슬라이드 애니메이션
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

const ReelsImage = ({ post, onSwipeLeft }: Props) => {
    
    const contentsRef = useRef<HTMLDivElement>(null); // 콘텐츠 영역에 대한 ref
    const containerRef = useRef<HTMLDivElement>(null); // 외부 영역 감지 ref

    // 슬라이드가 확장 상태인지 확인
    const [isExpanded, setIsExpanded] = useState(false); // 슬라이드 확장 상태

      // 외부 클릭 시 확장 상태 해제
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // 클릭된 요소가 contentsRef 내부가 아닌 경우에만 동작
      if (contentsRef.current && !contentsRef.current.contains(event.target as Node)) {
        console.log('Clicked outside the Contents area');
        setIsExpanded(false); // 외부 클릭 시 슬라이드 축소
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };


  
  }, [isExpanded]);

    // 축소될 때 스크롤 위치를 0으로 복구
    useEffect(() => {
        if (!isExpanded && contentsRef.current) {
            contentsRef.current.scrollTop = 0; // 스크롤을 상단으로 초기화
            }
        }, [isExpanded]);

  
  // 내부 클릭 시 확장
  const handleMoreClick = () => {
    setIsExpanded(true);
  };

   // 내부 클릭 시 이벤트 전파 차단
   const handleInsideClick = (event: React.MouseEvent) => {
    console.log('Clicked inside the Contents area');
   
    event.stopPropagation(); // 내부 클릭 시 외부 클릭 이벤트를 차단
  };

  return (
    <Grid container
    style={{
        width: '100%',  // Box의 최대 너비를 설정
        height: '100%',
      }} 
      ref={containerRef}>
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
                    
                    <div 
                    
                    style={{
                        zIndex:1,
                        position:'absolute',
                        display:'flex',
                        top:'0',
                        bottom:'0',
                        right:'0',
                        alignItems:'end',
                        padding:'20px 12px 20px 16px',
                      }}>
                        <Contents
                        
                        ref={contentsRef}
                        onClick={handleInsideClick} // 내부 클릭 시 이벤트 전파 차단
                        style={{
                        maxHeight: isExpanded ? '70vh' : '112px', // 클릭 시 확장/축소
                        overflowY: isExpanded ? 'scroll' : 'hidden', // 스크롤 처리
                        }}
                       
                        >
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
                                    textAlign:'left',
                                    maxHeight: isExpanded ? 'none' : '74px', // 확장 시 제한 없음
                                }}>
                                {convertNewlineToBreak(post.name)}</span>
                                 {(!isExpanded) &&
                                    <span style={{

                                    
                                        fontSize:'14px',
                                        color:'#fff',
                                        fontWeight:400,
                                        flexShrink:0,
                                        alignSelf:'center',
                                    }}
                                    onClick={handleMoreClick}
                                    >...더보기</span>
                                }
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
