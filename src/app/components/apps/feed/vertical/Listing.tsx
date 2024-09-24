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

const GalleryCard = () => {
  const dispatch = useDispatch();

   
  
  const [openDialogId, setOpenDialogId] = React.useState<number | string | null>(null); // number 또는 string 타입




  const filterPhotos = (photos: GalleryType[], cSearch: string) => {
    if (photos)
      return photos.filter((t) =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())
      );

    return photos;
  };

  const [search, setSearch] = React.useState("");
  const getPhotos = useSelector((state) =>
    filterPhotos(state.galleryReducer.gallery, search)
  );

  const handleCardMediaClick = (id: number|string) => {
    setOpenDialogId(id); // 클릭한 사진의 ID로 다이얼로그 열기
  };

  const handleDialogClose = () => {
    setOpenDialogId(null); // 다이얼로그 닫기
  };


  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);




    
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={"center"} mt={2}>
            <Box>
              <Typography variant="h3">
                피드 &nbsp;
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
            <Grid item xs={12} lg={4} key={photo.id} 
            >
              <BlankCard className="hoverCard">
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height={220}
                    ></Skeleton>
                  </>
                ) : (
                  <CardMedia
                    component={"img"}
                    height="220"
                    alt="Remy Sharp"
                    src={photo.cover}
                    
                    style={{ cursor: 'pointer' }} // 클릭 가능하도록 커서 변경
                    onClick={() => handleCardMediaClick(photo.id)} // CardMedia 클릭 시 다이얼로그 열기
                  />
                )}
                <Box p={3}>
                  <Stack direction="row" gap={1}>
                    <Box
                    style={{
                      maxWidth: '100%',  // Box의 최대 너비를 설정
                      whiteSpace: 'nowrap',   // 텍스트를 한 줄로 유지
                      overflow: 'hidden',     // 넘치는 텍스트 숨기기
                     
                    }}
                    >
                      <Typography variant="h6" style={{
                     
                      whiteSpace: 'nowrap',   // 텍스트를 한 줄로 유지
                      overflow: 'hidden',     // 넘치는 텍스트 숨기기
                   
                    }}>{photo.name}</Typography>
                      <Typography variant="caption">
                        {format(new Date(photo.time), "E, MMM d, yyyy")}
                      </Typography>
                    </Box>
                    <Box ml={"auto"}>
                      <IconButton>
                        <IconDotsVertical size="16" />
                      </IconButton>
                    </Box>
                  </Stack>
                </Box>

                {/* <Box>
                  <Stack direction="row" gap={1} alignItems="right" justifyContent="end">
                    <DetailDialog id={photo.id} />
                  </Stack>
                </Box> */}

               {/* 다이얼로그를 조건부 렌더링 */}
               <>
                {/* 다이얼로그를 조건부 렌더링 */}
              {openDialogId === photo.id && (
                <DetailDialog id={photo.id} onClose={handleDialogClose} />
              )}
                </>
              </BlankCard>
            </Grid>
          );
        })}




      </Grid>
    </>
  );
};

export default GalleryCard;
