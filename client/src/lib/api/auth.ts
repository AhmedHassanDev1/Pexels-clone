"use client"
import { createUserType } from "@/types/auth";
import api from "./index";




export function Register(data:createUserType) {
    
      
      return api.post('http://localhost:8000/auth/register',data)       
}


 function Login(data:any) {
      
}


