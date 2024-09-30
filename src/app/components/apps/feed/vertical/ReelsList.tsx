import Grid from '@mui/material/Grid';
import { useEffect, useState, useRef } from 'react';
import { Swiper as SwiperCore } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import { useSwipeable } from 'react-swipeable';
import { useSelector, useDispatch } from'@/store/hooks';
import { fetchPhotos } from '@/store/apps/gallery/GallerySlice';
import ReelsImage from './ReelsImage';

import { GalleryType } from '../../../../(DashboardLayout)/types/apps/gallery';

interface DetailDialogProps {
    id: number;
    onSwipeLeft: (slideId: number, deltaX: number) => void;
}

const ReelsList: React.FC<DetailDialogProps> = ({ id, onSwipeLeft }) => {
   // const [slides, setSlides] = useState([]);
    const [slides, setSlides] = useState<GalleryType[]>([]);
    const [initialIndex, setInitialIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const swiperRef = useRef<SwiperCore | null>(null);
    const [isExpanded, setIsExpanded] = useState(false); // 확장 상태 관리

    const [swiping, setSwiping] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const handleExpandChange = (expanded: boolean) => {
      setIsExpanded(expanded);
      if (swiperRef.current) {
        if(expanded){
          swiperRef.current.allowTouchMove = false; // 확장 상태에 따른 스와이프 설정 변경
        }else{
          swiperRef.current.allowTouchMove = true; // 확장 상태에 따른 스와이프 설정 변경
        }
      }
    };
/*
    const swiperHandlers = useSwipeable({
        onSwiping: (eventData) => {
          if (!isExpanded) { // 확장 상태에서는 스와이프 비활성화
            if(eventData.dir === 'Left') {
                setSwiping(true);
                setTranslateX(eventData.deltaX);

                const swiper = swiperRef.current;
                if (swiper) {
                    const activeIndex = swiper.activeIndex;
                    const activeSlide = slides[activeIndex];                
                    onSwipeLeft(activeSlide.id, eventData.deltaX);
                }
            }
          }
        },
        onSwipedLeft:(eventData) => {
          if (!isExpanded) { // 확장 상태에서는 스와이프 비활성화
            const swiper = swiperRef.current;
            if (swiper) {
                const activeIndex = swiper.activeIndex;
                const activeSlide = slides[activeIndex];
                if (activeSlide) {
                    onSwipeLeft(activeSlide.id, eventData.deltaX);
                }
            }
          }
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });
*/
    const handleSlideChange = (swiper: SwiperCore) => {       
        if (swiper.activeIndex === initialIndex && !loading) {
            setLoading(true);
            console.log('handleSlideChange!');
            
            setTimeout(() => {
              setLoading(false);
            }, 500); // 추가 로딩 시뮬레이션
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);


    const getPhotos: GalleryType[] = useSelector((state) => state.galleryReducer.gallery);
    useEffect(() => {
        if (getPhotos.length > 0) {
            //console.log(getPhotos)
            setSlides(getPhotos);
        }
    }, [getPhotos]);

  
   // getPhotos가 설정된 후에 initialIndex를 다시 계산
    useEffect(() => {
        if (slides.length > 0) {
            const index = slides.findIndex((photo) => photo.id === id);
            setInitialIndex(index !== -1 ? index : 0); // id에 맞는 인덱스가 없으면 0으로 설정
        }
    }, [slides, id]);

    // const handleSlideChange = (swiper: SwiperCore) => {
    //     if(swiper.activeIndex === id && !loading){
    //         setPage((prevPage) => prevPage + 1);
    //     }
    // }

  return (
    <Grid container >{/*{...swiperHandlers}*/}
      { initialIndex !== null && slides.length > 0 ? ( // initialIndex가 null이 아닐 때만 렌더링
        <Swiper
          onSwiper={(swiper) => {
              swiperRef.current = swiper; // Swiper 인스턴스 할당
          }}
          ref={swiperRef as any}
          direction={'vertical'}
          pagination={{ clickable: true }}
          className="prayerSwiper"
          onSlideChange={handleSlideChange}
          initialSlide={initialIndex} // id에 해당하는 슬라이드로 초기 이동
          speed={360} // 슬라이드 속도 설정 (밀리초 단위, 1초 = 1000ms)
        >
        {slides.map((photo) => {
          return (
            <SwiperSlide key={photo.id}>
              <Grid className="slide-content" item sm={12}>
            
                <ReelsImage post={photo} onExpandChange={handleExpandChange} />
              </Grid>
            </SwiperSlide>  
            );
        })}
        </Swiper>
      ) : (
        <p>Loading...</p> // 로딩 중일 때 표시할 콘텐츠
      )}
    </Grid>
  );
};
export default ReelsList;