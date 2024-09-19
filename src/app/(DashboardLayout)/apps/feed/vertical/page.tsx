"use client"

import Grid from '@mui/material/Grid'
import PageContainer from '@/app/components/container/PageContainer';

import Post from '@/app/components/apps/feed/vertical/Listing';

const PrayerList = () => {
  return (
    <PageContainer title="Profile" description="this is Profile">

      <Grid container>
        
        {/* Posts Card */}
        <Grid item sm={12} lg={8} xs={12}>
          <Post />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PrayerList;
