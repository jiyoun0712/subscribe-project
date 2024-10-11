import Grid from '@mui/material/Grid';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import  SwiperCore from 'swiper';
import { Swiper, SwiperSlide  } from 'swiper/react';
import { Mousewheel, Navigation } from "swiper/modules";
import '../styles.css';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';

import Fab from '@mui/material/Fab'
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";


import { useSwipeable } from 'react-swipeable';
import { useSelector, useDispatch } from'@/store/hooks';
import { fetchPhotos } from '@/store/apps/gallery/GallerySlice';
import ReelsImage from '../ReelsImage';

import { GalleryType } from '../../../../../(DashboardLayout)/types/apps/gallery';


const VerticalSwiperLg = () => {
    const pathName = usePathname();
  
    const router = useRouter();
    //const getTitle: number | any = pathName.split('/').pop();
    const getId: number | any = Number(pathName.split('/').pop());

   // const [slides, setSlides] = useState([]);
    const [slides, setSlides] = useState<GalleryType[]>([]);
    const [initialIndex, setInitialIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const swiperRef = useRef<SwiperCore | null>(null);
    const [isExpanded, setIsExpanded] = useState(false); // 확장 상태 관리

    const [swiping, setSwiping] = useState(false);
    const [translateX, setTranslateX] = useState(0);


    const [currentSlide, setCurrentSlide] = useState(0);
  
    const handleNext = () => {
      //setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      if (swiperRef.current) {
        const swiper = swiperRef.current;
        swiper.slideNext();
      }
    };
  
    const handlePrev = () => {
      //setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      if (swiperRef.current) {
        const swiper = swiperRef.current;
        swiper.slidePrev(); // 위로 스크롤하면 이전 슬라이드
      }
    };


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
    const handleSlideChange2 = (swiper: SwiperCore) => {       
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
            const index = slides.findIndex((photo) => photo.id === getId);
            setInitialIndex(index !== -1 ? index : 0); // id에 맞는 인덱스가 없으면 0으로 설정
        }
    }, [slides, getId]);

    // const handleSlideChange = (swiper: SwiperCore) => {
    //     if(swiper.activeIndex === id && !loading){
    //         setPage((prevPage) => prevPage + 1);
    //     }
    // }

    const handleSlideChange = (swiper: SwiperCore) => {
        const activeSlide = slides[swiper.activeIndex];
        if (activeSlide) {
          router.replace(`/apps/feed/vertical/detail/${activeSlide.id}`);
        }
    };
    
    const handleWheelScroll = (event: WheelEvent) => {
        const swiper = swiperRef.current;
        if (swiper) {
          if (event.deltaY > 0) {
            swiper.slideNext(); // 아래로 스크롤하면 다음 슬라이드
          } else {
            swiper.slidePrev(); // 위로 스크롤하면 이전 슬라이드
          }
        }
    }
    useEffect(() => {
        const container = document.getElementById('swiper-container');
        if (container) {
            container.addEventListener('wheel', handleWheelScroll);
        }

        return () => {
            if (container) {
            container.removeEventListener('wheel', handleWheelScroll);
            }
        };
    }, []);



  return (
    <Grid container style={{justifyContent: 'space-between'}}>{/*{...swiperHandlers}*/}
       <Grid item sm={6} lg={6}>
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
          mousewheel={ false } 
          modules={[Mousewheel, Navigation]} // 모듈추가
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

      <div className="slider-buttons" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ right: "0", bottom: "0" , marginBottom: '10px'}}
          onClick={handlePrev}
        >
          <IconArrowUp stroke={1.5} />
        </Fab>
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ right: "0", bottom: "0" }}
          onClick={handleNext}
        >
          <IconArrowDown stroke={1.5} />
        </Fab>
      </div>
    </Grid>
  );
};
export default VerticalSwiperLg;