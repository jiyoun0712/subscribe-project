import React, { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
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
import { format } from "date-fns";
import { useDispatch, useSelector } from "@/store/hooks";
import { fetchPhotos } from "@/store/apps/gallery/GallerySlice";
import { AppState } from "@/store/store";
import type { GalleryType } from "../../../../(DashboardLayout)/types/apps/gallery";
import { useSwipeable } from 'react-swipeable';
import ReelsList from './ReelsList';
import Overlay from './Overlay';


interface DetailDialogProps {
  id: number;
  onClose: () => void; // onClose prop 추가
}

const ScrollContentDialog: React.FC<DetailDialogProps> = ({ id,  onClose }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const [selectedSlideId, setSelectedSlideId] = React.useState<number | null>(null);
  const [selectedDeltaX, setSelectedDeltaX] = React.useState<number | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false);    
 
  const [currentIndex, setCurrentIndex] = useState<number>(0); // 현재 게시물 인덱스 관리
  const [isAnimating, setAnimating] = React.useState<boolean>(false); // 애니메이션 상태 관리

  const photos = useSelector((state: AppState) => state.galleryReducer.gallery);

  //const handleOverlayClose = (scrollType: DialogProps['scroll']) => () => {
   // setIsOverlayOpen(false);
    
   // setScroll(scrollType);
  //};


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


  //현재 id 인덱스를 초기화
  useEffect(() => {
    const index = photos.findIndex((photo: GalleryType) => photo.id === id);
    if(index !== -1){
      setCurrentIndex(index);
    }
  }, [photos, id]);



  return (
    <>
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
                <Skeleton variant="rectangular" width="100%">
                    <div style={{ paddingTop: '100%' }} />
                </Skeleton>
                  
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop:'20px', marginRight: '16px', marginLeft: '16px' }}>
                    <Box sx={{ margin: 1 }}>
                        <Skeleton variant="circular">
                        <Avatar />
                        </Skeleton>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="30%">
                        <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px', marginLeft: '16px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="100%">
                        <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px', marginLeft: '16px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Skeleton width="100%">
                        <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </Box>
                </>
              ) : (
                <>
                <ReelsList id={id} onSwipeLeft={handleSwipeLeft} />
                <Overlay deltaX={selectedDeltaX} slideId={selectedSlideId} isOpen={isOverlayOpen} onClose={handleOverlayClose} />
                </>
              )}
          </>
        </DialogContent>
     
      </Dialog>
    </>
  );
};

export default ScrollContentDialog;
