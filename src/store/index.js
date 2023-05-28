// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import organizations from 'src/store/apps/organization'
import schools from 'src/store/apps/schools'
import usernames from 'src/store/apps/usernames'
import teachers from 'src/store/apps/teachers'
import classes from 'src/store/apps/class'
import students from 'src/store/apps/student'

export const store = configureStore({
  reducer: {
    organizations,
    schools,
    teachers,
    students,
    usernames,
    user,
    classes,
    chat,
    email,
    invoice,
    calendar,
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
