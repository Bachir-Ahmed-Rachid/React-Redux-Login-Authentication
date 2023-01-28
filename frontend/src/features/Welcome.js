import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentToken, selectCurrentUser } from './auth/authSlice'

const Welcome = () => {
    const user= useSelector(selectCurrentUser)
    const token= useSelector(selectCurrentToken)

    const welcome=user?` Welcome ${user}`:'welcome'
    const tokenAbbr=`${token.slice(0,9)}....`
    const content=
    <>
        <h1>{welcome}</h1>
        <p>Token:{tokenAbbr}</p>
        <p><Link to='/userLIst'>Goals list</Link></p>
    </>

  return (
    content
  )
}

export default Welcome