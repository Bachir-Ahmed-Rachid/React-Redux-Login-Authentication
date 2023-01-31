import React from 'react'
import { Route,Routes} from "react-router-dom"
import Login from './features/auth/Login'
import Layout from './components/Layout'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/Welcome'
import Nav from './components/Nav'
import GoalsScreen from './features/goals/GoalsScreen'
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div className='container'>
     
      <Nav/>

      
    <ToastContainer />
    <Routes>
          <Route path='/' element={<Layout/>} exact>
            {/* Public Routes */}
            <Route path='login' element={<Login/>}/>


            {/* Protected Routes */}
            <Route element={<RequireAuth/>}>
                <Route path='welcome' element={<Welcome/>}/>
                <Route path='goals' element={<GoalsScreen/>}/>
            </Route>
            
          </Route>
        </Routes>
    </div>
   
  )
}

export default App