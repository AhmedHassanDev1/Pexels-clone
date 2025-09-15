"use client"
import LoaderSpinner from '@/components/layout/loading/LoaderSpinner'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'



export default function MyLineChart({userId,fn}:{userId:string|null,fn:()=>any}) {
  let {data,isLoading}=useQuery({
    queryKey:[],
    queryFn:()=>fn(userId),
    enabled: !!userId
  })
  if (isLoading) {
     <div className="w-full h-96 flex justify-center">
         <LoaderSpinner/>
     </div>
  }
  return (
    <div className="w-full h-96 ">
      <ResponsiveContainer>
        <LineChart
          data={data?.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="date" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
       </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
