import React, { useEffect } from "react";
import { Theme } from '@mui/material/styles';
import { useRouter  } from "next/navigation";
import useMediaQuery from '@mui/material/useMediaQuery';
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


import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
//import GridViewCompactIcon from '@mui/icons-material/AppsRounded';
import ViewFullIcon from '@mui/icons-material/ViewDayOutlined';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const dispatch = useDispatch();
  const router = useRouter();
  const [openDialogId, setOpenDialogId] = React.useState<number | string | null>(null); // number 또는 string 타입
  const [search, setSearch] = React.useState("");
  const [viewType, setViewType] = React.useState<'list' | 'grid' | 'full'>('list');


  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: 'list' | 'grid' | 'full') => {
    if (nextView !== null) {
      setViewType(nextView);
      setLoading(true); // 로딩 상태로 변경
      setTimeout(() => {
        setLoading(false); // 일정 시간 후 로딩 종료
      }, 500);
    };
  };


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
    
    
    if (lgUp) {
      // PC: 세로 스와이프 전환
      router.push(`/apps/feed/vertical/detail/${id}`);
    } else {
      // 모바일: 다이얼로그 창 열기
      setOpenDialogId(id); // 클릭한 사진의 ID로 다이얼로그 열기
    }


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
          </Stack>


          <Stack direction={{ xs: 'row', sm: 'row', lg: 'row' }} alignItems={"center"} mt={2} sx={{ display:'flex', justifyContent:'space-between'}}>
            <TextField
              id="outlined-search"
              placeholder="Search Gallery"
              size="small"
              type="search"
              variant="outlined"
            
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size="14" />
                  </InputAdornment>
                ),
              }}

              sx={{
                width: lgUp ? "auto" : "100%",
                
              }}

              fullWidth
              onChange={(e) => setSearch(e.target.value)}
            />
                    
            <ToggleButtonGroup
              value={viewType}
              exclusive
              onChange={handleChange}
              size="small"
              sx={{ marginLeft: '16px' }}>
              <ToggleButton value="list" aria-label="list">
                <ListIcon />
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="full" aria-label="full">
                <ViewFullIcon />
              </ToggleButton>
            </ToggleButtonGroup> 
          </Stack>
        </Grid>

      {isLoading ? (
        // 로딩 중일 때 스켈레톤 렌더링
        <>
        { viewType === 'list' &&
          <>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} lg={12} key={index}>
              <BlankCard className="hoverCard" sx={{ ml: 2, mr: 2 }} >
              
                <Skeleton variant="rectangular" height={15} sx={{ mt:2, mb:2, ml: 2, mr: 2 }} />
                <Skeleton variant="rectangular" width="40%" height={15} sx={{ mt:1, mb:2, ml: 2, mr: 2 }} />
              </BlankCard>
            </Grid>
          ))}
          </>
        }

        { viewType === 'grid' &&
          <>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} lg={4} key={index}>
              <Skeleton variant="rectangular" height={250} />
            </Grid>
          ))}
          </>
        }


        { viewType === 'full' &&
          <>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} lg={12} key={index}>
              <Skeleton variant="rectangular" height={150} />
            </Grid>
          ))}
          </>
        }
        </>
      ) : (
        <>
        {getPhotos.map((photo) => {
          return (
            <>
            {/* 선택된 타입에 따라 컴포넌트 렌더링 */}
            {viewType === 'list' &&
              <Grid item xs={12} lg={12} key={photo.id}>
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
                          overflow: "hidden",
                          whiteSpace: 'nowrap',  // 한 줄로 표시
                          textOverflow: 'ellipsis' // 넘치는 부분 '...'으로 표시
                          
                        }}
                        onClick={() => handleCardMediaClick(photo.id)}>

                        <div style={{overflow: "hidden",}}>{photo.name}</div>

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
            }

            {/* 선택된 타입에 따라 컴포넌트 렌더링 */}
            {viewType === 'grid' &&
            
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
                          
                          height: "250px", // 고정 높이 설정
                          display: "flex",  // 내용이 중앙에 오도록 설정
                          flexDirection: "column",
                          justifyContent: "space-between",
                          overflow: "hidden",
                        }}
                        onClick={() => handleCardMediaClick(photo.id)}>

                        <div 
                          style={{
                          position: "relative",
                          cursor: "pointer",
                          marginBottom: 10,
                          transition: "0.1s ease-in",
                        /* transform:
                            activePrayer === index ? "scale(1)" : "scale(0.95)",*/
                          backgroundColor: `blue.light`,
                          
                          height: "200px", // 고정 높이 설정
                          display: "flex",  // 내용이 중앙에 오도록 설정
                          flexDirection: "column",
                          justifyContent: "space-between",
                          overflow: "hidden",
                        }}>{convertNewlineToBreak(photo.name)}</div>

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
            }

            {/* 선택된 타입에 따라 컴포넌트 렌더링 */}
            {viewType === 'full' &&
              <Grid item xs={12} lg={12} key={photo.id}>
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
            }
            </>
          );
        })}
      </>
      )}

      </Grid>
  );
};

export default Listing;