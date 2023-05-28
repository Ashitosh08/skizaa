import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// API endpoints
const BASE_URL = 'http://localhost:1337/api/schools'

// Async thunks for CRUD operations

export const fetchSchools = createAsyncThunk('schools/fetchSchools', async () => {
  const response = await fetch('http://localhost:1337/api/schools')
  const data = await response.json()

  return data.data
})

export const createSchool = createAsyncThunk('schools/createSchool', async schoolData => {
  const response = await fetch('http://localhost:1337/api/schools', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(schoolData)
  })
  const data = await response.json()

  return data
})

export const updateSchool = createAsyncThunk('schools/updateSchool', async schoolData => {
  console.log('updateSchool action called with data:', schoolData)

  const response = await fetch(`http://localhost:1337/api/schools/${schoolData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(schoolData)
  })
  console.log('updateSchool action completed')
  const data = await response.json()

  return data
})

export const deleteSchool = createAsyncThunk('schools/deleteSchool', async schoolId => {
  const response = await fetch(`http://localhost:1337/api/schools/${schoolId}`, {
    method: 'DELETE'
  })

  return schoolId
})

// Slice definition
const schoolsSlice = createSlice({
  name: 'schools',
  initialState: {
    schools: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSchools.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false
        state.schools = action.payload
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createSchool.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createSchool.fulfilled, (state, action) => {
        state.loading = false
        state.schools.push(action.payload)
      })
      .addCase(createSchool.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateSchool.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        // state.loading = false
        // const updatedSchool = action.payload
        // const index = state.schools.findIndex(school => school.id === updatedSchool.id)
        // if (index !== -1) {
        //   state.schools[index] = updatedSchool
        // }

        const updatedSchool = action.payload.data // Access the updated user data
        const updatedSchoolIndex = state.schools.findIndex(school => school.id === updatedSchool.id)
        if (updatedSchoolIndex !== -1) {
          // Create a new array with the updated user
          const updatedSchoolNames = [...state.schools]
          updatedSchoolNames[updatedSchoolIndex] = updatedSchool

          // Update the state with the new array
          state.schools = updatedSchoolNames
          console.log('Updated usernames:', updatedSchoolNames)
        }
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteSchool.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.loading = false
        const deletedSchoolId = action.payload
        state.schools = state.schools.filter(school => school.id !== deletedSchoolId)
      })
      .addCase(deleteSchool.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default schoolsSlice.reducer
