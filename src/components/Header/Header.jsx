import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

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
    <header className='sticky top-0 z-30 border-b border-app-accent/50 bg-app-bg/95 py-4 backdrop-blur'>
      <Container>
        <nav className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <div className='sm:mr-4'>
            <Link to='/' aria-label="Go to homepage">
              <Logo />

              </Link>
          </div>
          <ul className='flex w-full items-center gap-1 overflow-x-auto pb-1 sm:ml-auto sm:w-auto sm:justify-end sm:overflow-visible sm:pb-0' aria-label='Primary navigation'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <NavLink
                to={item.slug}
                className={({ isActive }) =>
                  `inline-block whitespace-nowrap rounded-full px-3 py-2 text-xs duration-200 sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-app-surface2 text-app-text"
                      : "text-app-muted hover:bg-app-surface2 hover:text-app-text"
                  }`
                }
                >{item.name}</NavLink>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header