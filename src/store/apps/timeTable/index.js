import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  timeTables: [],
  loading: false,
  error: null
}

export const fetchTimeTables = createAsyncThunk('timeTables/fetchTimeTables', async () => {
  const response = await fetch('http://localhost:1337/api/time-tables')
  const data = await response.json()

  return data.data
})

export const createTimeTable = createAsyncThunk('timeTables/createTimeTable', async timeTableData => {
  const response = await fetch('http://localhost:1337/api/time-tables', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(timeTableData)
  })
  const data = await response.json()

  return data
})

export const updateTimeTable = createAsyncThunk('timeTables/updateTimeTable', async timeTableData => {
  try {
    const response = await fetch(`http://localhost:1337/api/time-tables/${timeTableData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timeTableData)
    })
    const data = await response.json()

    return data
  } catch (error) {
    throw new Error('Failed to update time-table')
  }
})

export const deleteTimeTable = createAsyncThunk('timeTables/deleteTimeTable', async timeTableId => {
  await fetch(`http://localhost:1337/api/time-tables/${timeTableId}`, {
    method: 'DELETE'
  })

  return timeTableId
})

const timeTablesSlice = createSlice({
  name: 'timeTables',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTimeTables.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTimeTables.fulfilled, (state, action) => {
        state.loading = false
        state.timeTables = action.payload
      })
      .addCase(fetchTimeTables.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createTimeTable.fulfilled, (state, action) => {
        state.timeTables.push(action.payload)
      })
      .addCase(updateTimeTable.fulfilled, (state, action) => {
        const updatedTimeTable = action.payload.data
        const updatedTimeTableIndex = state.timeTables.findIndex(t => t.id === updatedTimeTable.id)
        if (updatedTimeTableIndex !== -1) {
          const updatedTimeTables = [...state.timeTables]
          updatedTimeTables[updatedTimeTableIndex] = updatedTimeTable
          state.timeTables = updatedTimeTables
          console.log('Updated time-tables:', updatedTimeTables)
        }
      })
      .addCase(deleteTimeTable.fulfilled, (state, action) => {
        const deletedTimeTableId = action.payload
        state.timeTables = state.timeTables.filter(t => t.id !== deletedTimeTableId)
      })
  }
})

export const timeTablesActions = {
  fetchTimeTables,
  createTimeTable,
  updateTimeTable,
  deleteTimeTable
}

export default timeTablesSlice.reducer
