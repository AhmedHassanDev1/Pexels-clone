"use client"
import { useTranslations } from "next-intl"

function page() {
  let t=useTranslations('home.leaderboard')
  return (
   <div className='flex flex-col items-center gap-2'>
      <h1 className='title-1 text-black'>{t('title')}</h1>
      <p className=" text-gray-500 text-lg">{t('description')}</p>
    </div>
  )
}

export default page