import Grid from '@mui/material/Grid'

import { useEffect } from 'react';
import { useSelector, useDispatch } from'@/store/hooks';
import { fetchPosts } from '@/store/apps/feed/FeedSlice';
import ReelsList from './ReelsList';
//import { PostTextBox } from './PostTextBox';
import { PostType } from '../../../../(DashboardLayout)/types/apps/feed';




const Listing = () => {

//  const [selectedSlideId, setSelectedSlideId] = useState(null);
//  const [selectedDeltaX, setSelectedDeltaX] = useState(null);
//  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
/*
  const handleSwipeLeft = (slideId, deltaX) => {
    setSelectedSlideId(slideId);
    setSelectedDeltaX(deltaX);
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
  }
*/



  return (
    <Grid container>
 
      <Grid item sm={12} id="app-prayer">
        <ReelsList />
      </Grid>
   
  
    </Grid>
  );
};

export default Listing;
