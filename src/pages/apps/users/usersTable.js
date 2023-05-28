import React, { useEffect, useState } from 'react'
import { Box, Card, CardHeader, CardContent, TextField, Button, Typography, Grid, FormControl } from '@mui/material'
import { Close, Delete, Edit, ModeEdit } from '@mui/icons-material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/system'
import { fetchUsernames, updateUser, deleteUser } from 'src/store/apps/usernames'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4
}

const StyledModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
})

const UsersTable = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [selectedUserId, setSelectedUserId] = useState(null)
  const [usernameInput, setUsernameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [mobileInput, setMobileInput] = useState('')
  const dispatch = useDispatch()
  const [updateLoading, setUpdateLoading] = useState(false)
  const [userRole, setUserRole] = useState('')

  const usernames = useSelector(state => state.usernames.usernames)
  const loading = useSelector(state => state.usernames.loading)

  useEffect(() => {
    dispatch(fetchUsernames())
  }, [dispatch])

  const handleRoleChange = event => {
    setUserRole(event.target.value)
  }

  const handleOpen = (name, userId) => {
    if (name === 'edit') {
      const user = usernames.find(user => user.id === userId)
      if (user) {
        setUsernameInput(user.attributes.username)
        setEmailInput(user.attributes.email)
        setMobileInput(user.attributes.mobile_no)
        setUserRole(user.attributes.role)
      }
      setOpenEdit(true)
      setSelectedUserId(userId)
    } else if (name === 'delete') {
      setOpenDelete(true)
      setSelectedUserId(userId)
    }
  }

  const handleClose = name => {
    if (name === 'edit' && openEdit) {
      setOpenEdit(false)
      setSelectedUserId(null)

      setUsernameInput('')
      setEmailInput('')
      setMobileInput('')
      setUserRole('')
    } else if (name === 'delete' && openDelete) {
      setOpenDelete(false)
      setSelectedUserId(null)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleUpdateUser = async () => {
    if (!selectedUserId) {
      return
    }

    if (
      usernameInput.trim() === '' ||
      emailInput.trim() === '' ||
      mobileInput.trim() === '' ||
      userRole.trim() === ''
    ) {
      return
    }

    const updatedUser = {
      username: usernameInput.trim(),
      email: emailInput.trim(),
      mobile_no: mobileInput.trim(),
      role: userRole.trim()
    }

    setUpdateLoading(true)

    // Update the user on the server using the updateUser action
    await dispatch(updateUser({ id: selectedUserId, data: updatedUser }))

    // Close the modal and reset the input fields
    setOpenEdit(false)
    setSelectedUserId(null)
    setUsernameInput('')
    setEmailInput('')
    setMobileInput('')
    setUserRole('')

    setUpdateLoading(false)
  }

  const handleDeleteUser = async () => {
    if (!selectedUserId) {
      return
    }

    setUpdateLoading(true)

    // Delete the user from the server using the deleteUser action
    await dispatch(deleteUser(selectedUserId))

    // Close the modal and reset the input fields
    setOpenDelete(false)
    setSelectedUserId(null)

    setUpdateLoading(false)
  }

  return (
    <Card>
      <CardHeader title='Users' />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usernames.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.attributes?.username}</TableCell>
                  <TableCell>{user.attributes?.email}</TableCell>
                  <TableCell>{user.attributes?.mobile_no}</TableCell>
                  <TableCell>{user.attributes?.role}</TableCell>
                  <TableCell>
                    <Button
                      varient='contained'
                      color='success'
                      size='small'
                      onClick={() => handleOpen('edit', user.id)}
                    >
                      <ModeEdit />
                    </Button>
                    <Button
                      varient='contained'
                      color='error'
                      size='small'
                      onClick={() => handleOpen('delete', user.id)}
                    >
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
          count={usernames.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>

      {/* Edit User Modal */}

      <Modal open={openEdit} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Card>
            <CardHeader
              title='Edit user details'
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
                    <Typography sx={{ pt: 2 }}>UserName</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4 }}
                      placeholder='Enter username'
                      value={usernameInput}
                      onChange={event => setUsernameInput(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Email</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter email address'
                      value={emailInput}
                      onChange={event => setEmailInput(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Mobile no</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <TextField
                      size='small'
                      sx={{ pl: 4, pt: 4 }}
                      placeholder='Enter mobile number'
                      value={mobileInput}
                      onChange={event => setMobileInput(event.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ pt: 6 }}>Role</Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <Select
                      value={userRole}
                      sx={{ pl: 2 }}
                      onChange={handleRoleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Select role' }}
                    >
                      <MenuItem value=''>Select Role</MenuItem>
                      <MenuItem value='Client'>Client</MenuItem>
                      <MenuItem value='Admin'>Admin</MenuItem>
                      <MenuItem value='User'>User</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <Button variant='contained' color='primary' onClick={handleUpdateUser} disabled={updateLoading}>
                Update User
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      {/* Delete User Modal */}
      <Modal open={openDelete} onClose={() => handleClose('delete')}>
        <Box sx={style}>
          <Typography variant='h5' mb={2}>
            Delete User
          </Typography>
          <Typography variant='body1' mb={2}>
            Are you sure you want to delete this user?
          </Typography>
          <Button variant='contained' color='error' onClick={handleDeleteUser} disabled={updateLoading}>
            <Delete />
          </Button>
          &nbsp;&nbsp;
          <Button variant='contained' color='secondary' onClick={() => handleClose('delete')} ml={2}>
            <Close />
          </Button>
        </Box>
      </Modal>
    </Card>
  )
}

export default UsersTable
