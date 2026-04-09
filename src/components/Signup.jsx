import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { hasAuthConfig } from '../conf/conf'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm()

    const create = async(data) => {
        setError("")
        if (!hasAuthConfig) {
            setError("Appwrite auth is not configured yet. Add VITE_APPWRITE_URL and VITE_APPWRITE_PROJECT_ID in your .env file.")
            return
        }
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className='mx-auto w-full max-w-lg rounded-2xl border border-app-accent/50 bg-app-surface p-8 shadow-glow md:p-10'>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-semibold leading-tight text-app-text">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-app-muted">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-app-text transition-all duration-200 hover:text-app-muted hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-6 text-center text-app-danger">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8" noValidate>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Full name is required",
                            minLength: { value: 2, message: "Name should be at least 2 characters" },
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                        })}
                        />
                        <Button type="submit" className="w-full disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account..." : "Create Account"}
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup