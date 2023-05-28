import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  classes: [],
  loading: false,
  error: null
}

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const response = await fetch('http://localhost:1337/api/classes')
  const data = await response.json()

  return data.data
})

export const createClass = createAsyncThunk('classes/createClass', async classData => {
  const response = await fetch('http://localhost:1337/api/classes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(classData)
  })
  const data = await response.json()

  return data
})

export const updateClass = createAsyncThunk('classes/updateClass', async classData => {
  try {
    const response = await fetch(`http://localhost:1337/api/classes/${classData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classData)
    })
    const data = await response.json()
    console.log(data, 'data')

    return data
  } catch (error) {
    throw new Error('Failed to update class')
  }
})

export const deleteClass = createAsyncThunk('classes/deleteClass', async classId => {
  await fetch(`http://localhost:1337/api/classes/${classId}`, {
    method: 'DELETE'
  })

  return classId
})

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchClasses.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false
        state.classes = action.payload
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.classes.push(action.payload)
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        const updatedClass = action.payload.data
        const updatedClassIndex = state.classes.findIndex(cls => cls.id === updatedClass.id)
        if (updatedClassIndex !== -1) {
          const updatedClasses = [...state.classes]
          updatedClasses[updatedClassIndex] = updatedClass
          state.classes = updatedClasses
          console.log('Updated classes:', updatedClasses)
        }
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        const deletedClassId = action.payload
        state.classes = state.classes.filter(cls => cls.id !== deletedClassId)
      })
  }
})

export const classesActions = {
  fetchClasses,
  createClass,
  updateClass,
  deleteClass
}

export default classesSlice.reducer
