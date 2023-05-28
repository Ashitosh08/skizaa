// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports

import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const schoolReport = [
  {
    title: "School Report",
    paymentHistory: [
      {
        paidAmount: '5000$',
        date: '20/3/2000'
      }
    ],
    onBoardingDate: '10/06/2000',
    status: 'Active',
    schoolList: [{
      numberOfSchool: 450,
      facultyStrength: 144,
      studentStrength: 600
    }]
  }
]

const school_report = () => {

  return schoolReport.map((report) => (
    report.paymentHistory.map((paymentHistory, index) => (
      <Card key={index}>
        <CardHeader
          title={report.title}
        />
        <CardContent>
          <Box sx={{ mb: 1.5, rowGap: 1, width: '50%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Grid xs={6}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, fontWeight: 'bold' }}>
                Paid Amount:
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, fontWeight: 'bold' }}>
                {paymentHistory.paidAmount}
              </Typography>
            </Grid>
            <Grid xs={4.5}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, fontWeight: 'bold' }}>
                Paid Date:
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, fontWeight: 'bold' }}>
                {paymentHistory.date}
              </Typography>
            </Grid>
            <Grid xs={7.5}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, fontWeight: 'bold' }}>
                Onboarding Date:
              </Typography>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, fontWeight: 'bold' }}>
                {report.onBoardingDate}
              </Typography>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    ))
  )
  )
}

export default school_report

// const series = [
//   {
//     name: 'Earning',
//     data: [95, 177, 284, 256, 105, 63, 168, 218, 72]
//   },
//   {
//     name: 'Expense',
//     data: [-145, -80, -60, -180, -100, -60, -85, -75, -100]
//   }
// ]

// const CrmRevenueReport = () => {
//   // ** Hook
//   const theme = useTheme()

//   const options = {
//     chart: {
//       stacked: true,
//       parentHeightOffset: 0,
//       toolbar: { show: false }
//     },
//     grid: {
//       yaxis: {
//         lines: { show: false }
//       },
//       padding: {
//         left: 0,
//         right: 0
//       }
//     },
//     legend: {
//       offsetY: 8,
//       markers: { radius: 15 },
//       labels: { colors: theme.palette.text.secondary }
//     },
//     stroke: {
//       width: 2,
//       colors: [theme.palette.background.paper]
//     },
//     dataLabels: { enabled: false },
//     colors: [theme.palette.success.main, theme.palette.secondary.main],
//     plotOptions: {
//       bar: {
//         borderRadius: 8,
//         columnWidth: '50%',
//         endingShape: 'rounded',
//         startingShape: 'rounded'
//       }
//     },
//     states: {
//       hover: {
//         filter: { type: 'none' }
//       },
//       active: {
//         filter: { type: 'none' }
//       }
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//       labels: {
//         show: false
//       },
//       axisTicks: {
//         show: false
//       },
//       axisBorder: {
//         show: false
//       }
//     },
//     yaxis: {
//       labels: { show: false }
//     }
//   }

//   return (
//     <Card>
//       <CardHeader
//         title='Revenue Report'
//         action={
//           <OptionsMenu
//             options={['Last 28 Days', 'Last Month', 'Last Year']}
//             iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
//           />
//         }
//         titleTypographyProps={{
//           sx: {
//             fontSize: '1rem !important',
//             fontWeight: '600 !important',
//             lineHeight: '1.5rem !important',
//             letterSpacing: '0.15px !important'
//           }
//         }}
//       />
//       <CardContent>
//         <ReactApexcharts type='bar' height={240} series={series} options={options} />
//       </CardContent>
//     </Card>
//   )
// }

// export default CrmRevenueReport
