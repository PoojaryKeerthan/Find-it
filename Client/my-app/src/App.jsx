import './App.css'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './Views/Home'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Addlostproduct from './Components/Addlostproduct'
import AddfoundProduct from './Components/AddfoundProduct'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Addlostproduct' element={<Addlostproduct/>}/>
          <Route path='/Addfoundproduct' element={<AddfoundProduct/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
