'use client'

import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';

import Post from '@/app/components/apps/userprofile/profile/Post';

export default function Dashboard (){

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid container spacing={2}>
        
        {/* Posts Card */}
        <Grid item sm={12} lg={8} xs={12}>
          <Post />
        </Grid>

        
      </Grid>

    </PageContainer>
  )
}

