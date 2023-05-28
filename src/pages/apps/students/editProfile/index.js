import React, { useState, useEffect } from 'react'
import { Box, Card, CardHeader, CardContent, Grid, Typography, Avatar, Chip, Button, Popover } from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { deleteStudent } from 'src/store/apps/student'

const StudentProfile = () => {
  const router = useRouter()
  const [student, setStudent] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [rollNo, setRollNo] = useState('')
  const dispatch = useDispatch()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'openSubMenu' : undefined

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/students/${router.query.id}`)
        const data = await response.json()
        if (data && data.data && data.data.attributes) {
          setStudent(data.data.attributes)
        }
      } catch (error) {
        console.error('Error fetching student data:', error)
      }
    }

    if (router.query.id) {
      fetchStudentData()
    }
  }, [router.query.id])

  const navigateToEditProfile = () => {
    router.push({
      pathname: 'editProfile/editStudent',
      query: { id: router.query.id }
    })
  }

  const handleDeleteStudent = async () => {
    const studentId = router.query.id
    await dispatch(deleteStudent(studentId))
    router.push('/apps/students') // Redirect to the student list page after deletion
  }

  if (!student) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card>
        <Grid container spacing={2} sx={{ pl: 15, pt: 5 }}>
          <Grid xs={4}>
            <Avatar
              alt={student.studentName}
              src={student.avatarUrl}
              sx={{ width: 175, height: 175 }}
              variant='rounded'
            />
            <Typography sx={{ pl: 7, pt: 4 }}>{student.studentName}</Typography>
            <Chip label={student.status} />
          </Grid>
          <Grid xs={8}>
            <CardHeader
              avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
              title='Basic Details'
              action={
                <Button>
                  <MoreVert aria-describedby={id} onClick={handleClick} />
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2} sx={{ pt: 5 }}>
                <Grid xs={4}>
                  <Typography>RollNo:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.rollNo}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Class:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.class}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Gender:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.gender}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>D.O.B:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.dateOfBirth}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Guardian Name:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.guardianName}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Guardian's Contact No:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.contactNumber}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Country:</Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.country}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography>Address: </Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography>{student.address}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
        <Card>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid xs={4}>
              <CardContent>
                <Card>
                  <CardHeader
                    avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
                    title='Total Attendance'
                  />
                  <CardContent>
                    <Typography>Here comes the progress bar</Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
            <Grid xs={8}>
              <CardContent>
                <Card>
                  <CardHeader
                    avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
                    title='Subjectwise Attendance %'
                    action={<Chip label='Term' />}
                  />
                  <CardContent>
                    <Typography>Here comes the barchart</Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Card>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Button onClick={navigateToEditProfile}>Edit Profile</Button>
          <br />
          <Button sx={{ borderColor: '#FF0000', color: '#FF0000' }} onClick={handleDeleteStudent}>
            Delete Student
          </Button>
        </Box>
      </Popover>
    </Box>
  )
}

export default StudentProfile
