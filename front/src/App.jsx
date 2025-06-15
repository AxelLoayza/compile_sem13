import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path=''  element={<Home/>}/>
        <Route path='/form'  element={<Form/>}/>
        <Route path="/form/:id" element={<Form />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
