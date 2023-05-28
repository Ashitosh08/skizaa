import React, { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { Grid, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material'

const notifications = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const shortcuts = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    subtitle: 'Appointments',
    icon: 'mdi:calendar-month-outline'
  },
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    subtitle: 'Manage Accounts',
    icon: 'mdi:receipt-text-outline'
  },
  {
    title: 'Users',
    url: '/apps/user/list',
    subtitle: 'Manage Users',
    icon: 'mdi:account-outline'
  },
  {
    url: '/apps/roles',
    title: 'Role Management',
    subtitle: 'Permissions',
    icon: 'mdi:shield-check-outline'
  },
  {
    url: '/',
    title: 'Dashboard',
    icon: 'mdi:chart-pie',
    subtitle: 'User Dashboard'
  },
  {
    title: 'Settings',
    icon: 'mdi:cog-outline',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    title: 'Help Center',
    subtitle: 'FAQs & Articles',
    icon: 'mdi:help-circle-outline',
    url: '/pages/help-center'
  },
  {
    title: 'Dialogs',
    subtitle: 'Useful Dialogs',
    icon: 'mdi:window-maximize',
    url: '/pages/dialog-examples'
  }
]

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [org, setOrg] = useState('');
  const [school, setSchool] = useState('');

  const handleSelect = (event, id) => {
    if(id === 'org-selection') {
      setOrg(event.target.value)
    } else if(id === "school-selection") {
      setSchool(event.target.value)
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid container>
        <Grid xs={3}>
          <Box sx={{ display: 'flex' }}>
            <Grid container>
              <Grid xs={4}>
                <Typography sx={{ pt: 2 }}>Organization</Typography>
              </Grid>
              <Grid xs={7}>
                <FormControl fullWidth>
                  <InputLabel id="org-select" size="small">Select Organization</InputLabel>
                  <Select
                    labelId='org-select'
                    id='select-org'
                    value={org}
                    label="Select Organization"
                    onChange={(e) => {
                      handleSelect(e, 'org-selection')
                    }}
                    size="small"
                  >
                    <MenuItem value={"NGO"}>NGO</MenuItem>
                    <MenuItem value={"Org1"}>Org1</MenuItem>
                    <MenuItem value={"Org2"}>Org2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={3}>
          <Box sx={{ display: 'flex' }}>
            <Grid container>
              <Grid xs={3}>
                <Typography sx={{ pt: 2 }}>School</Typography>
              </Grid>
              <Grid xs={8}>
                <FormControl fullWidth>
                  <InputLabel id="org-school" size="small">Select School</InputLabel>
                  <Select
                    labelId='school-select'
                    id='select-school'
                    value={school}
                    label="Select School"
                    onChange={(e) => {
                      handleSelect(e, 'school-selection')
                    }}
                    size="small"
                  >
                    <MenuItem value={"School1"}>School 1</MenuItem>
                    <MenuItem value={"School2"}>School 2</MenuItem>
                    <MenuItem value={"School3"}>School 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid >
        <Grid xs={4}>
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {hidden && !settings.navHidden ? (
              <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                <Icon icon='mdi:menu' />
              </IconButton>
            ) : null}
            <Autocomplete hidden={hidden} settings={settings} />
          </Box>
        </Grid>
        <Grid xs={2}>
          <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
            <ModeToggler settings={settings} saveSettings={saveSettings} />
            <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
            <NotificationDropdown settings={settings} notifications={notifications} />
            <UserDropdown settings={settings} />
          </Box>
        </Grid>
      </Grid >
    </Box >
  )
}

export default AppBarContent
