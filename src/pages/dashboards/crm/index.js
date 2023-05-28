// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmTotalSales from 'src/views/dashboards/crm/CrmTotalSales'
import CrmWeeklySales from 'src/views/dashboards/crm/CrmWeeklySales'
import RedZone from 'src/views/dashboards/crm/redZone'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'

// import CrmUpgradePlan from 'src/views/dashboards/crm/CrmUpgradePlan'

import CrmTransactions from 'src/views/dashboards/crm/CrmTransactions'
import CrmRevenueReport from 'src/views/dashboards/crm/CrmRevenueReport'

// import CrmSalesOverview from 'src/views/dashboards/crm/CrmSalesOverview'

// import CrmMeetingSchedule from 'src/views/dashboards/crm/CrmMeetingSchedule'
// import CrmDeveloperMeetup from 'src/views/dashboards/crm/CrmDeveloperMeetup'

import CrmActivityTimeline from 'src/views/dashboards/crm/CrmActivityTimeline'

const data = [
  {
    title: 'Teachers Overview',
    subTitle: 'Total Teachers',
    value: 'MVT',
    performer:'Teacher 1',
    totCount:133,
    
    // trendNumber: '+38%',
    // chipColor: 'primary',
    // chipText: 'Year of 2022',
    src: '/images/cards/pose_f9.png'
  },
  {
    // stats: '24.5k',
    // trend: 'negative',
    // title: 'Sessions',
    // trendNumber: '-22%',
    // chipText: 'Last Week',
    // chipColor: 'secondary',
    title: 'Students Overview',
    subTitle: 'Total Students',
    value: 'MVS',
    performer: 'Student 1',
    totCount: 600,
    src: '/images/cards/pose_m18.png'
  }
]

const CRMDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[0]} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatisticsCharacter data={data[1]} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }} >
          <CrmTransactions />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CrmTotalSales />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CrmRevenueReport />
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <CrmSalesOverview />
        </Grid> */}

        <Grid item xs={12} md={6}>
          <CrmActivityTimeline />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={8}>
              <RedZone />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={6}>
                <Grid item xs={6} sm={12}>
                  <CrmTotalGrowth />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <CardStatisticsVerticalComponent
                    stats='862'
                    trend='negative'
                    trendNumber='-18%'
                    title='New Project'
                    subtitle='Yearly Project'
                    icon={<Icon icon='mdi:briefcase-variant-outline' />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <CrmUpgradePlan />
        </Grid> */}
        {/* <Grid item xs={12} md={6} lg={4}>
          <CrmMeetingSchedule />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmDeveloperMeetup />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default CRMDashboard
