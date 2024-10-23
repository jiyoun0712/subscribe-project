import React,{ useEffect, useState, useRef } from 'react';
import parse from 'html-react-parser';
import { Box, Grid, Avatar } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import styled from 'styled-components';
import 'swiper/css';
import './styles.css';

import { PostType } from '../../../../(DashboardLayout)/types/apps/post';
import CommentDialog from './Comment';

interface Props {
    post: PostType;
    onExpandChange: (expanded: boolean) => void; // 추가된 prop
}



const Image = styled('img')(({ theme }) => ({
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

const ReelsImage = ({ post, onExpandChange  }: Props) => {
    
    const contentsRef = useRef<HTMLDivElement>(null); // 콘텐츠 영역에 대한 ref
    const containerRef = useRef<HTMLDivElement>(null); // 외부 영역 감지 ref

    // 슬라이드가 확장 상태인지 확인
    const [isExpanded, setIsExpanded] = useState(false); // 슬라이드 확장 상태
    const [isOverflowing, setIsOverflowing] = useState(false);


    // 내부 클릭 시 확장
    const handleMoreClick = () => {
      setIsExpanded(true);
      onExpandChange(true); // 부모에게 확장 상태 전달
    };
    const handleMoreCloseClick = () => {
      setIsExpanded(false);
      onExpandChange(false); // 부모에게 확장 상태 전달
    };

    // 내부 클릭 시 이벤트 전파 차단
    const handleInsideClick = (event: React.MouseEvent) => {
      console.log('Clicked inside the Contents area');

      event.stopPropagation(); // 내부 클릭 시 외부 클릭 이벤트를 차단
    };


    // 외부 클릭 시 확장 상태 해제
    useEffect(() => {

      if(isExpanded){
          const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            // 클릭된 요소가 contentsRef 내부가 아닌 경우에만 동작
            if (contentsRef.current && !contentsRef.current.contains(event.target as Node)) {
              console.log('Clicked outside the Contents area');
              //setIsExpanded(false); // 외부 클릭 시 슬라이드 축소
              //onExpandChange(false); // 부모에게 축소 상태 전달
              handleMoreCloseClick();
            }
          };

          document.addEventListener('mousedown', handleClickOutside);
          document.addEventListener('touchstart', handleClickOutside);

          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
          };

        }
    }, [isExpanded]);

    // 축소될 때 스크롤 위치를 0으로 복구
    useEffect(() => {
        if (!isExpanded && contentsRef.current) {
            contentsRef.current.scrollTop = 0; // 스크롤을 상단으로 초기화
            }
    }, [isExpanded]);

    useEffect(() => {
      const checkOverflow = () => {
        const element = contentsRef.current;
        if (element) {
          // scrollHeight가 clientHeight보다 크면 내용이 넘치고, 스크롤이 필요함
          if (element.scrollHeight > element.clientHeight) {
            setIsOverflowing(true); // "더보기"를 표시
           
          } else {
            setIsOverflowing(false); // "더보기" 숨김
          
          }
        }
      };
  
      checkOverflow(); // 컴포넌트 마운트 시 스크롤 여부 확인

    }, []); // 필요 시 상태 변수 추가 가능
  


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
                        left:'0',
                        alignItems:'end',
                        padding:'20px 16px 24px 24px',
                      }}>
                        <Contents
                        className="pray-contents-wrapper"
                        ref={contentsRef}
                        onClick={handleInsideClick} // 내부 클릭 시 이벤트 전파 차단
                        style={{
                        maxHeight: isExpanded ? '85dvh' : '68dvh', // 클릭 시 확장/축소
                        overflowY: isExpanded ? 'scroll' : 'hidden', // 스크롤 처리
                        }}
                        >
                            <div style={{
                                display:'flex',
                                alignItems:'center',
                                marginBottom:'10px',
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
                                <span className="pray-contents"
                                    style={{
                                    position:'relative',
                                    fontSize:'16px',
                                    color:'#fff',
                                    fontWeight:400,
                                    textAlign:'left',
                                    maxHeight: isExpanded ? 'none' : '68dvh', // 확장 시 제한 없음
                                }}>
                                  
                                  {parse(post.contents)}
                                  
                                  {(!isExpanded && isOverflowing) &&
                                    <span style={{
                                        position: 'absolute',
                                        right:0,
                                        bottom:'45px',
                                        fontSize:'14px',
                                        color:'#fff',
                                        fontWeight:400,
                                        flexShrink:0,
                                        alignSelf:'center',
                                        backgroundColor: '#000',
                                        opacity: 0.65,
                                        padding: '3px 10px 5px 10px',
                                        borderRadius: '5px',
                                    }}
                                    onClick={handleMoreClick}
                                    >...더보기</span>
                                  }

                                  {(isExpanded && isOverflowing) &&
                                    <span style={{
                                      position: 'absolute',
                                      right:0,
                                      bottom:'40px',
                                      fontSize:'14px',
                                      color:'#fff',
                                      fontWeight:400,
                                      flexShrink:0,
                                      alignSelf:'center',
                                      backgroundColor: '#000',
                                      opacity: 0.65,
                                      padding: '3px 10px 5px 10px',
                                      borderRadius: '5px',
                                    }}
                                    onClick={handleMoreCloseClick}
                                    >닫기</span>
                                  }
                                </span>
                            </div>
                        </Contents>
                        <Buttons>
                            <div style={{ display:'flex', marginBottom:'30px' }}>
                            <BackHandOutlinedIcon className="reels-btn-like" />
                            </div>
                            <div style={{ display:'flex', marginBottom:'30px' }}>
                            <FavoriteBorderOutlinedIcon className="reels-btn-like" />
                            </div>
                            {/*<div style={{ display:'flex', marginBottom:'30px'}}>
                            <CommentOutlinedIcon className="reels-btn-comment" />
                            </div>*/}
                            <CommentDialog p_no={post.p_no} />
                            <div style={{ display:'flex', marginBottom:'30px' }}>
                            <BookmarkAddOutlinedIcon className="reels-btn-more" />
                            </div>
                            <div style={{ display:'flex' }}>
                            <ReplyOutlinedIcon className="reels-btn-share" />
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
