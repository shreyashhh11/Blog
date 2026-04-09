import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo'

function Footer() {
  return (
    <footer className="border-t border-app-accent/50 bg-app-surface/80 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="text-sm text-app-muted">
            Thoughtful writing for curious readers.
          </p>
        </div>
        <div className="flex flex-wrap gap-y-8">
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-app-muted">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-app-text hover:text-app-accent" to="/">Home</Link></li>
              <li><Link className="text-app-text hover:text-app-accent" to="/all-posts">All Posts</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-app-muted">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-app-text hover:text-app-accent" to="/login">Login</Link></li>
              <li><Link className="text-app-text hover:text-app-accent" to="/signup">Signup</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-app-muted">Writing</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-app-text hover:text-app-accent" to="/add-post">Create Post</Link></li>
              <li><Link className="text-app-text hover:text-app-accent" to="/all-posts">Browse Ideas</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-app-muted">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-app-text hover:text-app-accent" to="/">Terms</Link></li>
              <li><Link className="text-app-text hover:text-app-accent" to="/">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-app-muted">© {new Date().getFullYear()} openblog. Ideas, experiences, and lessons shared with care.</p>
      </div>
    </footer>
  )
}

export default Footer