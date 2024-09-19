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

const ReelsList = ({ }) => {
    const [slides, setSlides] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const swiperRef = useRef(null);

    const [swiping, setSwiping] = useState(false);
    const [translateX, setTranslateX] = useState(0);

    const handleSlideChange = (swiper: SwiperCore) => {
        if(swiper.activeIndex === slides.length - 1 && !loading){
            setPage((prevPage) => prevPage + 1);
        }
    }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const getPhotos: GalleryType[] = useSelector((state) => state.galleryReducer.gallery);

  return (
    <Grid container>
      <Swiper
        ref={swiperRef}
        direction={'vertical'}
        pagination={{ clickable: true }}
        className="prayerSwiper"
        onSlideChange={handleSlideChange}
      >
      {getPhotos.map((photo) => {

        return (
        <SwiperSlide key={photo.id}>
          <Grid className="slide-content" item sm={12}>
         
            <ReelsImage post={photo} />
          </Grid>
        </SwiperSlide>  
        );
      })}
      </Swiper>
    </Grid>
  );
};

export default ReelsList;
