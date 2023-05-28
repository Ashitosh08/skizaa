import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Chip,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'

import { fetchStudents } from 'src/store/apps/student'

const StudentsList = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  const students = useSelector(state => state.students.students)
  const loading = useSelector(state => state.students.loading)
  console.log(students, 'students')

  const navigateToEditProfile = id => {
    router.push({
      pathname: 'students/editProfile',
      query: { id }
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='students_listtable'>
        <TableHead>
          <TableRow>
            <TableCell>Roll No.</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Guardian's Name</TableCell>
            <TableCell>Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant='body1'>Loading...</Typography>
              </TableCell>
            </TableRow>
          ) : (
            students.map(student => (
              <TableRow
                key={student.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                onClick={() => navigateToEditProfile(student.id)}
              >
                <TableCell component='th' scope='row'>
                  {student.attributes.rollNo}
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid xs={5}>{student.attributes.studentName}</Grid>
                    <Grid xs={6}>
                      <Chip label={student.attributes.status} />
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align='left'>{student.attributes.gender}</TableCell>
                <TableCell align='left'>{student.attributes.guradianName}</TableCell>
                <TableCell align='left'>{student.attributes.contactNumber}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentsList
