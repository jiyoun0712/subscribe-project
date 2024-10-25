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

import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Slide } from '@mui/material';
import { SlideProps } from '@mui/material/Slide';

import { format } from "date-fns";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { useSwipeable } from 'react-swipeable';

import { fetchComments, addComment, SelectPost } from "@/store/apps/post/PostSlice";
import BlankCard from "../../../shared/BlankCard";
import PostComment from "./PostComment";
import type { PostType, CommentType } from "../../../../(DashboardLayout)/types/apps/post";





interface CommentDialogProps {
  p_no: number;
  comments: number;
}

interface TransitionProps extends SlideProps {}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const CommentDialog: React.FC<CommentDialogProps> = ({ p_no, comments }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  
  const [translateY, setTranslateY] = React.useState(0);

  const [replyTxt, setReplyTxt] = React.useState("");

  const dialogRef = useRef(null);

  const getPno: number = p_no;


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

  const onSubmit = async (p_no: number, contents: string) => {
   // const replyId: string = uniqueId("#comm_");
    //const newReply = {
      //p_no: p_no,
      // profile: {
      //   id: uniqueId("#REPLY_"),
      //   avatar: post?.author.avatar,
      //   name: post?.author.name,
      //   time: "now",
      // },
      //contents: reply,
      
    //};
    dispatch(addComment(p_no, contents));
    //dispatch(fetchComments(p_no));
    //dispatch(SelectPost(p_no));
    setReplyTxt("");
  };

  useEffect(() => {
    if (open) {
      dispatch(fetchComments(p_no));
    }
  }, [dispatch, p_no, open]); // 다이얼로그가 열릴 때만 fetchComments 실행

  

  const getComments = useSelector(state => state.postReducer.comment || []);
    
  //console.log(getComments)


  return (
    <>
    <div style={{ display:'flex', marginBottom:'26px', flexDirection: 'column'}}>
      <CommentOutlinedIcon className="reels-btn-comment" onClick={handleClickOpen} />
      <span style={{display:'block', fontSize:'12px', color:'#fff', fontWeight:400, height:'18px'}}>{comments}</span>
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
              borderRadius:'14px 14px 0 0',
              backgroundColor: 'translate',
              marginTop: '100px',
              height: 'Calc(100%-100px)'
          }
        }}
        {...swipeHandlers}
      >
       
        <DialogContent dividers={scroll === 'paper'} style={{ touchAction: 'none', padding:0, marginBottom: '44px' }}>

          <BlankCard sx={{ mt: 3, p: 0 }}>
            <CardContent>
              <Typography variant="h4" fontWeight={600}>
                No.{p_no}
              </Typography>
              <br />
              <TextField
                rows={4}
                multiline
                fullWidth
                value={replyTxt}
                onChange={(e) => setReplyTxt(e.target.value)}
              ></TextField>
              <br />
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={() => onSubmit(p_no, replyTxt)}
              >
                등록하기
              </Button>

              <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
                <Typography variant="h4" fontWeight={600}>
                  댓글
                </Typography>
                <Box
                  px={1.5}
                  py={1}
                  color="primary.main"
                  bgcolor={"primary.light"}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {getComments.length}
                  </Typography>
                </Box>
              </Stack>
              <Box>              
                {getComments.map((comment, index) => (
                    <PostComment comment={comment} key={index} />
                ))}
              </Box>
            </CardContent>
          </BlankCard>
        </DialogContent>
     
    </Dialog>
    </>
  );
};

export default CommentDialog;