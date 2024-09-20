import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  DialogProps,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { format } from "date-fns";
import { useDispatch, useSelector } from "@/store/hooks";
import { fetchPhotos } from "@/store/apps/gallery/GallerySlice";
import { AppState } from "@/store/store";
import type { GalleryType } from "../../../../(DashboardLayout)/types/apps/gallery";
import { useSwipeable } from 'react-swipeable';
import ReelsList from './ReelsList';


interface DetailDialogProps {
    deltaX: number | null,
    slideId: number | null,
    isOpen: boolean,
    onClose: () => void, // onClose prop 추가
}

const Overlay: React.FC<DetailDialogProps> = ({ deltaX, slideId, isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 게시물 인덱스 관리

  const [translateX, setTranslateX] = useState(0);
  

  const photos = useSelector((state: AppState) => state.galleryReducer.gallery);

 
  const currentPhoto = photos[currentIndex];



  // 개행 문자를 <br />로 변환하는 함수
  const convertNewlineToBreak = (text: string) => {
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };


  const handleOpen = (slideId: number|null) => {
    setTranslateX(0);
  }

  const handleClose = (event:any) => {
    if(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }
    }
    setTranslateX(0);
    onClose();
  }

  const swipeHandlers = useSwipeable({
    onSwiping:(eventData) => {
        if(eventData.dir ==='Right'){
           // setSwiping(true);
            setTranslateX(eventData.deltaX)
        }
    },
    onSwipedRight:(eventData) => {
        if(eventData.velocity > 0 && eventData.deltaX > 10){
            handleClose(eventData);
        }else{
            setTranslateX(0);
        }
    },

    trackMouse: true,
  })

  // skeleton
  const [isLoading, setLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);


  //현재 id 인덱스를 초기화
  useEffect(() => {
    const index = photos.findIndex((photo: GalleryType) => photo.id === slideId);
    if(index !== -1){
      setCurrentIndex(index);
    }
  }, [photos, slideId]);

  useEffect(()=>{
    if(isOpen){
        handleOpen(slideId);
    }
  },[isOpen, slideId])

  return (
    <>
     
      
      {/* <Stack direction={'row'} gap={2} alignItems="center" justifyContent="flex-end">
        <Button size="small" onClick={handleClickOpen('paper')}>더보기</Button>
      </Stack> */}


    <Dialog
          open={isOpen} // 항상 다이얼로그가 열려있도록 설정 (부모가 열림 상태 제어)
          onClose={onClose} // 다이얼로그를 닫는 동작 처리
        scroll={scroll}
        fullScreen  
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"

        {...swipeHandlers}
      >
        <Button
        onClick={onClose}
        sx={{
            position: 'absolute',
            top: '10px', // 창 상단에서 10px 떨어진 위치
            left: '10px', // 창 좌측에서 10px 떨어진 위치
            color: 'white', // 화살표 색상을 흰색으로 설정
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 검정색 배경
            borderRadius: '50%', // 둥근 버튼 모양
            padding: '8px', // 버튼 패딩
            minWidth: 'auto', // 버튼 너비를 아이콘 크기에 맞춤
            zIndex: 10 // 버튼이 다른 요소들 위에 위치하도록 설정
        }}
        >
            <ArrowBackIcon sx={{ fontSize: '2rem' }} /> {/* 이전 화살표 아이콘 */}
        </Button>
        <DialogContent dividers={scroll === 'paper'} style={{ touchAction: 'none', padding:0 }}>
          <>
              {isLoading ? (
                <>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width="100%"
                    height={440}
                    sx={{
                      borderRadius: (theme) => theme.shape.borderRadius / 5,
                    }}
                  ></Skeleton>
                </>
              ) : (
                <DialogContentText 
                id="scroll-dialog-description"
                tabIndex={-1}
                >
                <p>
                {currentPhoto.name}
                </p>
              </DialogContentText>
              )}
          </>

   


        </DialogContent>
     
      </Dialog>
    </>
  );
};

export default Overlay;
