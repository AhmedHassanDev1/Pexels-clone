"use client"
import { useTranslations } from "next-intl"

function page() {
  let t=useTranslations('home')
  return (
   <div className='grid grid-cols-2 gap-2'>
      <h1 className='title-1 text-black'>{t('videos')}</h1>
    </div>
  )
}

export default page