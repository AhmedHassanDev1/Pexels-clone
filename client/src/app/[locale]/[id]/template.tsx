"use client"
import { useParams } from "next/navigation";
import { useEffect } from "react";


function Template({
    children,

}: {
    children: React.ReactNode;

}) {
    let { id } = useParams()
    useEffect(() => {
        window.sessionStorage.setItem('profile_id', id as string)
       
    }, [id])
    return (
        <>
            {children}
        </>
    )
}

export default Template