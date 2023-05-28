import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
  usernames: [],
  loading: false,
  error: null
}

// Create the async thunk for fetching usernames
export const fetchUsernames = createAsyncThunk('usernames/fetchUsernames', async () => {
  const response = await fetch('http://localhost:1337/api/usernames')
  const data = await response.json()

  return data.data
})

// Create the async thunk for creating a username
export const createUser = createAsyncThunk('usernames/createUser', async userData => {
  const response = await fetch('http://localhost:1337/api/usernames', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()

  return data
})

// Create the async thunk for updating a username
export const updateUser = createAsyncThunk('usernames/updateUser', async userData => {
  try {
    const response = await fetch(`http://localhost:1337/api/usernames/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    console.log(data, 'data')

    return data
  } catch (error) {
    throw new Error('Failed to update user')
  }
})

// Create the async thunk for deleting a username
export const deleteUser = createAsyncThunk('usernames/deleteUser', async userId => {
  await fetch(`http://localhost:1337/api/usernames/${userId}`, {
    method: 'DELETE'
  })

  return userId
})

// Create the slice
const usernamesSlice = createSlice({
  name: 'usernames',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsernames.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsernames.fulfilled, (state, action) => {
        state.loading = false
        state.usernames = action.payload
      })
      .addCase(fetchUsernames.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.usernames.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.data // Access the updated user data
        const updatedUserIndex = state.usernames.findIndex(user => user.id === updatedUser.id)
        if (updatedUserIndex !== -1) {
          // Create a new array with the updated user
          const updatedUsernames = [...state.usernames]
          updatedUsernames[updatedUserIndex] = updatedUser

          // Update the state with the new array
          state.usernames = updatedUsernames
          console.log('Updated usernames:', updatedUsernames)
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.payload
        state.usernames = state.usernames.filter(user => user.id !== deletedUserId)
      })
  }
})

// Export the action creators and reducer
export const usernamesActions = {
  fetchUsernames,
  createUser,
  updateUser,
  deleteUser
}

export default usernamesSlice.reducer
