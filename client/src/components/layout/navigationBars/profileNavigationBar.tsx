"use client"
import Link from "next/link"
import NavigationBar from "./navigationBarWrapper"
import { navigationBarListProfile } from "@/constants/lists"
import { useParams, usePathname } from "next/navigation"
import { UserStatisticsType } from "@/types/user"
import { NumberCompactFormat } from "@/lib/format"

function profileNavigationBar({userStatistics}:{userStatistics:UserStatisticsType}) {
    let { id } = useParams()
    let pathName = usePathname()
    

    return (
        <NavigationBar>
            <div className="flex gap-2">
                {navigationBarListProfile.map(el => {
                    return <div
                        key={el.id}
                        className={`navigation-bar-item ${pathName.endsWith(el.href)&&"active"}`}>
                        <Link href={`/${id}/${el.href}`}>{el.title}</Link>
                        {el.stat&&<span className="">{NumberCompactFormat(userStatistics[el.stat]||0)}</span>}
                    </div>
                })}
            </div>
        </NavigationBar>
    )
}

export default profileNavigationBar