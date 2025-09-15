"use client"
import { ToastContainer, toast } from 'react-toastify';

import { useTranslations } from "next-intl"
import { SubmitHandler, useForm } from "react-hook-form"
import CustomField from "./customField"

import { zodResolver } from "@hookform/resolvers/zod"
import { joinContributorFormSchema } from "@/lib/validator/auth"
import { createUserType } from "@/types/auth"

import { useMutation } from "@tanstack/react-query"
import { Register } from "@/lib/api/auth"
import { useRouter } from "next/navigation"
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types';

function JoinContributorFrom() {

  let t = useTranslations('RegisterPage')
  let form = useForm<createUserType>({
    resolver: zodResolver(joinContributorFormSchema)
  })

  let { register, formState, handleSubmit } = form
  let { isDirty, isLoading, isValid, errors } = formState
  let router = useRouter()
  let { mutate  } = useMutation({
    mutationFn: (data: createUserType) => Register(data),
    onSuccess: () => router.push('/'),
    onError:(error:AxiosError<ErrorResponse>)=>{
       toast.error(error?.response?.data?.message,{
         position:"bottom-center",
         hideProgressBar:true,
         pauseOnHover:false

       });
    }
  })


  let submit: SubmitHandler<createUserType> = async (data) => mutate(data)

  return (
    <div className="flex flex-col my-4 " >

      <h6 className=" text-sm text-gray-500 text-center" >sign up with your email</h6>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2 p-3 " >
        <div className="grid grid-cols-2 gap-2 w-full  ">
          <CustomField
            type="text"
            placeholder="First name"
            {...register('first_name')}
            errorMessage={errors.first_name?.message as string}

          />
          <CustomField
            type="text"
            placeholder="Last name"
            {...register('last_name')}
            errorMessage={errors.last_name?.message as string}

          />
        </div>
        <CustomField
          type="email"
          placeholder="email"
          {...register('email')}
          errorMessage={errors.email?.message as string}


        />
        <CustomField
          type="password"
          placeholder="password"
          {...register('password')}
          errorMessage={errors.password?.message as string}


        />
        <button className="w-full cursor-pointer p-3 bg-black rounded-2xl text-white">{t('registerButton')}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default JoinContributorFrom