import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Modal,
  TextField,
  Grid,
  FormControl
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Close } from '@mui/icons-material'
import School_main from 'src/pages/utils/schoolTable'
import { useDispatch, useSelector } from 'react-redux'
import { createSchool, fetchSchools } from 'src/store/apps/schools'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const School_home = () => {
  const [open, setOpen] = useState(false)
  const [orgId, setOrgId] = useState('')
  const [grade, setGrade] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [location, setLocation] = useState('')
  const [facultyStrength, setFacultyStrength] = useState('')
  const [studentStrength, setStudentStrength] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [paymentTenure, setPaymentTenure] = useState('')

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const { schools, loading, error } = useSelector(state => state.schools)
  const dispatch = useDispatch()

  const handleCreateSchool = async () => {
    const userData = {
      data: {
        schoolName: schoolName,
        location: location,
        contactNumber: contactNumber,
        facultyStrength: facultyStrength,
        studentStrength: studentStrength,
        paymentTenure: paymentTenure
      }
    }

    try {
      // Dispatch the createUser action
      await dispatch(createSchool(userData))

      // Reset the form fields
      setSchoolName('')
      setLocation('')
      setFacultyStrength('')
      setStudentStrength('')
      setContactNumber('')
      setPaymentTenure('')

      dispatch(fetchSchools())
      handleClose()
    } catch (error) {
      console.log('Failed to create user:', error)
    }
  }

  const handleChange = event => {
    setOrgId(event.target.value)
  }

  const handleGradeChange = event => {
    setGrade(event.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card>
        <CardHeader
          avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
          action={
            <Button variant='contained' onClick={handleOpen}>
              Create School
            </Button>
          }
        />
        <CardContent>
          <School_main></School_main>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card>
            <CardHeader
              title='Create School details'
              action={
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => {
                    handleClose('create')
                  }}
                >
                  <Close />
                </Button>
              }
            />
            <CardContent>
              <Grid container>
                <Grid xs={4}>
                  <Typography sx={{ pt: 2 }}>Organization ID</Typography>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth sx={{ pl: 4 }}>
                    <InputLabel id='demo-simple-select-label' size='small'></InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={orgId}
                      onChange={handleChange}
                      size='small'
                    >
                      <MenuItem value={10}>IOAM221A001</MenuItem>
                      <MenuItem value={20}>IEAN222A002</MenuItem>
                      <MenuItem value={30}>IMAK223A003</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 4 }}>School Name</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter school name'
                      value={schoolName}
                      onChange={e => setSchoolName(e.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Address</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter school address'
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Faculty Strength</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      type='number'
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter faculty strength'
                      value={facultyStrength}
                      onChange={e => setFacultyStrength(e.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Student Strength</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      type='number'
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter student strength'
                      value={studentStrength}
                      onChange={e => setStudentStrength(e.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Contact Number</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      type='number'
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter contact number'
                      value={contactNumber}
                      onChange={e => setContactNumber(e.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Payment Tenure</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4, pb: 4 }}
                      placeholder='Enter payment tenure'
                      value={paymentTenure}
                      onChange={e => setPaymentTenure(e.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid xs={4}>
                  <Typography sx={{ pt: 2 }}>Total grades</Typography>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth sx={{ pl: 4 }}>
                    <InputLabel id='demo-simple-select-label' size='small'></InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={grade}
                      onChange={handleGradeChange}
                      size='small'
                    >
                      <MenuItem value={10}>Grade 1</MenuItem>
                      <MenuItem value={20}>Grade 2</MenuItem>
                      <MenuItem value={30}>Grade 3</MenuItem>
                      <MenuItem value={40}>Grade 4</MenuItem>
                      <MenuItem value={50}>Grade 5</MenuItem>
                      <MenuItem value={60}>Grade 6</MenuItem>
                      <MenuItem value={70}>Grade 7</MenuItem>
                      <MenuItem value={80}>Grade 8</MenuItem>
                      <MenuItem value={90}>Grade 9</MenuItem>
                      <MenuItem value={100}>Grade 10</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Button variant='contained' onClick={handleCreateSchool}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  )
}

export default School_home
