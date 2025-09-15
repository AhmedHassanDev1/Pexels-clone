"use client"
import InfiniteScroll from "@/components/layout/infiniteScrollContainer";
import CardWrapper from "@/components/ui/media/cardWrapper";
import { gethomeContent } from "@/lib/api/content";
export default function Home() {

  return (
    <div className=" ">

      <InfiniteScroll
        queryKey={["homeContent"]}
        queryFn={gethomeContent}
        queryParams={{ limit: 10 }}
        loader={<div className="spinner"></div>}
        
      >  
        {(media: any[]) => (
         <div className="gallery">
            {media.map(el => {
              return <CardWrapper key={el._id} media={el} />
            })}
          </div>
        )}
      </InfiniteScroll>

    </div>
  );
}
