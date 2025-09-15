"use client"

import Milestones from "@/components/features/stat/Milestones";
import LoaderSpinner from "@/components/layout/loading/LoaderSpinner";
import { getUserStatistics } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import MyLineChart from "@/components/ui/charts/MyLineChart";
import NavigationBar from "@/components/layout/navigationBars/navigationBarWrapper";
import { StatisticsList } from "@/constants/stat";
import { NumberCompactFormat } from "@/lib/format";
function page() {
  let [userId, setUserId] = useState<string | null>(null);
  let [statisticsType, setStatisticsType] = useState<string>('views')
  
  useEffect(() => {
    if (window) {
      setUserId(window?.sessionStorage.getItem('profile_id'))
    }
  }, [])
  let { data, isLoading } = useQuery({
    queryKey: ['statistics', userId],
    queryFn: () => getUserStatistics(userId as string),
    enabled: !!userId
  })
  let statistics = data?.data?.statistics

  
  return (
    <div className=' space-y-5'>
      {!isLoading ?
        <>
          <Milestones views_count={statistics?.views_count} />
          <div className="w-full border-solid border-[1px] border-zinc-200">
            <MyLineChart 
             userId={userId}
             fn={StatisticsList.find(el=>el.title==statisticsType)?.fnStatistics}
              />
            <NavigationBar>
              <div className="w-[90vw] flex gap-5">
                {StatisticsList.map(el => (
                  <div
                    className="flex-1 border-[1px] border-zinc-300 border-solid p-10 rounded-2xl cursor-pointer"
                    style={{backgroundColor:el.title===statisticsType?el.color:"white"}}
                    key={el.color}
                    onClick={() => setStatisticsType(el.title)}
                  >
                    <h3 className=' text-zinc-500 text-2xl font-bold'>{el.title}</h3>
                    {statistics&&<p className=" text-2xl text-black font-bold">{NumberCompactFormat(statistics[el.type])}</p>}
                  </div>
                ))}
              </div>
            </NavigationBar>
          </div>
        </> :
        <div className="w-full flex justify-center">
          <LoaderSpinner />
        </div>}

    </div>
  )
}

export default page