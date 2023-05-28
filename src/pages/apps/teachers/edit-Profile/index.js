import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Grid,
  FormControl,
  FormControlLabel,
  Typography,
  TextField,
  Avatar,
  Button,
  RadioGroup,
  Radio,
  InputAdornment,
  Select,
  MenuItem
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TagsInput } from 'react-tag-input-component'

import { updateTeacher } from 'src/store/apps/teachers'

const Teacher_Edit_Profile = () => {
  const [value, setValue] = useState(null)

  const [language, setLanguage] = useState(['English'])

  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [experience, setExperience] = useState('')
  const [qualification, setQualification] = useState('')
  const [subject, setSubject] = useState('')
  const [section, setSection] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [employeeType, setEmployeeType] = useState('')
  const [country, setCountry] = useState('USA')

  const dispatch = useDispatch()

  const teacherId = useSelector(state => state.teachers.selectedTeacherId) // Assuming you have a selectedTeacherId state in your Redux store

  // useEffect(() => {
  //   const fetchTeacherData = async () => {
  //     try {
  //       const teacher = await fetchTeacherById(teacherId) // Fetch teacher data by ID using the service function
  //       // Update the state with the fetched teacher data
  //       setFullName(teacher.fullName)
  //       setGender(teacher.gender)
  //       setAge(teacher.age)
  //       setDateOfBirth(teacher.dateOfBirth)
  //       setAddress(teacher.address)
  //       setEmail(teacher.email)
  //       setExperience(teacher.experience)
  //       setQualification(teacher.qualification)
  //       setSubject(teacher.subject)
  //       setSection(teacher.section)
  //       setMobileNo(teacher.mobileNo)
  //       setEmployeeType(teacher.employeeType)
  //       setCountry(teacher.country)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   if (teacherId) {
  //     fetchTeacherData()
  //   }
  // }, [teacherId])

  const handleSave = () => {
    const teacherData = {
      value,
      subject,
      language,
      gender,
      mobileNo,
      email,
      address,
      employeeType,
      qualification,
      experience,
      country
    }
    dispatch(updateTeacher(teacherData))
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card fullwidth sx={{ borderRadius: 3 }}>
        <CardHeader
          avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
          title='Edit Teacher Profile'
        />
        <CardContent fullwidth>
          <FormControl fullWidth>
            <Grid container spacing={2} sx={{ p: 4 }}>
              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Full Name</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField variant='outlined' fullWidth value={fullName} onChange={e => setFullName(e.target.value)} />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Gender</Typography>
              </Grid>
              <Grid item xs={10}>
                <RadioGroup row value={gender} onChange={e => setGender(e.target.value)}>
                  <FormControlLabel value='male' control={<Radio />} label='Male' />
                  <FormControlLabel value='female' control={<Radio />} label='Female' />
                </RadioGroup>
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Age</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField variant='outlined' fullWidth value={age} onChange={e => setAge(e.target.value)} />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Date of Birth</Typography>
              </Grid>
              <Grid item xs={10}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dateOfBirth}
                    onChange={newValue => setDateOfBirth(newValue)}
                    renderInput={params => <TextField {...params} variant='outlined' fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Address</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField variant='outlined' fullWidth value={address} onChange={e => setAddress(e.target.value)} />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField variant='outlined' fullWidth value={email} onChange={e => setEmail(e.target.value)} />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Experience</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant='outlined'
                  fullWidth
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Qualification</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant='outlined'
                  fullWidth
                  value={qualification}
                  onChange={e => setQualification(e.target.value)}
                />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Subject</Typography>
              </Grid>
              <Grid item xs={10}>
                <TagsInput value={subject} onChange={newTags => setSubject(newTags)} />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Section</Typography>
              </Grid>
              <Grid item xs={10}>
                <Select variant='outlined' fullWidth value={section} onChange={e => setSection(e.target.value)}>
                  <MenuItem value='A'>A</MenuItem>
                  <MenuItem value='B'>B</MenuItem>
                  <MenuItem value='C'>C</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Mobile No</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant='outlined'
                  fullWidth
                  value={mobileNo}
                  onChange={e => setMobileNo(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>+1</InputAdornment>
                  }}
                />
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Employee Type</Typography>
              </Grid>
              <Grid item xs={10}>
                <RadioGroup row value={employeeType} onChange={e => setEmployeeType(e.target.value)}>
                  <FormControlLabel value='fullTime' control={<Radio />} label='Full Time' />
                  <FormControlLabel value='partTime' control={<Radio />} label='Part Time' />
                </RadioGroup>
              </Grid>

              <Grid item xs={2} sx={{ p: 3 }}>
                <Typography>Country</Typography>
              </Grid>
              <Grid item xs={10}>
                <Select variant='outlined' fullWidth value={country} onChange={e => setCountry(e.target.value)}>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='Canada'>Canada</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <Button variant='contained' color='primary' onClick={handleSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Teacher_Edit_Profile
