import React from 'react'
import {container , logo, LogoutBtn } from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector( (state) =>  state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header className='py-4 shadow bg-gray-500'>
      <container >
        <nav className='flex'>
          <div className='mr-4'>
            <Link to= '/'>
            <logo width = '70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
              {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button>{item.name}</button>
                </li>
              ) : null
              )}
          </ul>
        </nav>
      </container>
    </header>
  )
}

export default Header