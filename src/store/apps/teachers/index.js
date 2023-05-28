import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  teachers: [],
  loading: false,
  error: null
}

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async () => {
  const response = await fetch('http://localhost:1337/api/teachers')
  const data = await response.json()

  return data.data
})

export const createTeacher = createAsyncThunk('teachers/createTeacher', async teacherData => {
  const response = await fetch('http://localhost:1337/api/teachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teacherData)
  })
  const data = await response.json()

  return data
})

export const updateTeacher = createAsyncThunk('teachers/updateTeacher', async teacherData => {
  try {
    const response = await fetch(`http://localhost:1337/api/teachers/${teacherData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacherData)
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error('Failed to update teacher')
  }
})

export const deleteTeacher = createAsyncThunk('teachers/deleteTeacher', async teacherId => {
  await fetch(`http://localhost:1337/api/teachers/${teacherId}`, {
    method: 'DELETE'
  })

  return teacherId
})

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTeachers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false
        state.teachers = action.payload
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload)
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const updatedTeacher = action.payload.data
        const updatedTeacherIndex = state.teachers.findIndex(teacher => teacher.id === updatedTeacher.id)
        if (updatedTeacherIndex !== -1) {
          const updatedTeachers = [...state.teachers]
          updatedTeachers[updatedTeacherIndex] = updatedTeacher
          state.teachers = updatedTeachers
        }
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        const deletedTeacherId = action.payload
        state.teachers = state.teachers.filter(teacher => teacher.id !== deletedTeacherId)
        console.log('Delete Teacher Fulfilled:', deletedTeacherId)
      })
  }
})

export const teachersActions = {
  fetchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
}

export default teachersSlice.reducer
