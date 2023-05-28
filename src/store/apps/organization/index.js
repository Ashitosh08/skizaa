import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:1337/api/organizations'

export const fetchOrganizations = createAsyncThunk('organizations/fetchOrganizations', async () => {
  try {
    const response = await fetch('http://localhost:1337/api/organizations')
    const data = await response.json()

    return data.data
  } catch (error) {
    return error.message
  }
})

export const createOrganization = createAsyncThunk('organizations/createOrganization', async newOrganization => {
  try {
    const response = await fetch('http://localhost:1337/api/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrganization)
    })
    const data = await response.json()

    return data
  } catch (error) {
    return error.message
  }
})

export const updateOrganization = createAsyncThunk(
  'organizations/updateOrganization',
  async ({ id, updatedOrganization }) => {
    try {
      const response = await fetch(`http://localhost:1337/api/organizations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: updatedOrganization }) // Include 'data' property in the request body
      })

      console.log('updateOrganization action completed')
      const data = await response.json()

      return data
    } catch (error) {
      return error.message
    }
  }
)

export const deleteOrganization = createAsyncThunk('organizations/deleteOrganization', async orgId => {
  try {
    const response = await fetch(`http://localhost:1337/api/organizations/${orgId}`, {
      method: 'DELETE'
    })
    const data = await response.json()

    return data
  } catch (error) {
    return error.message
  }
})

const initialState = {
  data: [],
  loading: false,
  error: null
}

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrganizations.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        console.log(state.data, 'fetchOrganizations')
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createOrganization.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.loading = false
        state.data.push(action.payload)
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateOrganization.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.loading = false
        const updatedOrganization = action.payload
        const index = state.data.findIndex(org => org.id === updatedOrganization.id)
        if (index !== -1) {
          state.data[index] = updatedOrganization
        }
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteOrganization.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false
        const orgId = action.payload
        state.data = state.data.filter(org => org.id !== orgId)
      })

      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default organizationsSlice.reducer
