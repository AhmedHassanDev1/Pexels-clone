"use client"

import { forwardRef } from "react";


type FieldProps = {
    errorMessage?: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomField = forwardRef<HTMLInputElement, FieldProps>(
    ({ errorMessage, ...props }, ref) => {
        console.log(errorMessage);
        
        return (
            <div className="flex flex-col">
                <input
                    ref={ref}
                    {...props}
                    className={`w-full relative z-10 bg-white outline-none border rounded-md px-3 py-2 
                         ${errorMessage ? "border-red-500" : "border-gray-300"}`}
                />
                {errorMessage && (
                    <span className="p-2 pt-3 -translate-y-1 text-sm rounded-[0px_0px_8px_8px] text-red-500 bg-red-100">{errorMessage}</span>
                )}
            </div>
        );
    }
);

CustomField.displayName = "CustomField"; // مهم مع forwardRef

export default CustomField;
