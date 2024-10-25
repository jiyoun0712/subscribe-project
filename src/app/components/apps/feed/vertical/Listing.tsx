import React, { useEffect } from "react";
import { Theme } from '@mui/material/styles';
import { useRouter  } from "next/navigation";
import parse from 'html-react-parser';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { IconTrash, IconEdit } from "@tabler/icons-react";
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
import { fetchPosts, deletePost, SelectPost } from "@/store/apps/post/PostSlice";

import { IconDotsVertical, IconSearch } from "@tabler/icons-react";
import { format } from "date-fns";
import { PostType } from "../../../../(DashboardLayout)/types/apps/post";
import * as FC from '@/utils/common';
import UpdatePostDialog from "./UpdatePost";




const Listing = () => {
  
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const dispatch = useDispatch();
  const router = useRouter();
  const [openDialogId, setOpenDialogId] = React.useState<number>(0); // number
  const [openEdit, setOpenEdit] = React.useState(false); // 수정 다이얼로그 상태 관리
  const [search, setSearch] = React.useState("");
  const [viewType, setViewType] = React.useState<'list' | 'grid' | 'full'>('list');


  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: 'list' | 'grid' | 'full') => {
    if (nextView !== null) {
      setViewType(nextView);
      setLoading(true); // 로딩 상태로 변경
      setTimeout(() => {
        setLoading(false); // 일정 시간 후 로딩 종료
      }, 500);
    };
  };
 
  const handleCardMediaClick = (p_no: number) => {
    if (p_no !== undefined) {
      if (lgUp) {
        // PC: 세로 스와이프 전환
        router.push(`/apps/feed/vertical/detail/${p_no}`);
      } else {
        // 모바일: 다이얼로그 창 열기
        setOpenDialogId(p_no); // 클릭한 사진의 ID로 다이얼로그 열기
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialogId(0); // 다이얼로그 닫기
  };

   
  useEffect(() => {
    dispatch(fetchPosts());
   
  }, [dispatch]);


  // skeleton
  const [isLoading, setLoading] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  const filterPosts = (posts: PostType[], cSearch: string) => {
    if (posts)
       return posts.filter((t) =>
         t.contents.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())
       );

     return posts;
  };


  const getPosts  = useSelector((state) => filterPosts(state.postReducer.post, search ));
  const active = useSelector((state) => state.postReducer.postContent);
  
  return (
    
    <Grid container spacing={3} className="pray-list-container">
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={"center"} mt={2}>
            <Box>
              <Typography variant="h3">
              기도 목록 &nbsp;
                <Chip label={getPosts.length} color="secondary" size="small" />
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
        
        
{getPosts.map((post) => {
  
  const handleRenderCard = () => {
    const contentHeight = viewType === 'list' 
      ? '2.85rem' 
      : viewType === 'grid' 
      ? '190px' 
      : ''; // viewType === 'full'일 경우 빈 문자열
    const gridHeight = viewType === 'list' 
    ? '' 
    : viewType === 'grid' 
    ? '260px' 
    : ''; 

    return (
    <BlankCard className="hoverCard">
      <Box>
        <Box
          p={2}
          px={3}
          sx={{
            position: "relative",
            cursor: "pointer",
            mt: 0,
            mb: 0,
            transition: "0.1s ease-in",
            backgroundColor: `${post.color}.light`,
            overflow: "hidden",
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxHeight: gridHeight,
          }}
        >
          <div
            className="contents"
            style={{ overflow: "hidden", height: contentHeight }}
            onClick={() => handleCardMediaClick(post.p_no)}
          >
            {parse(post.contents)}
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="caption">
              {post.r_date}
            </Typography>
            <div>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  size="small"
                  onClick={() => {
                    dispatch(SelectPost(post.p_no));
                    handleOpenEdit();
                  }}
                >
                  <IconEdit width={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => dispatch(deletePost(post.p_no))}
                >
                  <IconTrash width={18} />
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
        </Box>
      </Box>

      <>
      {post.p_no === openDialogId && (
        <DetailDialog p_no={post.p_no} onClose={handleDialogClose} />
      )}
      </>

      <>
      {post.p_no === active && (
        <UpdatePostDialog open={openEdit} onClose={handleCloseEdit} />
      )}
      </>

    </BlankCard>
    );
  };

  return (
    <>
      {viewType === 'list' && (
        <Grid item xs={12} lg={12} key={post.p_no}>
          {handleRenderCard()}
        </Grid>
      )}
      {viewType === 'grid' && (
        <Grid item xs={12} lg={4} key={post.p_no}>
          {handleRenderCard()}
        </Grid>
      )}
      {viewType === 'full' && (
        <Grid item xs={12} lg={12} key={post.p_no}>
          {handleRenderCard()}
        </Grid>
      )}
    </>
  );
})}

        
        </>
      )}
      
      </Grid>
  );
};

export default Listing;