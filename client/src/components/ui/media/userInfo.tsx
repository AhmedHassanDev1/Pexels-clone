import { getUserById } from '@/lib/api/user'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Image from 'next/image'
function userInfo({userId}:{userId:string}) {
     let { data } = useQuery({
        queryKey: ['users', { userId }],
        queryFn: () => getUserById(userId),
        enabled: !!userId
    })
  return (
  <div className="absolute left-5 flex gap-2 items-center duration-150 opacity-0 bottom-0 group-hover/wrapper:opacity-100 group-hover/wrapper:bottom-5   ">
                    <div className=" relative w-10 aspect-square rounded-full overflow-hidden">
                        <Image src={data?.data.profile_image || '/userDefaultImg.png'} fill alt='' />
                    </div>
                    <h6
                        className="text-sm text-white font-bold"
                        title={data?.data.full_name}
                    >{data?.data.full_name}</h6>
                </div>
  )
}

export default userInfo