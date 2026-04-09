import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-app-text",
    textColor = "text-app-surface",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`rounded-lg px-4 py-2 font-medium transition duration-200 hover:opacity-90 ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}