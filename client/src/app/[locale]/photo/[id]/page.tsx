"use client"
import InteractionsSection from '@/components/features/media/interactionsSection'
import MediaContainer from '@/components/features/media/MediaContainer'
import UserSection from '@/components/features/media/userSection'
import { getMediaById } from '@/lib/api/content'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

function page() {
  let { id } = useParams()
  let { data } = useQuery({
    queryKey: ['media', id],
    queryFn: () => getMediaById(id as string),
    enabled: !!id
  })
  let router = useRouter()
  let t = useTranslations('MediaPage')
  return (
    <div className='w-full min-h-screen flex flex-col items-center '>
      <header className='w-full sticky top-20 p-5 bg-white z-50 '>
        <div className="flex justify-between">
          {/* user and interactions section */}
          <UserSection userId={data?.data?.user} />
          <InteractionsSection media={data?.data} />
        </div>
      </header>
      {/* media section */}
      {data?.data && <MediaContainer media={data?.data} />}
      <h3 className=' title-4'>{t('more_content')}</h3>
    </div>
  )
}

export default page