'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';


export default function Dashboard (){

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
        <div>
        9,876,543,210 $&@ roboto ROBOTO  qwertyg 노토산스 글씨입니다.
        <p className="font-roboto">9,876,543,210 $&@ roboto ROBOTO qwertyg 로보토입니다.</p>
        <p className="not-roboto">이 문장은  9,876,543,210 $&@ roboto ROBOTO  qwertyg 노토산스로만 설정된 글씨입니다.</p>

        모든 사람은 사상, 양심 및 종교의 자유에 대한 권리를 가진다. 이러한 권리는 종교 또는 신념을 변경할 자유와, 단독으로 또는 다른 사람과 공동으로 그리고 공적으로 또는 사적으로 선교, 행사, 예배 및 의식에 의하여 자신의 종교나 신념을 표명하는 자유를 포함한다..
        </div>

    </PageContainer>
  )
}

