import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { hasAuthConfig } from './conf/conf'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!hasAuthConfig) {
      dispatch(logout())
      setLoading(false)
      return
    }

    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen bg-app-bg text-app-text'>
      <Header />
      <main className='min-h-[calc(100vh-13rem)]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='flex min-h-screen items-center justify-center bg-app-bg text-app-muted'>
      Loading app...
    </div>
  )
}

export default App