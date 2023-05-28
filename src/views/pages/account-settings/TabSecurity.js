// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components
import ChangePasswordCard from 'src/views/pages/account-settings/security/ChangePasswordCard'
import TwoFactorAuthentication from 'src/views/pages/account-settings/security/TwoFactorAuthentication'

const TabSecurity = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard />
      </Grid>
      <Grid item xs={12}>
        <TwoFactorAuthentication />
      </Grid>
    </Grid>
  )
}

export default TabSecurity
