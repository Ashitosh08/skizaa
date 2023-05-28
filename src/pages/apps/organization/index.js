import React, { useState } from 'react'
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
  FormControl
} from '@mui/material'
import { Close } from '@mui/icons-material'
import Tables_main from 'src/pages/utils/table'
import { useDispatch, useSelector } from 'react-redux'
import { createOrganization, fetchOrganizations } from 'src/store/apps/organization'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const Organization_home = () => {
  const [open, setOpen] = useState(false)
  const [organizationName, setOrganizationName] = useState('')
  const [address, setAddress] = useState('')
  const [facultyStrength, setFacultyStrength] = useState('')
  const [studentStrength, setStudentStrength] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [totalSchools, setTotalSchools] = useState('')
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  const organizations = useSelector(state => state.organizations.data)

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setErrors({})
  }

  const validateForm = () => {
    let formErrors = {}

    if (!organizationName.trim()) {
      formErrors.organizationName = 'Organization name is required'
    }

    if (!address.trim()) {
      formErrors.address = 'Address is required'
    }

    if (!facultyStrength) {
      formErrors.facultyStrength = 'Faculty strength is required'
    }

    if (!studentStrength) {
      formErrors.studentStrength = 'Student strength is required'
    }

    if (!contactPerson.trim()) {
      formErrors.contactPerson = 'Contact person is required'
    }

    if (!totalSchools) {
      formErrors.totalSchools = 'Total schools is required'
    }

    setErrors(formErrors)

    return Object.keys(formErrors).length === 0
  }

  const handleCreateOrg = async () => {
    console.log('Saving organization...')

    const isValid = validateForm()

    if (isValid) {
      const userData = {
        data: {
          organizationName: organizationName.trim(),
          address: address.trim(),
          facultyStrength: facultyStrength,
          studentStrength: studentStrength,
          contactPerson: contactPerson,
          totalSchools: totalSchools
        }
      }

      try {
        await dispatch(createOrganization(userData))

        // Reset the form fields
        setOrganizationName('')
        setAddress('')
        setFacultyStrength('')
        setStudentStrength('')
        setContactPerson('')
        setTotalSchools('')

        dispatch(fetchOrganizations())
        handleClose()
      } catch (error) {
        console.log('Error:', error)
      }
    }
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
        <Card>
          <CardHeader
            avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
            action={
              <Button variant='contained' onClick={handleOpen}>
                Create Organization
              </Button>
            }
          />
          <CardContent>
            <Tables_main></Tables_main>
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
                title='Create Org details'
                action={
                  <Button variant='contained' size='small' onClick={handleClose}>
                    <Close />
                  </Button>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ pt: 2 }}>Organization Name</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        required
                        size='small'
                        sx={{ pl: 4 }}
                        placeholder='Enter organization name'
                        onChange={e => setOrganizationName(e.target.value)}
                        error={!!errors.organizationName}
                        helperText={errors.organizationName}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ pt: 2 }}>Address</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        size='small'
                        sx={{ pl: 4, pt: 2 }}
                        placeholder='Enter organization address'
                        onChange={e => setAddress(e.target.value)}
                        error={!!errors.address}
                        helperText={errors.address}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ pt: 2 }}>Faculty Strength</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        type='number'
                        size='small'
                        sx={{ pl: 4, pt: 2 }}
                        placeholder='Enter faculty strength'
                        onChange={e => setFacultyStrength(e.target.value)}
                        error={!!errors.facultyStrength}
                        helperText={errors.facultyStrength}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ pt: 2 }}>Student Strength</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        type='number'
                        size='small'
                        sx={{ pl: 4, pt: 2 }}
                        placeholder='Enter student strength'
                        onChange={e => setStudentStrength(e.target.value)}
                        error={!!errors.studentStrength}
                        helperText={errors.studentStrength}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ pt: 2 }}>Contact Person</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        size='small'
                        sx={{ pl: 4, pt: 2 }}
                        placeholder='Enter contact person'
                        onChange={e => setContactPerson(e.target.value)}
                        error={!!errors.contactPerson}
                        helperText={errors.contactPerson}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ pt: 2 }}>Total Schools</Typography>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth>
                      <TextField
                        type='number'
                        size='small'
                        sx={{ pl: 4, pt: 2 }}
                        placeholder='Enter total schools'
                        onChange={e => setTotalSchools(e.target.value)}
                        error={!!errors.totalSchools}
                        helperText={errors.totalSchools}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ pt: 4 }}>
                  <Button variant='contained' color='primary' onClick={handleCreateOrg}>
                    Save
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

export default Organization_home
