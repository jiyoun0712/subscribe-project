import Grid from '@mui/material/Grid';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import { useSwipeable } from 'react-swipeable';

import { useSelector, useDispatch } from'@/store/hooks';
import { fetchPhotos } from '@/store/apps/gallery/GallerySlice';
import ReelsImage from './ReelsImage';
//import { PostTextBox } from './PostTextBox';
import { GalleryType } from '../../../../(DashboardLayout)/types/apps/gallery';
import { Swiper as SwiperCore } from 'swiper';



interface DetailDialogProps {
    id: number;
  }


const ReelsList: React.FC<DetailDialogProps> = ({ id }) => {
   // const [slides, setSlides] = useState([]);
    const [slides, setSlides] = useState<GalleryType[]>([]);
    const [initialIndex, setInitialIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const swiperRef = useRef(null);

    const [swiping, setSwiping] = useState(false);
    const [translateX, setTranslateX] = useState(0);



   
  



    const handleSlideChange = (swiper: SwiperCore) => {
       
        if (swiper.activeIndex === initialIndex && !loading) {
            setLoading(true);
            setTimeout(() => {
            setLoading(false);
            }, 700); // 추가 로딩 시뮬레이션
        }
    };



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    const getPhotos: GalleryType[] = useSelector((state) => state.galleryReducer.gallery);

    useEffect(() => {
    if (getPhotos.length > 0) {
        setSlides(getPhotos);
   
    }
    }, [getPhotos]);

  
   // getPhotos가 설정된 후에 initialIndex를 다시 계산
    useEffect(() => {
        if (slides.length > 0) {
            const index = slides.findIndex((photo) => photo.id === id);
            console.log('index:::', index);
            setInitialIndex(index !== -1 ? index : 0); // id에 맞는 인덱스가 없으면 0으로 설정
            
            
            console.log('initialIndex:::', initialIndex);
        }
    }, [slides, id]);


    // const handleSlideChange = (swiper: SwiperCore) => {
    //     if(swiper.activeIndex === id && !loading){
    //         setPage((prevPage) => prevPage + 1);
    //     }
    // }


  return (
    <Grid container>
      {initialIndex !== null && slides.length > 0 ? ( // initialIndex가 null이 아닐 때만 렌더링
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        pagination={{ clickable: true }}
        className="prayerSwiper"
        onSlideChange={handleSlideChange}
        initialSlide={initialIndex} // id에 해당하는 슬라이드로 초기 이동
      >
      {slides.map((photo) => {

        return (
        <SwiperSlide key={photo.id}>
          <Grid className="slide-content" item sm={12}>
         
            <ReelsImage post={photo} />
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
