import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useEffect } from "react";
//import BlankCard from "../../../../components/shared/BlankCard";
import DetailDialog from './ReelsDetail';

import BlankCard from "../../../../components/shared/BlankCard";
import { useSelector, useDispatch } from "@/store/hooks";
import { fetchPhotos } from "@/store/apps/gallery/GallerySlice";
import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import { format } from "date-fns";
import { GalleryType } from "../../../../(DashboardLayout)/types/apps/gallery";

// 개행 문자를 <br />로 변환하는 함수
const convertNewlineToBreak = (text: string) => {
  return text.split('\n').map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));
};


const Listing = () => {
  const dispatch = useDispatch();
  const [openDialogId, setOpenDialogId] = React.useState<number | string | null>(null); // number 또는 string 타입
  const [search, setSearch] = React.useState("");


  const filterPhotos = (photos: GalleryType[], cSearch: string) => {
    if (photos)
      return photos.filter((t) =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())
      );

    return photos;
  };

  const getPhotos = useSelector((state) =>
    filterPhotos(state.galleryReducer.gallery, search)
  );

  const handleCardMediaClick = (id: number|string) => {
    setOpenDialogId(id); // 클릭한 사진의 ID로 다이얼로그 열기
  };

  const handleDialogClose = () => {
    setOpenDialogId(null); // 다이얼로그 닫기
  };

   
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);


  // skeleton
  const [isLoading, setLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  
  return (
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={"center"} mt={2}>
            <Box>
              <Typography variant="h3">
                기도 목록 &nbsp;
                <Chip label={getPhotos.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <TextField
                id="outlined-search"
                placeholder="Search Gallery"
                size="small"
                type="search"
                variant="outlined"
                inputProps={{ "aria-label": "Search Gallery" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="14" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </Stack>
        </Grid>
        {getPhotos.map((photo) => {
          return (
            <Grid item xs={12} lg={4} key={photo.id}>
              <BlankCard className="hoverCard">
                <Box key={photo.id} px={2}>
                    <Box
                      p={2}
                      sx={{
                        position: "relative",
                        cursor: "pointer",
                        mt: 2,
                        mb: 2,
                        transition: "0.1s ease-in",
                      /* transform:
                          activePrayer === index ? "scale(1)" : "scale(0.95)",*/
                        backgroundColor: `blue.light`,
                      }}
                      onClick={() => handleCardMediaClick(photo.id)}>

                      <div>{convertNewlineToBreak(photo.name)}</div>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Typography variant="caption">
                          {new Date(photo.time).toLocaleDateString()}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>

                {/* 다이얼로그를 조건부 렌더링 */}
                <>
                {openDialogId === photo.id && (
                  <DetailDialog id={photo.id} onClose={handleDialogClose} />
                )}
                </>
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
  );
};

export default Listing;