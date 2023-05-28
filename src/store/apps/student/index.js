import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  students: [],
  loading: false,
  error: null
}

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await fetch('http://localhost:1337/api/students')
  const data = await response.json()

  return data.data
})

export const createStudent = createAsyncThunk('students/createStudent', async studentData => {
  const response = await fetch('http://localhost:1337/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  })
  const data = await response.json()

  return data
})

export const updateStudent = createAsyncThunk('students/updateStudent', async studentData => {
  try {
    const response = await fetch(`http://localhost:1337/api/students/${studentData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error('Failed to update student')
  }
})

export const deleteStudent = createAsyncThunk('students/deleteStudent', async studentId => {
  await fetch(`http://localhost:1337/api/students/${studentId}`, {
    method: 'DELETE'
  })

  return studentId
})

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStudents.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false
        state.students = action.payload
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload)
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updatedStudent = action.payload.data
        const updatedStudentIndex = state.students.findIndex(student => student.id === updatedStudent.id)
        if (updatedStudentIndex !== -1) {
          const updatedStudents = [...state.students]
          updatedStudents[updatedStudentIndex] = updatedStudent

          state.students = updatedStudents
          console.log('Updated students:', updatedStudents)
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        const deletedStudentId = action.payload
        state.students = state.students.filter(student => student.id !== deletedStudentId)
      })
  }
})

export const studentsActions = {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent
}

export default studentsSlice.reducer
