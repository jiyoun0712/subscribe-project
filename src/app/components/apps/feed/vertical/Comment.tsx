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
import { fetchPhotos } from "@/store/apps/gallery/GallerySlice";
import { AppState } from "@/store/store";
import type { GalleryType } from "../../../../(DashboardLayout)/types/apps/gallery";
import { useSwipeable } from 'react-swipeable';
import ReelsList from './ReelsList';
import Overlay from './Overlay';


interface CommentDialogProps {
  id: number;
}

interface TransitionProps extends SlideProps {}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const CommentDialog: React.FC<CommentDialogProps> = ({ id }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  
  const [translateY, setTranslateY] = React.useState(0);

  const [selectedSlideId, setSelectedSlideId] = React.useState<number | null>(null);
  const [selectedDeltaX, setSelectedDeltaX] = React.useState<number | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false);    
 
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 게시물 인덱스 관리
  const [isAnimating, setAnimating] = React.useState<boolean>(false); // 애니메이션 상태 관리

  const dialogRef = useRef(null);

  const getTitle: number | any = id;


  const getPhotos = useSelector((state: AppState) => state.galleryReducer.gallery);

  const photo: GalleryType | any = getPhotos.find(
    (p: GalleryType) => getTitle === p.id
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
  };

  const handleSwipeLeft = (slideId: number, deltaX: number) => {
    console.log('handleSwipeLeft##')
    setSelectedSlideId(slideId);
    setSelectedDeltaX(deltaX);
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  };



  // skeleton
  const [isLoading, setLoading] = React.useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);



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
      >
       
        <DialogContent dividers={scroll === 'paper'} style={{ touchAction: 'none', padding:0 }}>
          
        </DialogContent>
     
      </Dialog>
    </>
  );
};

export default CommentDialog;
