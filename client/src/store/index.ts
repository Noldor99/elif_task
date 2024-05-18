import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { todoReducer } from "./slice/todoSlice"

const rootReducer = combineReducers({
  todo: todoReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }),
  devTools: true,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
