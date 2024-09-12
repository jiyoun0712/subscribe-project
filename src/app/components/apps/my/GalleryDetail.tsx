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
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { format } from "date-fns";
import { useDispatch, useSelector } from "@/store/hooks";
import { fetchPhotos } from "@/store/apps/gallery/GallerySlice";
import { AppState } from "@/store/store";
import type { GalleryType } from "../../../(DashboardLayout)/types/apps/gallery";
import { useSwipeable } from 'react-swipeable';


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
        {/* <DialogTitle id="scroll-dialog-title">{currentPhoto?.time}</DialogTitle> */}
        <DialogContent dividers={scroll === 'paper'} {...handlers} style={{ touchAction: 'none', padding:0 }}>
          
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
                <div
                style={{
                  transition: 'opacity 0.5s ease-in-out', // 트랜지션 적용
                  opacity: isAnimating ? 0.8 : 1, // 페이드 아웃과 페이드 인 제어
                }}
                >

                  <Grid item sm={12} lg={currentPhoto.name ? 12 : 6} key={currentPhoto.cover} container justifyContent="center" alignItems="center">
                    <CardMedia
                      component="img"
                      image={currentPhoto.cover}
                      alt={currentPhoto.name}
                      style={{
                        width: '100vw', // 뷰포트 너비에 맞추기
                        height: '100vh', // 뷰포트 높이에 맞추기
                        objectFit: 'cover', // 이미지를 잘리지 않도록 조정

                      }}
                    />
                  </Grid>

                  {/* 이미지 위에 날짜를 좌측 상단에 배치 */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 검은색 투명 배경
                    padding: '5px 10px',
                    borderRadius: '5px',
                    color: 'white',
                  }}>
                    {format(new Date(currentPhoto?.time), 'E, MMM d, yyyy')}
                  </div>
                  
                  {/* 이미지 위에 내용을 중앙에 배치 */}
                  <div style={{
                    position: 'absolute',
                    top: '86px',
                    bottom: '86px',
                    left: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // 검은색 투명 배경
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    overflow: 'auto', // 스크롤 추가
                    maxHeight: '100vh', // 화면 높이에 맞게 스크롤 제한
                  }}>
                    <p style={{ 
                      margin: 0,
                      }}><Typography variant="subtitle2">
                    {convertNewlineToBreak(currentPhoto?.name)}
                    </Typography>
                    </p>
                  </div>
                </div>
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
        <DialogActions>
          {/* <Button color="error" onClick={handleClose}>
            Cancel
          </Button> */}
         

          
          <Button onClick={handlePrev} disabled={currentIndex <= 0}>
            이전
          </Button>
          <Button onClick={handleNext} disabled={currentIndex >= photos.length - 1}>
            다음
          </Button>

          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScrollContentDialog;
