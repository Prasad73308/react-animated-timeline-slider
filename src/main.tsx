import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
// import VerticalScroll from './VerticalScroll.tsx'
import HorizontalScroll from './HorizontalScroll.tsx'
import NavBar from './NavBar.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import VerticalScroll from './VerticalScroll.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/vertical/' element={<VerticalScroll/>}/>
      <Route path='/horizontal' element={<HorizontalScroll/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
