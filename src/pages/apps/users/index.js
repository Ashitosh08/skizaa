import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Modal,
  Grid,
  FormControl,
  Select,
  MenuItem
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { createUser, fetchUsernames } from 'src/store/apps/usernames'
import { useDispatch, useSelector } from 'react-redux'
import Users_Table from 'src/pages/apps/users/usersTable'
import axios from 'axios'

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

const Users_home = () => {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [mobileNoError, setMobileNoError] = useState('')
  const [userRole, setUserRole] = useState('')
  const [roleEnum, setRoleEnum] = useState([])

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/usernames') // Replace with your API endpoint
        console.log(response, 'response')

        // const usernames = response.data.data
        const usernames = response.data.data.map(username => username.attributes)
        console.log(usernames, 'usernames')
        const roleEnumValues = extractRoleEnumValues(usernames)
        console.log(roleEnumValues, 'enumValues')
        setRoleEnum(roleEnumValues)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsernames()
  }, [])

  const extractRoleEnumValues = usernames => {
    const roles = usernames.map(username => username.role)
    console.log(roles, 'roles')
    const uniqueRoles = [...new Set(roles)]

    return uniqueRoles
  }

  const dispatch = useDispatch()

  const usernames = useSelector(state => state.usernames.usernames)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleCreateUser = async () => {
    let isValid = true

    // Validate name field
    if (username.trim() === '') {
      setUsernameError('Username is required')
      isValid = false
    } else {
      setUsernameError('')
    }

    // Validate email field
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (email.trim() === '' || !emailRegex.test(email.trim())) {
      setEmailError('Invalid email')
      isValid = false
    } else {
      setEmailError('')
    }

    if (isValid) {
      const userData = {
        data: {
          username: username.trim(),
          email: email.trim(),
          mobile_no: mobileNo.trim(),
          role: userRole
        }
      }

      try {
        // Dispatch the createUser action
        await dispatch(createUser(userData))

        // Reset the form fields
        setUsername('')
        setEmail('')
        setMobileNo('')
        setUserRole('')

        dispatch(fetchUsernames())
        handleClose()
      } catch (error) {
        console.log('Failed to create user:', error)
      }
    }
  }

  const handleRoleChange = event => {
    setUserRole(event.target.value)
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
        <Card>
          <CardHeader
            avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
            action={
              <Button variant='contained' onClick={handleOpen}>
                Create User
              </Button>
            }
          />
          <CardContent>
            <Users_Table></Users_Table>
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
                title='Add User'
                action={
                  <Button variant='contained' size='small' onClick={handleClose}>
                    <Close />
                  </Button>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label='Username'
                      variant='outlined'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      fullWidth
                      error={!!usernameError} // Set the error prop to true if there is an error
                      helperText={usernameError} // Display the error message
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label='Email'
                      variant='outlined'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      fullWidth
                      error={!!emailError}
                      helperText={emailError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label='Mobile No'
                      variant='outlined'
                      value={mobileNo}
                      onChange={e => setMobileNo(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Typography>Role</Typography>

                      <Select
                        value={userRole}
                        onChange={handleRoleChange}
                        style={{ width: '100%', padding: '8px', height: '50px' }}
                      >
                        {roleEnum.map(role => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <Button variant='contained' onClick={handleCreateUser}>
                    Create
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      </Box>
    </div>
  )
}

export default Users_home
