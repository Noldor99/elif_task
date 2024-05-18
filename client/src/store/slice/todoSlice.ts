import { createSlice } from "@reduxjs/toolkit"

interface ITodoState {}

const initialState: ITodoState = {}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {},
  },
})

export const todoActions = todoSlice.actions

export const todoReducer = todoSlice.reducer
