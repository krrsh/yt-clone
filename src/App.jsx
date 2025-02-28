import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' 
import Home from './pages/Home'
import Video from './pages/Video'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/video/:id' element={<Video />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
