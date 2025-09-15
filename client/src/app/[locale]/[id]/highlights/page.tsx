"use client"
import { notFound, useParams } from 'next/navigation'

import { getHighlights  } from '@/lib/api/content'
import { useEffect, useState } from 'react'

import CardWrapper from '@/components/ui/media/cardWrapper'
import InfiniteScroll from '@/components/layout/infiniteScrollContainer'
import LoaderSpinner from '@/components/layout/loading/LoaderSpinner'

function page() {
  let [userId,setUserId]=useState<string|null>(null);
  useEffect(() => {
    if (window) {
     setUserId(window?.sessionStorage.getItem('profile_id'))
    }
  }, [])
      
  
  return <InfiniteScroll
    queryKey={["gallery",userId||" "]}
    queryFn={getHighlights}
    queryParams={{ userId, limit: 10 }}
    onNotFoundContent={notFound}
    loader={<LoaderSpinner/>}
  >
    {(media: any[]) => (
      <div className="gallery">
        {media.map((el) => {
          return <CardWrapper key={el._id} media={el} />
        })}
      </div>
    )}

  </InfiniteScroll>
}

export default page