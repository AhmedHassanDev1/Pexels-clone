"use client"
import InfiniteScroll from '@/components/layout/infiniteScrollContainer'
import LoaderSpinner from '@/components/layout/loading/LoaderSpinner'
import CardWrapper from '@/components/ui/media/cardWrapper'
import { gethomeVideos } from '@/lib/api/content'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
   <InfiniteScroll
        queryKey={["homeVideosContent"]}
        queryFn={gethomeVideos}
        queryParams={{ limit: 10 }}
        loader={<LoaderSpinner/>}
        
      >  
        {(media: any[]) => (
         <div className="gallery">
            {media.map(el => {
              return <CardWrapper key={el._id} media={el} />
            })}
          </div>
        )}
      </InfiniteScroll>
  )
}

export default page