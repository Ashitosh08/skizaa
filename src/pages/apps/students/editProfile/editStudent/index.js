import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Select,
  TextField,
  Grid,
  FormControl,
  Typography,
  Avatar,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  InputLabel
} from '@mui/material'
import { useRouter } from 'next/router'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { fetchStudents, updateStudent } from 'src/store/apps/student'
import { useDispatch, useSelector } from 'react-redux'

const Student_Prof = () => {
  const [student, setStudent] = useState(null)
  const [fullName, setFullName] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [gender, setGender] = useState('male')
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [rollNo, setRollNo] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    const fetchStudentData = async () => {
      const studentId = router.query.id
      try {
        const response = await fetch(`http://localhost:1337/api/students/${studentId}`)
        const data = await response.json()
        setStudent(data.data.attributes)
        setFullName(data.data.attributes.studentName)
        setProfilePhoto(data.data.attributes.avatarUrl)
        setGender(data.data.attributes.gender)
        setDateOfBirth(new Date(data.data.attributes.dateOfBirth))
        setRollNo(data.data.attributes.rollNo)
        setSelectedClass(data.data.attributes.class)
        setSelectedCountry(data.data.attributes.country)
        setAddress(data.data.attributes.address)
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    fetchStudentData()
  }, [router.query.id])

  const handleSave = async () => {
    const studentId = router.query.id

    const updatedUser = {
      id: studentId,
      studentName: fullName,
      avatarUrl: profilePhoto,
      gender: gender,
      dateOfBirth: dateOfBirth.toISOString(),
      rollNo: rollNo,
      class: selectedClass,
      country: selectedCountry,
      address: address
    }

    await dispatch(updateStudent({ id: studentId, data: updatedUser }))
    router.push(`/apps/students/editProfile/?id=${id}`)
  }

  const handleClassChange = event => {
    setSelectedClass(event.target.value)
  }

  const handleCountryChange = event => {
    setSelectedCountry(event.target.value)
  }

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card>
        <CardHeader
          avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
          title='Edit Student Profile'
        />
        <CardContent>
          <Grid container>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Full Name</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField size='small' value={fullName} onChange={e => setFullName(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Profile Photo</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField size='small' value={profilePhoto} onChange={e => setProfilePhoto(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Gender</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl component='fieldset'>
                <RadioGroup row value={gender} onChange={e => setGender(e.target.value)}>
                  <FormControlLabel value='male' control={<Radio />} label='Male' />
                  <FormControlLabel value='female' control={<Radio />} label='Female' />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Date of Birth</Typography>
            </Grid>
            <Grid item xs={10}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dateOfBirth}
                  onChange={newValue => setDateOfBirth(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Roll No</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField size='small' value={rollNo} onChange={e => setRollNo(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Class</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <Select value={selectedClass} onChange={handleClassChange}>
                  <MenuItem value='class 1'>Class 1</MenuItem>
                  <MenuItem value='class 2'>Class 2</MenuItem>
                  <MenuItem value='class 3'>Class 3</MenuItem>
                  {/* Add other class options */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Country</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <Select value={selectedCountry} onChange={handleCountryChange}>
                  <MenuItem value='country 1'>Country 1</MenuItem>
                  <MenuItem value='country 2'>Country 2</MenuItem>
                  <MenuItem value='country 3'>Country 3</MenuItem>
                  {/* Add other country options */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={2}>
              <Typography sx={{ pt: 2 }}>Address</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <TextField multiline rows={4} value={address} onChange={e => setAddress(e.target.value)} />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' color='primary' onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Student_Prof
