import { createContext, useReducer, useState } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        tasks: action.payload
      }
    case 'CREATE_TASK':
      return {
        tasks: [action.payload, ...state.tasks]
      }
    case 'UPDATE_TASK':
      return {
        tasks: [...state.tasks]
      }
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter(w => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null
  })
  const [mode, setMode] = useState("dark")
  const [loading, setLoading] = useState("")
  const [tasck, setTasck] = useState("")

  return (
    <TasksContext.Provider value={{ ...state, dispatch, mode, setMode, loading, setLoading, tasck, setTasck }}>
      {children}
    </TasksContext.Provider>
  )
}