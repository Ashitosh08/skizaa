// ** MUI Import
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

// Styled Timeline component
const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const CrmActivityTimeline = () => {
  return (
    <Card>
      <CardHeader
        title='School Activity'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
      />
      <CardContent>
        <Timeline sx={{ my: 0, py: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0, mt: 0, mb: theme => `${theme.spacing(1.5)} !important` }}>
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 550, color: 'text.primary' }}>
                  Special Class Schedule
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Monday&nbsp;4pm - 5pm
                </Typography>
              </Box>
              <Typography variant='body2'>Voluptate ipsum reprehenderit aliquip reprehenderit sunt aute sint laborum pariatur cillum fugiat.</Typography>
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                
                <Typography variant='subtitle2' sx={{ ml: 2, fontWeight: 600 }}>
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0, mt: 0, mb: theme => `${theme.spacing(1.5)} !important` }}>
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  Class Test
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Wednesday&nbsp;3.30pm - 4pm
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
              Cillum ad incididunt officia occaecat irure eu laborum laboris esse.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}></Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0, mt: 0, mb: theme => `${theme.spacing(1.5)} !important` }}>
              <Box
                sx={{
                  mb: 2.5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                  Special Event
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Saturday 11am - 12.30pm
                </Typography>
              </Box>
              <Typography variant='body2'>Adipisicing nostrud irure occaecat ea qui tempor incididunt voluptate.</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default CrmActivityTimeline
