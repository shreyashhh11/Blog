import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error = "",
    ...props
}, ref){
    const id = useId()
    const errorId = `${id}-error`
    return (
        <div className='w-full'>
            {label && <label 
            className='mb-1 inline-block pl-1 text-sm font-medium text-app-text' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`w-full rounded-lg border bg-app-surface px-3 py-2 text-app-text outline-none duration-200 placeholder:text-app-muted/70 focus:border-app-accent ${error ? "border-app-danger" : "border-app-accent/50"} ${className}`}
            ref={ref}
            {...props}
            id={id}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            />
            {error && <p id={errorId} className='mt-1 text-sm text-app-danger'>{error}</p>}
        </div>
    )
})

export default Input