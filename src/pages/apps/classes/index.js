import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Modal, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Popover from '@mui/material/Popover'
import Fade from '@mui/material/Fade'
import Backdrop from '@mui/material/Backdrop'
import Select from '@mui/material/Select'
import { Close, MoreVert } from '@mui/icons-material'
import { fetchClasses, deleteClass, createClass } from 'src/store/apps/class'
import { fetchTeachers } from 'src/store/apps/teachers'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
}

const Classes_home = () => {
  const router = useRouter()
  const [openDelete, setOpenDelete] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [modalDeleteOpen, setDeleteModalOpen] = useState(false)
  const [modalNewOpen, setNewModalOpen] = useState(false)
  const [teacherName, setTeacherName] = useState('')
  const [className, setClassName] = useState('')
  const [roomNo, setRoomNo] = useState('')
  const [numberOfStudent, setNumberOfStudent] = useState('')
  const [updateLoading, setUpdateLoading] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState(null) // Track selected class ID
  const [anchorElList, setAnchorElList] = useState([])

  const dispatch = useDispatch()
  const classes = useSelector(state => state.classes.classes)
  const teachers = useSelector(state => state.teachers.teachers)
  const loading = useSelector(state => state.classes.loading)
  const error = useSelector(state => state.classes.error)

  useEffect(() => {
    dispatch(fetchClasses())
    dispatch(fetchTeachers())
  }, [dispatch])

  const handleClick = (event, index) => {
    const newAnchorElList = [...anchorElList]
    newAnchorElList[index] = event.currentTarget
    setAnchorElList(newAnchorElList)
  }

  const handleClose = index => {
    const newAnchorElList = [...anchorElList]
    newAnchorElList[index] = null
    setAnchorElList(newAnchorElList)
  }

  const openModal = () => setNewModalOpen(true)
  const closeModal = () => setNewModalOpen(false)

  const closeDeleteModal = () => setDeleteModalOpen(false)

  const handleChange = event => {
    setTeacherName(event.target.value)
  }

  const handleCardClick = classId => {
    router.push({
      pathname: 'classes/class-det',
      query: { id: classId }
    })
  }

  const handleDeleteClass = async () => {
    if (!selectedClassId) {
      return
    }

    setUpdateLoading(true)

    // Delete the class from the server using the deleteClass action
    await dispatch(deleteClass(selectedClassId))

    // Close the modal and reset the input fields
    setDeleteModalOpen(false)
    setSelectedClassId(null)

    setUpdateLoading(false)
  }

  const openDeleteModal = classId => {
    setDeleteModalOpen(true)
    setSelectedClassId(classId)
  }

  const handleCreateClass = async () => {
    const userData = {
      data: {
        className,
        roomNo,
        numberOfStudent,
        teacherName
      }
    }

    try {
      // Dispatch the createUser action
      await dispatch(createClass(userData))

      // Reset the form fields
      setClassName('')
      setRoomNo('')
      setTeacherName('')
      setNumberOfStudent('')
      dispatch(fetchClasses())
      closeModal()
    } catch (error) {
      console.log('Failed to create user:', error)
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#EEEFF7', p: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
          action={
            <Button variant='contained' onClick={openModal}>
              + Add New Section
            </Button>
          }
          title={<Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Class</Typography>}
        />
        {classes.map((classData, index) => (
          <CardContent key={classData.id}>
            <Stack spacing={10} direction='row'>
              <Card sx={{ backgroundColor: '#FFF6E6', borderRadius: 3, cursor: 'pointer' }}>
                <CardHeader
                  action={
                    <Button variant='text' aria-describedby={id} onClick={event => handleClick(event, index)}>
                      <MoreVert />
                    </Button>
                  }
                  sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: 0 }} onClick={() => handleCardClick(classData.id)}>
                  <CardContent>
                    <Typography sx={{ fontSize: 32, textAlign: 'center' }}>
                      {classData.attributes?.className}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography sx={{ fontSize: 15 }}>
                      Total Number of Students: {classData.attributes?.numberOfStudent}
                    </Typography>
                  </CardContent>
                </CardContent>
              </Card>
              <Popover
                id={id}
                open={Boolean(anchorElList[index])}
                anchorEl={anchorElList[index]}
                onClose={() => handleClose(index)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Button
                  variant='text'
                  sx={{ color: '#FF0000' }}
                  onClick={() => openDeleteModal(classData.id)}
                  disabled={updateLoading}
                >
                  Delete
                </Button>
              </Popover>
            </Stack>
          </CardContent>
        ))}
      </Card>

      <Modal
        aria-labelledby='Add_New_Section'
        aria-describedby='Adding_New_Section'
        open={modalNewOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalNewOpen}>
          <Box sx={style}>
            <Card>
              <CardHeader
                avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
                title='New Section'
                action={
                  <Button variant='contained' onClick={closeModal}>
                    <Close />
                  </Button>
                }
              />
              <CardContent>
                <Stack spacing={10} direction='column'>
                  <TextField
                    label='Class Name'
                    variant='outlined'
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                  />
                  <TextField
                    label='Room No.'
                    variant='outlined'
                    value={roomNo}
                    onChange={e => setRoomNo(e.target.value)}
                  />
                  <TextField
                    label='Number of Student'
                    variant='outlined'
                    value={numberOfStudent}
                    onChange={e => setNumberOfStudent(e.target.value)}
                  />
                  <FormControl variant='outlined'>
                    <InputLabel id='teacher-label'>Teacher</InputLabel>
                    <Select
                      labelId='teacher-label'
                      id='teacher-select'
                      value={teacherName}
                      onChange={handleChange}
                      label='Teacher'
                    >
                      {/* {teachers.map(teacher => (
                        <MenuItem value={teacher.attributes.teacherName} key={teacher.id}>
                          {teacher.attributes.teacherName}
                        </MenuItem>
                      ))} */}
                      <MenuItem value='suresh'>suresh</MenuItem>
                      <MenuItem value='mahesh'>mahesh</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant='contained' onClick={handleCreateClass}>
                    Save
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby='Delete_Class'
        aria-describedby='Deleting_Class'
        open={modalDeleteOpen}
        onClose={closeDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalDeleteOpen}>
          <Box sx={style}>
            <Card>
              <CardHeader
                avatar={<Box sx={{ width: 8, backgroundColor: '#FFA000', borderRadius: 3, height: 25 }}></Box>}
                title='Delete Class'
                action={
                  <Button variant='contained' onClick={closeDeleteModal}>
                    <Close />
                  </Button>
                }
              />
              <CardContent>
                <Typography>Are you sure you want to delete this class? This action cannot be undone.</Typography>
                <Stack direction='row' justifyContent='flex-end' mt={3}>
                  <Button variant='outlined' onClick={closeDeleteModal}>
                    Cancel
                  </Button>
                  <Button variant='contained' sx={{ ml: 2 }} color='error' onClick={handleDeleteClass}>
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default Classes_home
