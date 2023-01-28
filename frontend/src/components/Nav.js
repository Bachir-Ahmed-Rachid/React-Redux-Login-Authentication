import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser ,FaAlignJustify} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, selectCurrentUser } from '../features/auth/authSlice'

const Nav = () => {
  const dispatch=useDispatch()
  const user= useSelector(selectCurrentUser)
  const handelLogout=()=>{
    dispatch(logout())
    
  }
  return (
    <header className='header'>
    <div className='logo'>
      <Link to='/'>GoalSetter</Link>
    </div>
    <ul>
      {user?(
        <>
          <li>
            <Link onClick={handelLogout}>
              <FaSignOutAlt /> Logout
            </Link>
          </li>

          <li>
            <Link to='/goals'>
              <FaAlignJustify /> Goals
            </Link>
          </li>
        </>):(
        <>
          <li>
            <Link to='/login'>
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to='/register'>
              <FaUser /> Register
            </Link>
          </li>
        </>)}
    </ul>
  </header>
  )
}

export default Nav