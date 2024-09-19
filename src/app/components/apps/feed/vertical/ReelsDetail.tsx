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
  id: number | string;
  onClose: () => void; // onClose prop 추가
}

const ScrollContentDialog: React.FC<DetailDialogProps> = ({ id,  onClose }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
 
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 게시물 인덱스 관리
  const [isAnimating, setAnimating] = React.useState<boolean>(false); // 애니메이션 상태 관리

  const photos = useSelector((state: AppState) => state.galleryReducer.gallery);

 
  const currentPhoto = photos[currentIndex];
  
  // 스와이프 이벤트 처리
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true, // 마우스 스와이프도 지원
  });

  const handleNext = () => {



    if (currentIndex < photos.length - 1) {
      setAnimating(true); // 애니메이션 시작
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setAnimating(false); // 애니메이션 끝
      }, 300); // 애니메이션 지속 시간 (300ms)
    }


  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimating(true); // 애니메이션 시작
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setAnimating(false); // 애니메이션 끝
      }, 300); // 애니메이션 지속 시간 (300ms)
    }
  };





  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // 개행 문자를 <br />로 변환하는 함수
  const convertNewlineToBreak = (text: string) => {
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };

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
    const index = photos.findIndex((photo: GalleryType) => photo.id === id);
    if(index !== -1){
      setCurrentIndex(index);
    }
  }, [photos, id]);



  return (
    <>
     
      
      {/* <Stack direction={'row'} gap={2} alignItems="center" justifyContent="flex-end">
        <Button size="small" onClick={handleClickOpen('paper')}>더보기</Button>
      </Stack> */}


      <Dialog
          open={true} // 항상 다이얼로그가 열려있도록 설정 (부모가 열림 상태 제어)
          onClose={onClose} // 다이얼로그를 닫는 동작 처리
        scroll={scroll}
        fullScreen  
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
       
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
                <ReelsList />
              )}
          </>

          {/* <DialogContentText 
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <p>
            {currentPhoto.name}
            </p>
          </DialogContentText>*/}


        </DialogContent>
     
      </Dialog>
    </>
  );
};

export default ScrollContentDialog;
