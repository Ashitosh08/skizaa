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
import { useState } from 'react'


const attendanceData = [
  {
    title: "Total Attendance",
    totalTeacher: 144,
    absentTeachers: 30,
    totalStudents: 600,
    absentStudents: 100
  }
]

const attendedTeacher = attendanceData.map((teacher) => {
  return (teacher.totalTeacher - teacher.absentTeachers)
})

const attendedStudent = attendanceData.map((student) => {
  return (student.totalStudents - student.absentStudents)
})

const totalAttendance = () => {

  return attendanceData.map((attendance, index) => (
    <Card key={index}>
      <CardHeader
        title={attendance.title}
        sx={{ fontSize: 16}}
      />
      <CardContent>
        <Box sx={{ mb: 1.5, rowGap: 1, width: '50%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Grid container>
            <Grid xs={8}>
              <Typography sx={{ fontWeight: 550, color: "#34a2eb" }}>Total Teachers:</Typography>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ mr: 1.5, fontWeight: 550, color: "#34a2eb" }}>
                {attendance.totalTeacher}</Typography>
            </Grid>
          </Grid>
          <Grid xs={8}>
            <Typography sx={{ mr: 1.5, fontWeight: 550 }}>
              Present teachers:
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography sx={{ mr: 1.5, fontWeight: 550 }}>
              {attendedTeacher}
            </Typography>
          </Grid>
          <Grid xs={8}>
            <Typography sx={{ mr: 1.5, fontWeight: 550, color: "#34a2eb", fontWeight: 'bold' }}>
              Total Students:
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography sx={{ mr: 1.5, fontWeight: 550, color: "#34a2eb", fontWeight: 'bold' }}>
              {attendance.totalStudents}
            </Typography>
          </Grid>
          <Grid xs={8}>
            <Typography sx={{ mr: 1.5, fontWeight: 550 }}>
              Present students:
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography sx={{ mr: 1.5, fontWeight: 550 }}>
              {attendedStudent}
            </Typography>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  ))
}

export default totalAttendance

// const CrmTotalSales = () => {
//   // ** Hook
//   const theme = useTheme()

//   const options = {
//     chart: {
//       parentHeightOffset: 0,
//       toolbar: { show: false }
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         opacityTo: 0.2,
//         opacityFrom: 1,
//         shadeIntensity: 0,
//         type: 'horizontal',
//         stops: [0, 100, 100]
//       }
//     },
//     stroke: {
//       width: 5,
//       curve: 'smooth',
//       lineCap: 'round'
//     },
//     legend: { show: false },
//     colors: [theme.palette.success.main],
//     grid: {
//       show: false,
//       padding: {
//         left: 0,
//         right: 0,
//         bottom: -10
//       }
//     },
//     xaxis: {
//       axisTicks: { show: false },
//       axisBorder: { show: false },
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//       labels: {
//         style: {
//           fontSize: '0.875rem',
//           colors: theme.palette.text.disabled
//         }
//       }
//     },
//     yaxis: {
//       labels: { show: false }
//     }
//   }

//   return (
//     <Card>
//       <CardHeader
//         title='Total Sales'
//         subheader='$21,845'
//         subheaderTypographyProps={{
//           sx: { mt: 1, fontWeight: 500, lineHeight: '2rem', color: 'text.primary', fontSize: '1.25rem !important' }
//         }}
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
//         <ReactApexcharts
//           type='line'
//           height={206}
//           options={options}
//           series={[{ name: 'Total Sales', data: [0, 258, 30, 240, 150, 400] }]}
//         />
//       </CardContent>
//     </Card>
//   )
// }

// export default CrmTotalSales
