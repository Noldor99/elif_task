import React from "react"
import { Routes, Route } from "react-router-dom"
import LayoutWrapper from "./components/layout/LayoutWrapper"
import NotFoundBlock from "./components/NotFoundBlock"
import Home from "./page/home/Home"
import User from "./page/user/User"
import BoardID from "./page/boardID/BoardID"

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="board/:id" element={<BoardID />} />
          <Route path="user" element={<User />} />
        </Route>
        <Route path="*" element={<NotFoundBlock />} />
      </Routes>
    </React.Suspense>
  )
}

export default App
