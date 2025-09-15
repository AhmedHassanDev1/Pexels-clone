import React from 'react'
import JoinContributorFrom from '@/components/features/auth/joinContributorForm'
import JoinContributorContent from '@/components/features/textContent/joinContributorContent'
import Image from 'next/image'


function page() {
  return (
    <section className='w-full min-h-[calc(100vh-300px)] p-2 gap-x-3  join-contributor-grid justify-center '>
       <JoinContributorContent/>
       <JoinContributorFrom/>
       <div className="flex relative h-96 lg:h-auto lg:aspect-square justify-center items-center -order-1 lg:order-3 lg:row-span-2 overflow-hidden rounded-3xl max-h-[calc(100vh-150px)]">
         <Image 
          width={600}
          height={600}
          className=' absolute w-full h-full'
          objectFit='cover'
          src={'/joinContributorImg.jpg'} 
           alt='register image' />
       </div>
    </section>
  )
}

export default page