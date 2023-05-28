// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled component for the image
const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const CardStatsCharacter = ({ data }) => {
  // ** Vars
  const { title, totCount,value,performer,chipText, src, subTitle,stats, trendNumber, trend = 'positive', chipColor = 'primary' } = data

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ mb: 5.5, fontWeight: 500 }}>{title}</Typography>
        <Box sx={{ mb: 1.5, rowGap: 1, width: '65%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Typography  sx={{ mr: 1.5 ,fontWeight:550}}>
            {subTitle}:&nbsp;&nbsp;{totCount}
          </Typography>
          <Typography

            // sx={{ color: trend === 'negative' ? 'error.main' : 'success.main' }}
            
            sx={{color:"#34a2eb",fontWeight:'bold'}}
          >
            {value}:&nbsp;&nbsp;{performer}
            </Typography>
        </Box>
        {/* <CustomChip
          size='small'
          skin='light'
          label={chipText}
          color={chipColor}
          sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
        /> */}
        <Img src={src} alt={title} />
      </CardContent>
    </Card>
  )
}

export default CardStatsCharacter
