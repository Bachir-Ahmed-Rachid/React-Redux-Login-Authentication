import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentToken } from './authSlice'

const RequireAuth = () => {
    const location =useLocation()
    const token=useSelector(selectCurrentToken)
    useEffect(() =>{},[token])
    
  return (
    token?(<Outlet/>):(
        <Navigate to='/login' state={{from:location}} replace/>
    )
  )
}

export default RequireAuth