"use client"

import { updateProfileImage } from "@/lib/api/user"
import { updateCurrentUserImage } from "@/store/slices/CurrrentuserSlice"
import { AppDispatch, useAppSelector } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"


function EditeProfileImage() {
    let currrentUser = useAppSelector(state => state.meState)
    let dispatch = useDispatch<AppDispatch>()
    let { mutate, isPending } = useMutation({
        mutationFn: updateProfileImage,
        onSuccess: (data) => {
            dispatch(updateCurrentUserImage(data.data.url))
        }
    })
    let [image, setImage] = useState({})
    let src = currrentUser.data.profile_image || '/userDefaultImg.png'
    let onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file: File | undefined = e.target.files?.[0]
        let formData = new FormData()
        if (file) {
            formData.append('image', file)
            mutate(formData)
        }
    }
    return (
        <div className="flex gap-8 items-center ">
            <div className="w-28 aspect-square relative rounded-full overflow-hidden">
                <Image src={src} fill alt={'profile image'} objectFit="cover" />
            </div>
            {isPending ?
                <>
                    <span className="loader"></span>
                </>
                : <>
                    <label
                        htmlFor="change-image"
                        className=" cursor-pointer rounded-2xl bg-emerald-400 hover:bg-emerald-500 p-3 text-white font-semibold"
                    >Change image</label>
                    <input
                        id="change-image"
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jepg"
                        onChange={onSelect}
                    />
                </>}
               

        </div>
    )
}

export default EditeProfileImage