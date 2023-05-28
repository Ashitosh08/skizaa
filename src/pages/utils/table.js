import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Card, CardHeader, CardContent, Grid, TextField, FormControl } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ModeEdit } from '@mui/icons-material'
import { Delete } from '@mui/icons-material'
import { Close } from '@mui/icons-material'
import Modal from '@mui/material/Modal'
import useFetch from 'src/hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrganizations,
  addOrganization,
  updateOrganization,
  deleteOrganization
} from 'src/store/apps/organization'

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

export default function BasicTable() {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedOrgId, setSelectedOrgId] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [organizationName, setOrganizationName] = useState('')
  const [address, setAddress] = useState('')
  const [facultyStrength, setFacultyStrength] = useState('')
  const [studentStrength, setStudentStrength] = useState('')

  const [contactPerson, setContactPerson] = useState('')
  const [totalSchools, setTotalSchools] = useState('')
  const [paymentTenture, setPaymentTenture] = useState('')
  const dispatch = useDispatch()
  const organizations = useSelector(state => state.organizations.data)
  const loading = useSelector(state => state.organizations.loading)
  const error = useSelector(state => state.organizations.error)
  console.log(organizations)

  useEffect(() => {
    dispatch(fetchOrganizations())
  }, [dispatch])

  const handleOpen = (name, orgId) => {
    if (name === 'edit') {
      const org = organizations.find(org => org.id === orgId)
      if (org) {
        setOrganizationName(org.attributes.organizationName)
        setAddress(org.attributes.address)
        setFacultyStrength(org.attributes.facultyStrength)
        setStudentStrength(org.attributes.studentStrength)
        setContactPerson(org.attributes.contactPerson)
        setTotalSchools(org.attributes.totalSchools)
      }
      setOpenEdit(true)
      setSelectedOrgId(orgId)
    } else if (name === 'delete') {
      setOpenDelete(true)
      setSelectedOrgId(orgId)
    }
  }

  const handleClose = name => {
    if (name === 'edit' && openEdit) {
      setOpenEdit(false)
      setSelectedOrgId(null)

      setOrganizationName('')
      setAddress('')
      setFacultyStrength('')
      setStudentStrength('')
      setContactPerson('')
      setTotalSchools('')
    } else if (name === 'delete' && openDelete) {
      setOpenDelete(false)
      setSelectedOrgId(null)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleUpdateOrg = async () => {
    if (!selectedOrgId) {
      return
    }

    if (
      organizationName.trim() === '' ||
      address.trim() === '' ||
      facultyStrength === '' ||
      studentStrength === '' ||
      contactPerson === '' ||
      totalSchools === ''
    ) {
      return
    }

    const updatedOrg = {
      organizationName: organizationName.trim(),
      address: address.trim(),
      facultyStrength: facultyStrength,
      studentStrength: studentStrength,
      contactPerson: contactPerson,
      totalSchools: totalSchools
    }

    setUpdateLoading(true)

    // Update the user on the server using the updateUser action

    // await dispatch(updateOrganization({ id: selectedOrgId, data: updatedOrg }))

    await dispatch(updateOrganization({ id: selectedOrgId, updatedOrganization: updatedOrg }))
    dispatch(fetchOrganizations())

    // Close the modal and reset the input fields
    setOpenEdit(false)
    setSelectedOrgId(null)
    setOrganizationName('')
    setAddress('')
    setFacultyStrength('')
    setStudentStrength('')
    setContactPerson('')
    setTotalSchools('')

    setUpdateLoading(false)
  }

  const handleDeleteOrg = async () => {
    if (!selectedOrgId) {
      return
    }

    setUpdateLoading(true)

    // Delete the user from the server using the deleteUser action
    await dispatch(deleteOrganization(selectedOrgId))
    dispatch(fetchOrganizations())

    // Close the modal and reset the input fields
    setOpenDelete(false)
    setSelectedOrgId(null)

    setUpdateLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='organization table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textTransform: 'capitalize' }}>organization id</TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Organization name
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Contact person
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Faculty strength
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='right'>
                Student strength
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize' }} align='center'>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((org, index) => (
              <TableRow key={org.id} sx={{}}>
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell align='center'>{org.attributes?.organizationName}</TableCell>
                <TableCell align='center'>{org.attributes?.contactPerson}</TableCell>
                <TableCell align='center'>{org.attributes?.totalSchools}</TableCell>
                <TableCell align='center'>{org.attributes?.studentStrength}</TableCell>
                <TableCell align='center'>
                  <Button varient='contianed' color='success' size='small' onClick={() => handleOpen('edit', org.id)}>
                    <ModeEdit />
                  </Button>
                  <Button varient='contained' size='small' color='error' onClick={() => handleOpen('delete', org.id)}>
                    <Delete fontSize='small' />
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
        count={organizations ? organizations.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit org Modal */}
      <Modal open={openEdit} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Card>
            <CardHeader
              title='Edit Org details'
              action={
                <Button
                  variant='contained'
                  size='small'
                  onClick={() => {
                    handleClose('edit')
                  }}
                >
                  <Close />
                </Button>
              }
            />
            <CardContent>
              <Grid container>
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 2 }}>Organization Name</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4 }}
                      placeholder='Enter organization name'
                      value={organizationName}
                      onChange={event => setOrganizationName(event.target.value)}
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
                      placeholder='Enter location address'
                      value={address}
                      onChange={event => setAddress(event.target.value)}
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
                      onChange={event => setFacultyStrength(event.target.value)}
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
                      onChange={event => setStudentStrength(event.target.value)}
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
                      value={contactPerson}
                      onChange={event => setContactPerson(event.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
                {/* <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Payment Tenure</Typography>
                  </FormControl>
                </Grid> */}
                {/* <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter payment tenure'
                      value={paymentTenture}
                      onChange={event => setPaymentTenture(event.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid> */}
                <Grid xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Number of schools</Typography>
                  </FormControl>
                </Grid>
                <Grid xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter number of schools'
                      value={totalSchools}
                      onChange={event => setTotalSchools(event.target.value)}
                    ></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Button variant='contained' color='primary' onClick={handleUpdateOrg} disabled={updateLoading}>
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
      <Modal open={openDelete}>
        <Box sx={style}>
          <Card>
            <CardHeader
              title='Delete Org details'
              action={
                <Button variant='contained' size='small' onClick={() => handleClose('delete')}>
                  <Close />
                </Button>
              }
            />
            <CardContent>
              <Typography>
                Are you sure you want to delete <strong>organization name</strong>?
              </Typography>
            </CardContent>
            <CardContent>
              <Box sx={{ textAlign: 'center' }}>
                <Button variant='contained' color='error' onClick={handleDeleteOrg} disabled={updateLoading}>
                  <Delete />
                </Button>
                &nbsp;&nbsp;
                <Button variant='contained' color='secondary' onClick={() => handleClose('delete')}>
                  <Close />
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  )
}
