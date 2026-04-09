import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block whitespace-nowrap rounded-full border border-app-accent bg-app-surface px-3 py-2 text-xs text-app-text duration-200 hover:bg-app-accent2 sm:px-4 sm:text-sm'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn