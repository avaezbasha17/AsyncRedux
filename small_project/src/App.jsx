import Home from './Component/Home'
import Login from './Component/Login'
import Register from './Component/Register'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path='/login'></Route>
          <Route element={<Register />} path='/register' />
          <Route element={<Home />} path='/home' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
