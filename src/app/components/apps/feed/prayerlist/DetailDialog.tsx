import React, {useEffect} from 'react';
import { fetchPosts } from "@/store/apps/feed/FeedSlice";
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
} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import type { PostImageType, PostDataType } from "../../../../(DashboardLayout)/types/apps/feed";

interface DetailDialogProps {
  id: number;
}

const ScrollContentDialog: React.FC<DetailDialogProps> = ({ id }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
 
  
  const getTitle: number | any = id;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Get post
  const getPost = useSelector((state: AppState) => state.feedReducer.posts);


  const post: PostDataType | any = getPost.find(
    (p: PostDataType) => getTitle === p.id
  );

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

  // skeleton
  const [isLoading, setLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);
    
  // 개행 문자를 <br />로 변환하는 함수
  const convertNewlineToBreak = (text: string) => {
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
     
      
      <Stack direction={'row'} gap={2} alignItems="center" justifyContent="flex-end">
        <Button size="small" onClick={handleClickOpen('paper')}>더보기</Button>
      </Stack>


      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{post?.profile.name}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          
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
                <>
                {post?.data.images.map((photo: PostImageType) => {
                  return (
                    <Grid item sm={12} lg={photo.featured ? 12 : 6} key={photo.img}>
                      <CardMedia
                        component="img"
                        height="440"
                        image={photo.img}
                        alt="green iguana"
                      />
                    </Grid>
                  );
                })}
                </>
              )}
          </>

          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <p>
            {convertNewlineToBreak(post?.data.content)}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScrollContentDialog;
