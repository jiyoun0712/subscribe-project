import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconArrowBackUp, IconCircle } from '@tabler/icons-react';
import { CommentType } from '../../../../(DashboardLayout)/types/apps/post';

const PostComment = ({ comment }: CommentType | any) => {
  const [showReply, setShowReply] = React.useState(false);

  return (
    <>
      <Box mt={2} p={3} sx={{ backgroundColor: 'grey.100' }}>
        <Stack direction={'row'} gap={2} alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src='/images/profile/user-1.jpg'
            sx={{ width: '33px', height: '33px' }}
          />
          <Typography variant="h6">{comment?.user_name}</Typography>
          <Typography variant="caption" color="textSecondary">
            <>
              <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
              {comment?.r_date}
            </>
          </Typography>
        </Stack>
        <Box py={2}>
          <Typography color="textSecondary">{comment?.contents}</Typography>
        </Box>
     
      </Box>
    
     
    </>
  );
};

export default PostComment;
