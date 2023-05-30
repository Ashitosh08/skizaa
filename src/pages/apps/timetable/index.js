import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  TextField,
  FormControl,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { Modal, Select, MenuItem, InputLabel } from '@mui/material'
import Close from '@mui/icons-material/Close'

const Timetable_home = () => {
  const [openTimetable, setOpenTimetable] = useState(false)
  const [teacher, setTeacher] = useState('')
  const [subject, setSubject] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [breakTime, setBreakTime] = useState('')
  const [breakEndTime, setBreakEndtime] = useState('')
  const [className, setClassName] = useState('')
  const [section, setSection] = useState('')
  const [period, setPeriod] = useState('')
  const [error, setError] = useState('hidden')
  const [errTxt, setErrTxt] = useState('')
  const [timeTableVisible, setTTVisible] = useState('hidden')

  const generateTimeTable = () => {
    setError('hidden')
    if (
      startTime != '' &&
      endTime != '' &&
      breakTime != '' &&
      breakEndTime != '' &&
      className != '' &&
      section != '' &&
      period != ''
    ) {
      setTTVisible('visible')
    } else {
      if (startTime === '') {
        setErrTxt(errTxt => errTxt + 'Please enter the School start time \n')
      }
      if (endTime === '') {
        setErrTxt(errTxt => errTxt + 'Please Enter the School end time \n')
      }
      if (breakTime === '') {
        setErrTxt(errTxt => errTxt + 'Please enter the Break start time \n')
      }
      if (breakEndTime === '') {
        setErrTxt(errTxt => errTxt + 'Please enter the Break end time \n')
      }
      if (period === '') {
        setErrTxt(errTxt => errTxt + 'Please enter the Period length \n')
      }
      if (className === '') {
        setErrTxt(errTxt => errTxt + 'Please enter the Class Name \n')
      }
      if (section === '') {
        setErrTxt(errTxt => errTxt + 'Please enter the Section \n')
      }
      setError('visible')
    }
  }

  const handleTeacher_SubjectChange = (type, event) => {
    if (type === 'teacher') {
      setTeacher(event.target.value)
    } else if (type === 'subject') {
      setSubject(event.target.value)
    } else {
      setTeacher(event.target.value)
      setSubject(event.target.value)
    }
  }

  function createData(start, end, teacherSubject) {
    return { start, end, teacherSubject }
  }
  console.log('hello')

  const rows = [
    createData('9:30 AM', '10:30 AM', {
      teacher1: 'teacher1',
      subject1: 'maths',
      teacher2: 'teach2',
      subject2: 'english',
      teacher3: 'teach3',
      subject3: 'PT',
      teacher4: 'teach4',
      subject4: 'SS',
      teacher5: 'teach5',
      subject5: 'DSP',
      teacher6: 'teach2',
      subject6: 'CS'
    }),
    createData('10:30 AM', '11:30 AM', {
      teacher1: 'teach2',
      subject1: 'tulu',
      teacher2: 'teach22',
      subject2: 'Kannada',
      teacher3: 'teach3',
      subject3: 'Science',
      teacher4: 'teach4',
      subject4: 'Social',
      teacher5: 'teach5',
      subject5: 'BE',
      teacher6: 'teach2',
      subject6: 'NA'
    }),
    createData('11:30 AM', '12:30 PM', {
      teacher1: 'teach2',
      subject1: 'tulu',
      teacher2: 'teach22',
      subject2: 'Kannada',
      teacher3: 'teach3',
      subject3: 'Science',
      teacher4: 'teach4',
      subject4: 'Social',
      teacher5: 'teach5',
      subject5: 'BE',
      teacher6: 'teach2',
      subject6: 'NA'
    }),
    createData('12:30 AM', '01:30 PM', {
      teacher1: 'teach2',
      subject1: 'tulu',
      teacher2: 'teach22',
      subject2: 'Kannada',
      teacher3: 'teach3',
      subject3: 'Science',
      teacher4: 'teach4',
      subject4: 'Social',
      teacher5: 'teach5',
      subject5: 'BE',
      teacher6: 'teach2',
      subject6: 'NA'
    }),
    createData('01:30 PM', '02:30 PM (Lunch Break)', 'lunch', 'lunch'),
    createData('02:30 PM', '03:30 PM', {
      teacher1: 'teach2',
      subject1: 'tulu',
      teacher2: 'teach22',
      subject2: 'Kannada',
      teacher3: 'teach3',
      subject3: 'Science',
      teacher4: 'teach4',
      subject4: 'Social',
      teacher5: 'teach5',
      subject5: 'BE',
      teacher6: 'teach2',
      subject6: 'NA'
    }),
    createData('03:30 PM', '04:30 PM', {
      teacher1: 'teacher1',
      subject1: 'maths',
      teacher2: 'teach2',
      subject2: 'english',
      teacher3: 'teach3',
      subject3: 'PT',
      teacher4: 'teach4',
      subject4: 'SS',
      teacher5: 'teach5',
      subject5: 'DSP',
      teacher6: 'teach2',
      subject6: 'CS'
    })
  ]

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }

  const handleTimetableOpen = () => {
    setOpenTimetable(true)
  }

  const handleTimetableClose = () => {
    setOpenTimetable(false)
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
          title='Create Timetable'
        />
        <CardContent>
          <Grid container>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>School start time</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl fullWidth>
                <TextField
                  varient='outlined'
                  label='Start Time'
                  placeholder='Start Time'
                  size='small'
                  required
                  onChange={e => {
                    setStartTime(e.target.value)
                  }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>School end time</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl fullWidth>
                <TextField
                  varient='outlined'
                  label='End Time'
                  placeholder='End Time'
                  size='small'
                  required
                  onChange={e => {
                    setEndTime(e.target.value)
                  }}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ pt: 2 }}>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>Break start time</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl fullWidth>
                <TextField
                  varient='outlined'
                  label='Start time'
                  placeholder='Start time'
                  size='small'
                  required
                  onChange={e => {
                    setBreakTime(e.target.value)
                  }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>Break end time</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl fullWidth>
                <TextField
                  varient='outlined'
                  label='End time'
                  placeholder='End time'
                  size='small'
                  required
                  onChange={e => setBreakEndtime(e.target.value)}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ pt: 2 }}>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>Class name</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl fullWidth>
                <TextField
                  size='small'
                  placeholder='Class Name'
                  varient='outlined'
                  label='Class Name'
                  required
                  onChange={e => {
                    setClassName(e.target.value)
                  }}
                ></TextField>
              </FormControl>
            </Grid>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>Section</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl fullWidth>
                <TextField
                  size='small'
                  placeholder='Section'
                  varient='outlined'
                  label='Section'
                  required
                  onChange={e => {
                    setSection(e.target.value)
                  }}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container sx={{ pt: 2 }}>
            <Grid xs={2}>
              <Typography sx={{ pl: 6, pt: 2 }}>Period length</Typography>
            </Grid>
            <Grid xs={10}>
              <FormControl fullWidth>
                <TextField
                  varient='outlined'
                  label='Period length'
                  placholder='Period length'
                  size='small'
                  required
                  onChange={e => {
                    setPeriod(e.target.value)
                  }}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Box textAlign='center'>
            <Button
              onClick={() => {
                generateTimeTable()
              }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
        <CardContent>
          <Box visibility={error}>
            <FormControl fullWidth>
              <Typography sx={{ color: '#FF0000', wordBreak: 'break-all' }}>{'* Note:\n' + errTxt}</Typography>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      <Box visibility={timeTableVisible} sx={{ pt: 3 }}>
        <Card raised='false' visibility={timeTableVisible} sx={{ borderRadius: 3 }}>
          <CardHeader
            avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
            title='Timetable'
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table aria-label='Timetable'>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: 'capitalize', textAlign: ' center' }}>Monday</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: 'capitalize', textAlign: ' center' }}>Tuesday</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: 'capitalize', textAlign: ' center' }}>Wednesday</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: 'capitalize', textAlign: ' center' }}>Thrusday</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: 'capitalize', textAlign: ' center' }}>Friday</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: 'capitalize', textAlign: ' center' }}>Saturday</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, key) => (
                    <TableRow key={key}>
                      <TableCell component='th' scope='row' sx={{ width: '20%' }}>
                        <Box>
                          <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                              <Typography>
                                {row.start} &#45; {row.end}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>

                      <TableCell component='td' scope='row'>
                        <Box onClick={handleTimetableOpen}>
                          <Card sx={{ backgroundColor: '#EDF7EB', borderRadius: 2, cursor: 'pointer' }}>
                            <CardContent>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.teacher1}
                              </Typography>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.subject1}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        <Box onClick={handleTimetableOpen}>
                          <Card sx={{ backgroundColor: '#FFF6E6', borderRadius: 2, cursor: 'pointer' }}>
                            <CardContent>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.teacher2}
                              </Typography>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.subject2}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        <Box onClick={handleTimetableOpen}>
                          <Card sx={{ backgroundColor: '#EEF0FF', borderRadius: 2, cursor: 'pointer' }}>
                            <CardContent>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.teacher3}
                              </Typography>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.subject3}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        <Box onClick={handleTimetableOpen}>
                          <Card>
                            <CardContent sx={{ backgroundColor: '#FCEAEB', borderRadius: 2, cursor: 'pointer' }}>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.teacher4}
                              </Typography>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.subject4}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        <Box onClick={handleTimetableOpen}>
                          <Card>
                            <CardContent sx={{ backgroundColor: '#EDF7EB', borderRadius: 2, cursor: 'pointer' }}>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.teacher5}
                              </Typography>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.subject5}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        <Box onClick={handleTimetableOpen}>
                          <Card>
                            <CardContent sx={{ backgroundColor: '#FFF6E6', borderRadius: 2, cursor: 'pointer' }}>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.teacher6}
                              </Typography>
                              <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', color: '#212121' }}>
                                {row.teacherSubject.subject6}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
      <Modal open={openTimetable} aria-labelledby='edit-time-modal-parent' aria-describedby='edit-time-modal'>
        <Box sx={{ ...style, width: 500 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardHeader
              avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
              title='Assign Period'
              action={
                <Button onClick={handleTimetableClose} variant='contained' size='small'>
                  <Close />
                </Button>
              }
            />
            <CardContent sx={{ p: 5 }}>
              <FormControl fullWidth>
                <InputLabel id='Teacher-select' size='small'>
                  Select teacher
                </InputLabel>
                <Select
                  labelId='Teacher-select'
                  id='select-teacher'
                  value={teacher}
                  label='Select Teacher'
                  onChange={e => {
                    handleTeacher_SubjectChange('teacher', e)
                  }}
                  size='small'
                >
                  <MenuItem value={'Dinah Achola'}>Dinah Achola</MenuItem>
                  <MenuItem value={'Mojisola Alheri'}>Mojisola Alheri</MenuItem>
                  <MenuItem value={'Moti Otobong'}>Moti Otobong</MenuItem>
                  <MenuItem value={'Okafor Itoro'}>Okafor Itoro</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
            <CardContent sx={{ pl: 5, pr: 5, pb: 5 }}>
              <FormControl fullWidth>
                <InputLabel id='Subject-select' size='small'>
                  Select subject
                </InputLabel>
                <Select
                  labelId='Subject-select'
                  id='select-subject'
                  value={subject}
                  label='Select Subject'
                  onChange={e => {
                    handleTeacher_SubjectChange('subject', e)
                  }}
                  size='small'
                >
                  <MenuItem value={'English'}>English</MenuItem>
                  <MenuItem value={'Science'}>Science</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Button variant='contained'>Delete</Button>&nbsp;
                <Button variant='contained'>Save</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Box>
  )
}

export default Timetable_home
