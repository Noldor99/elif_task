import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"

const actions = {
  // ...authActions,
}

export const useTypedDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
