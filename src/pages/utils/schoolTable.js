import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Button, Card, CardHeader, CardContent, Grid, TextField, FormControl } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ModeEdit, Delete, Close } from '@mui/icons-material'
import Modal from '@mui/material/Modal'

import { fetchSchools, createSchool, updateSchool, deleteSchool } from 'src/store/apps/schools'

function createData(schoolName, facStrength, studStrength, contactPerson, paymentTenure) {
  return { schoolName, facStrength, studStrength, contactPerson, paymentTenure }
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function SchoolTable() {
  const dispatch = useDispatch()
  const { schools, loading, error } = useSelector(state => state.schools)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedSchoolId, setSelectedSchoolId] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [schoolName, setSchoolName] = useState('')
  const [location, setLocation] = useState('')
  const [facultyStrength, setFacultyStrength] = useState('')
  const [studentStrength, setStudentStrength] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [paymentTenure, setPaymentTenure] = useState('')

  useEffect(() => {
    dispatch(fetchSchools())
  }, [dispatch])

  const handleOpen = (name, schoolId) => {
    if (name === 'edit') {
      const school = schools.find(school => school.id === schoolId)
      if (school) {
        setSchoolName(school.attributes.schoolName)
        setLocation(school.attributes.location)
        setFacultyStrength(school.attributes.facultyStrength)
        setStudentStrength(school.attributes.studentStrength)
        setContactNumber(school.attributes.contactNumber)
        setPaymentTenure(school.attributes.paymentTenure)
      }
      setOpenEdit(true)
      setSelectedSchoolId(schoolId)
    } else if (name === 'delete') {
      setOpenDelete(true)
      setSelectedSchoolId(schoolId)
    }
  }

  const handleClose = name => {
    if (name === 'edit' && openEdit) {
      setOpenEdit(false)
      setSelectedSchoolId(null)

      setSchoolName('')
      setLocation('')
      setFacultyStrength('')
      setStudentStrength('')
      setContactNumber('')
      setPaymentTenure('')
    } else if (name === 'delete' && openDelete) {
      setOpenDelete(false)
      setSelectedSchoolId(null)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleUpdateSchool = async () => {
    if (!selectedSchoolId) {
      return
    }

    if (
      schoolName === '' ||
      location === '' ||
      contactNumber === '' ||
      facultyStrength === '' ||
      studentStrength === '' ||
      paymentTenure === ''
    ) {
      return
    }

    const updatedSchool = {
      schoolName: schoolName,
      location: location,
      contactNumber: contactNumber,
      facultyStrength: facultyStrength,
      studentStrength: studentStrength,
      paymentTenure: paymentTenure
    }

    setUpdateLoading(true)

    // Update the user on the server using the updateUser action

    await dispatch(updateSchool({ id: selectedSchoolId, data: updatedSchool }))

    // Close the modal and reset the input fields
    setOpenEdit(false)
    setSelectedSchoolId(null)
    setSchoolName('')
    setLocation('')
    setFacultyStrength('')
    setStudentStrength('')
    setContactNumber('')
    setPaymentTenure('')

    setUpdateLoading(false)
  }

  const handleDeleteSchool = async () => {
    if (!selectedSchoolId) {
      return
    }

    setUpdateLoading(true)

    // Delete the user from the server using the deleteUser action
    await dispatch(deleteSchool(selectedSchoolId))

    // Close the modal and reset the input fields
    setOpenDelete(false)
    setSelectedSchoolId(null)

    setUpdateLoading(false)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='organization table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textTransform: 'capitalize' }}>School name</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Faculty strength
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Student strength
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Contact Number
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Payment Tenure
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(school => (
              <TableRow key={school.id}>
                <TableCell>{school.attributes?.schoolName}</TableCell>
                <TableCell align='center'>{school.attributes?.facultyStrength}</TableCell>
                <TableCell align='center'>{school.attributes?.studentStrength}</TableCell>
                <TableCell align='center'>{school.attributes?.contactNumber}</TableCell>
                <TableCell align='center'>{school.attributes?.paymentTenure}</TableCell>
                <TableCell align='center'>
                  <Button varient='contained' color='success' onClick={() => handleOpen('edit', school.id)}>
                    <ModeEdit />
                  </Button>
                  <Button varient='contained' color='error' onClick={() => handleOpen('delete', school.id)}>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={schools.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit School Modal */}
      <Modal open={openEdit} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Card>
            <CardHeader
              title='Edit School details'
              action={
                <Button variant='contained' size='small' onClick={() => handleClose('edit')}>
                  <Close />
                </Button>
              }
            />
            <CardContent>
              <Grid container>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 2 }}>School Name</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4 }}
                      placeholder='Enter school name'
                      value={schoolName}
                      onChange={event => setSchoolName(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Location</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter location address'
                      value={location}
                      onChange={event => setLocation(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Faculty Strength</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter faculty strength'
                      value={facultyStrength}
                      onChange={event => setFacultyStrength(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Student Strength</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter student strength'
                      value={studentStrength}
                      onChange={event => setStudentStrength(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Contact Number</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter contact number'
                      value={contactNumber}
                      onChange={event => setContactNumber(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Payment Tenure</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter payment tenure'
                      value={paymentTenure}
                      onChange={event => setPaymentTenure(event.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Button variant='contained' color='primary' onClick={handleUpdateSchool}>
              Save
            </Button>
          </Card>
        </Box>
      </Modal>

      {/* Delete School Modal */}
      <Modal open={openDelete} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography variant='h6'>Are you sure you want to delete?</Typography>
          <Button variant='contained' color='error' onClick={handleDeleteSchool} disabled={updateLoading}>
            Delete
          </Button>
          <Button variant='contained' color='success' onClick={() => handleClose('delete')}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
