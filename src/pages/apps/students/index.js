import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Modal,
  FromControl,
  Button,
  Grid,
  FormControl,
  TextField
} from '@mui/material'
import Student_Table from 'src/pages/apps/students/student_table'
import { Close } from '@mui/icons-material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  display: 'block',
  height: '70%'
}

const Students_home = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader action={<Button onClick={handleOpen}>Add New Student</Button>} />
        <CardContent>
          <Student_Table></Student_Table>
        </CardContent>
      </Card>
      <Modal open={openModal} aria-labelledby='new-teacher-modal' aria-describedby='teacher-new'>
        <Box sx={style}>
          <Card sx={{ overflowY: 'scroll', height: '100%' }}>
            <CardHeader
              sx={{ textAlign: 'center' }}
              avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
              title='Personnel Details'
              action={
                <Button onClick={handleClose}>
                  <Close />
                </Button>
              }
            />
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Full Name</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Guardian's Name</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Mobile Number</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Email Id</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Address</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small' multiline></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>D.O.B</Typography>
                </Grid>
                <Grid xs={3}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2, pl: 6 }}>Gender</Typography>
                </Grid>
                <Grid xs={3}>
                  <FormControl fullWidth>
                    <TextField size='small' multiline></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardHeader
              sx={{ textAlign: 'center' }}
              avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
              title='Admission Details'
            />
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Student Id</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small' disabled></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography>Registrarion Number</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField size='small' disabled></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Class</Typography>
                </Grid>
                <Grid xs={3}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2, pl: 6 }}>Section</Typography>
                </Grid>
                <Grid xs={3}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Roll No</Typography>
                </Grid>
                <Grid xs={3}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2, pl: 6 }}>Teacher</Typography>
                </Grid>
                <Grid xs={3}>
                  <FormControl fullWidth>
                    <TextField size='small'></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={6}>
                  <FormControl fullWidth>
                    <Button variant='contained'>Save</Button>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  )
}

export default Students_home
