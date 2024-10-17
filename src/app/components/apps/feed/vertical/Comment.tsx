import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Avatar,
  DialogProps,
  Typography,

} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import { Slide } from '@mui/material';
import { SlideProps } from '@mui/material/Slide';

import { format } from "date-fns";
import { useDispatch, useSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/apps/post/PostSlice";
import { AppState } from "@/store/store";
import { PostType } from "../../../../(DashboardLayout)/types/apps/post";
import { useSwipeable } from 'react-swipeable';
import ReelsList from './ReelsList';
import Overlay from './Overlay';


interface CommentDialogProps {
  p_no: number;
}

interface TransitionProps extends SlideProps {}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const CommentDialog: React.FC<CommentDialogProps> = ({ p_no }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  
  const [translateY, setTranslateY] = React.useState(0);

 

  const dialogRef = useRef(null);

  const getPno: number = p_no;


  const getPosts = useSelector((state: AppState) => state.postReducer.post);

  const post: PostType = getPosts.find(
    (p: PostType) => getPno === p.p_no
  );
  //const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
   // setIsOverlayOpen(false);
    
   // setScroll(scrollType);
  //};

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTranslateY(0);
  };




  // skeleton
  // const [isLoading, setLoading] = React.useState(true);
  
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 700);

  //   return () => clearTimeout(timer);
  // }, []);


  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if(eventData.dir === 'Down'){
        setTranslateY(eventData.deltaY);
      }
    },
    onSwipedDown: (eventData) => {
      if(eventData.velocity > 0.3 || eventData.deltaY > 100) {
        handleClose();
      }else{
        setTranslateY(0);
      }
    },
    //preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })


  return (
    <>
   
    <div style={{ display:'flex', marginBottom:'30px'}}>
    <CommentOutlinedIcon className="reels-btn-comment" onClick={handleClickOpen} />
    </div>
    
    <Dialog
        open={open} // 항상 다이얼로그가 열려있도록 설정 (부모가 열림 상태 제어)
        onClose={handleClose} // 다이얼로그를 닫는 동작 처리
        TransitionComponent={Transition}
        fullScreen  
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          ref: dialogRef,
          style:{
              transform: `translateY(${translateY}px)`,
              transition : translateY === 0 ? 'transform 0.3s ease' : 'none',

              backgroundColor: 'translate',
              marginTop: '100px',
              height: 'Calc(100%-100px)'
          }
        }}
        {...swipeHandlers}
      >
       
        <DialogContent dividers={scroll === 'paper'} style={{ touchAction: 'none', padding:0 }}>
          {post.p_no}
        </DialogContent>
     
      </Dialog>
    </>
  );
};

export default CommentDialog;
