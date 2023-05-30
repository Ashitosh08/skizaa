import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {
  Paper,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Button,
  Typography,
  Chip,
  Divider,
  Modal,
  FormControl,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
import { red } from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import { useRouter } from 'next/router'
import { MoreVert, Close } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTeachers, createTeacher, deleteTeacher } from 'src/store/apps/teachers'
import { add } from 'date-fns'
import axios from 'axios'

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

const Teachers_home = () => {
  const router = useRouter()
  const [openDelete, setOpenDelete] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
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
  const [employeeTypeEnum, setEmployeeTypeEnum] = useState([])
  const [qualificationEnum, setQualificationEnum] = useState([])
  const [selectedTeacherId, setSelectedTeacherId] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)

  const dispatch = useDispatch()
  const teachers = useSelector(state => state.teachers.teachers)

  useEffect(() => {
    dispatch(fetchTeachers()) // Dispatch the fetchTeachers action to fetch the data
  }, [dispatch])

  const handleCreateTeacher = async () => {
    const userData = {
      data: {
        fullName: fullName,
        gender: gender,
        age: age,
        dateOfBirth: dateOfBirth,
        address: address,
        email: email,
        experience: experience,
        qualification: qualification,
        subject: subject,
        section: section,
        mobileNo: mobileNo,
        employeeType: employeeType
      }
    }

    try {
      // Dispatch the createUser action
      await dispatch(createTeacher(userData))

      // Reset the form fields
      setFullName('')
      setGender('')
      setAge('')
      setDateOfBirth('')
      setAddress('')
      setEmail('')
      setExperience('')
      setQualification('')
      setSubject('')
      setSection('')
      setMobileNo('')
      setEmployeeType('')

      dispatch(fetchTeachers())
      handleClose()
    } catch (error) {
      console.log('Failed to create user:', error)
    }
  }

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/teachers') // Replace with your API endpoint
        console.log(response, 'response')

        const teachers = response.data.data.map(teacher => teacher.attributes)
        console.log(teachers, 'teachers')
        const qualifications = extractQualifications(teachers)
        const employeeTypes = extractEmployeeTypes(teachers)
        setQualificationEnum(qualifications)
        setEmployeeTypeEnum(employeeTypes)
        console.log(qualifications, 'qualifications')
        console.log(employeeTypes, 'employeeTypes')

        // Update the state or do further processing with qualifications and employeeTypes
      } catch (error) {
        console.error(error)
      }
    }

    fetchTeachers()
  }, [])

  const extractQualifications = teachers => {
    if (!Array.isArray(teachers)) {
      return [] // Return an empty array or handle the error appropriately
    }

    const qualifications = teachers.map(teacher => teacher.qualification)
    const uniqueQualifications = [...new Set(qualifications)]

    return uniqueQualifications
  }

  const extractEmployeeTypes = teachers => {
    if (!Array.isArray(teachers)) {
      return [] // Return an empty array or handle the error appropriately
    }

    const employeeTypes = teachers.map(teacher => teacher.employeeType)
    const uniqueEmployeeTypes = [...new Set(employeeTypes)]

    return uniqueEmployeeTypes
  }

  const handleQualificationChange = event => {
    setQualification(event.target.value)
  }

  const handleEmployeeTypeChange = event => {
    setEmployeeType(event.target.value)
  }

  const handleDeleteTeacher = async teacherId => {
    try {
      setUpdateLoading(true)
      await dispatch(deleteTeacher(teacherId))
      dispatch(fetchTeachers()) // Fetch updated teachers list
      setUpdateLoading(false)
      handleCloseDelete()
    } catch (error) {
      console.log('Failed to delete teacher:', error)
    }
  }

  const navigateToEditProfile = id => {
    router.push({
      pathname: 'teachers/edit-Profile',
      query: { id }
    })
  }

  const handleClick = (event, id) => {
    if (id === 'poper-open') {
      setAnchorEl(event.currentTarget)
    } else if (id === 'modal-open') {
      setOpenModal(true)
    }
  }

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card>
        <CardHeader
          avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
          title="Teacher's list"
          action={
            <Button
              onClick={e => {
                handleClick(e, 'modal-open')
              }}
            >
              Add New Teacher
            </Button>
          }
        />

        <CardContent>
          {teachers.map(teacher => (
            <Grid container key={teacher.id}>
              <Grid xs={12}>
                <Card elevation={0} sx={{ borderRadius: 3 }}>
                  <CardHeader
                    action={
                      <Button
                        varient='text'
                        aria-describedby={id}
                        onClick={e => {
                          handleClick(e, 'poper-open')
                        }}
                      >
                        <MoreVert></MoreVert>
                      </Button>
                    }
                  />
                  <CardContent>
                    <Stack direction='row'>
                      <Avatar alt='Gordan Ramesy' src='/static/images/avatar/1.jpg' sx={{ width: 108, height: 108 }} />
                      <Stack sx={{ pl: 2 }}>
                        <Stack direction='row' spacing={4}>
                          <Typography sx={{ fontWeight: 'bold' }}>{teacher.attributes?.fullName}</Typography>
                          <Chip label='Present' sx={{ backgroundColor: '#EDF7EB', color: '#45A833' }} />
                        </Stack>
                        <Grid container sx={{ pt: 2 }}>
                          <Grid container xs={12}>
                            <Grid xs={2}>
                              <Typography>Gender</Typography>
                            </Grid>
                            <Grid xs={2}>
                              <Typography>{teacher.attributes?.gender}</Typography>
                            </Grid>
                            <Grid xs={3}>
                              <Typography>Subject</Typography>
                            </Grid>
                            <Grid xs={5}>
                              <Typography>{teacher.attributes?.subject}</Typography>
                            </Grid>
                          </Grid>
                          <Grid container xs={12} sx={{ pt: 2 }}>
                            <Grid xs={2}>
                              <Typography>Contact</Typography>
                            </Grid>
                            <Grid xs={2}>
                              <Typography>{teacher.attributes?.mobileNo}</Typography>
                            </Grid>
                            <Grid xs={3}>
                              <Typography>Employment Type</Typography>
                            </Grid>
                            <Grid xs={5}>
                              <Typography>{teacher.attributes?.employeeType}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Stack>
                  </CardContent>

                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)} // Add this line to handle popover close
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                    onClick={e => {
                      e.stopPropagation()
                      handleClose()
                    }}
                  >
                    <Stack spacing={3} sx={{ p: 3 }}>
                      <Button varient='text' onClick={() => navigateToEditProfile(teacher.id)}>
                        Edit Profile
                      </Button>
                      <Button
                        variant='text'
                        sx={{ color: '#FF0000' }}
                        onClick={() => handleDeleteTeacher()}
                        disabled={updateLoading}
                      >
                        Remove Teacher
                      </Button>
                    </Stack>
                  </Popover>
                </Card>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>

      <Modal open={openModal} onClose={handleClose} aria-labelledby='new-teacher-modal' aria-describedby='teacher-new'>
        <Box sx={style}>
          <Card sx={{ overflowY: 'scroll', height: '100%' }}>
            <CardHeader
              sx={{ textAlign: 'center' }}
              avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
              title='Personnel Details'
              action={
                <Button
                  onClick={() => {
                    handleClose('modal-open')
                  }}
                >
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
                    <TextField
                      name='fullName'
                      label='Full Name'
                      variant='outlined'

                      // value={fullName}
                      // onChange={e => setFullName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Gender</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='gender'
                      label='Gender'
                      variant='outlined'
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>D.O.B</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='date'
                      label='date'
                      type='date'
                      variant='outlined'
                      value={dateOfBirth}
                      onChange={e => setDateOfBirth(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Age</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='age'
                      label='age'
                      variant='outlined'
                      value={age}
                      onChange={e => setAge(e.target.value)}
                    />
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
                    <TextField
                      name='address'
                      label='address'
                      variant='outlined'
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Mobile No. </Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='mobileNo'
                      label='mobileNo'
                      variant='outlined'
                      value={mobileNo}
                      onChange={e => setMobileNo(e.target.value)}
                    />
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
                    <TextField
                      name='email'
                      label='email'
                      variant='outlined'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Experince</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='experience'
                      label='experience'
                      variant='outlined'
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Qualification</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <Select
                      value={qualification}
                      onChange={handleQualificationChange}
                      style={{ width: '100%', padding: '8px', height: '50px' }}
                    >
                      {qualificationEnum.map(qualification => (
                        <MenuItem key={qualification} value={qualification}>
                          {qualification}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardHeader
              sx={{ textAlign: 'center' }}
              avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
              title='Subject and class details'
            />
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Subject</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='subject'
                      label='Subject'
                      variant='outlined'
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Class</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <TextField
                      name='class'
                      label='class'
                      variant='outlined'
                      value={section}
                      onChange={e => setSection(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid container>
                <Grid xs={3}>
                  <Typography sx={{ pt: 2 }}>Employment type</Typography>
                </Grid>
                <Grid xs={9}>
                  <FormControl fullWidth>
                    <Select
                      value={employeeType}
                      onChange={handleEmployeeTypeChange}
                      style={{ width: '100%', padding: '8px', height: '50px' }} // Adjust the height as per your preference
                    >
                      {employeeTypeEnum.map(employeeType => (
                        <MenuItem key={employeeType} value={employeeType}>
                          {employeeType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Button onClick={handleCreateTeacher}>Save Info</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  )
}

export default Teachers_home
