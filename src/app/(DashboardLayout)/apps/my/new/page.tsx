"use client"

import Grid from '@mui/material/Grid'
import PageContainer from '@/app/components/container/PageContainer';

import NewPrayer from '@/app/components/apps/my/NewPrayer';

const PrayerList = () => {
  return (
    <PageContainer title="Profile" description="this is Profile">

      <Grid container spacing={3}>
        
        {/* Posts Card */}
        <Grid item sm={12} lg={8} xs={12}>
          <NewPrayer />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PrayerList;
