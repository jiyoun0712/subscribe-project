/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect } from "react";
import { fetchPosts } from "@/store/apps/feed/FeedSlice";
import { useRouter, usePathname, useSearchParams  } from "next/navigation";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import {
  IconEye,
  IconMessage2,
  IconPoint,
  IconQuote,
} from "@tabler/icons-react";
import { format } from "date-fns";
//import BlogComment from "./BlogComment";
import { uniqueId } from "lodash";
import { addComment } from "@/store/apps/feed/FeedSlice";
import BlankCard from "../../../../shared/BlankCard";
import { useDispatch, useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import type { PostImageType, PostDataType } from "../../../../../(DashboardLayout)/types/apps/feed";


const PrayerDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
  
  //const getTitle: number | any = pathName.split('/').pop();
  const getTitle: number | any = Number(pathName.split('/').pop());
  
  const [replyTxt, setReplyTxt] = React.useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

 

  // Get post
  const getPost = useSelector((state: AppState) => state.feedReducer.posts);
  

  const post: PostDataType | any = getPost.find(
    (p: PostDataType) => getTitle === p.id
  );


  

  
  const BCrumb = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/apps/feed/prayerlist",
      title: "기도리스트",
    },
    {
      title: "기도 상세보기",
    },
  ];

  {/*
  const onSubmit = async (id: number, reply: string) => {
    const replyId: string = uniqueId("#comm_");
    const newReply = {
      id: replyId,
      profile: {
        id: uniqueId("#REPLY_"),
        avatar: post?.author.avatar,
        name: post?.author.name,
        time: "now",
      },
      comment: reply,
      replies: [],
    };
    dispatch(addComment(id, newReply));
    dispatch(fetchPosts(getTitle));
    setReplyTxt("");
  };
  */}

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
    <Box>
      <Breadcrumb title="Prayer Detail" items={BCrumb} />
      {post ? (
        <>
          <BlankCard>
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
              <CardContent>
                <Stack direction="row" sx={{ marginTop: "-45px" }}>
                  <Tooltip
                    title={post ? post?.profile.name : ""}
                    placement="top"
                  >
                    <Avatar
                      aria-label="recipe"
                      src={post?.profile.avatar}
                    ></Avatar>
                  </Tooltip>
                
                </Stack>
                <Chip
                  label={post?.type}
                  size="small"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                ></Chip>
                
                <Stack direction="row" gap={3} alignItems="center">
                  <Stack direction="row" gap={1} alignItems="center">
                    <IconEye size="18" /> {post?.data.view}
                  </Stack>
                  <Stack direction="row" gap={1} alignItems="center">
                    <IconMessage2 size="18" /> {post?.data.comments.length}
                  </Stack>

                  <Stack direction="row" ml="auto" alignItems="center">
                    <IconPoint size="16" />
                    <small>
                      {post ? (
                        <>{format(new Date(post.data.createdAt), "E, MMM d")}</>
                      ) : (
                        ""
                      )}
                    </small>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography variant="h2">{post?.profile.name}</Typography>
                <p>
                {convertNewlineToBreak(post?.data.content)}
                </p>
                
              </CardContent>
            </>
          </BlankCard>
          
        </>
      ) : (
        "No found"
      )}
    </Box>
  );
};

export default PrayerDetail;
