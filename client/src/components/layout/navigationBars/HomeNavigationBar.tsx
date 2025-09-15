"use client"
import { navigationBarListHome } from "@/constants/lists"
import NavigationBar from "./navigationBarWrapper"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

function HomeNavigationBar() {
    let t=useTranslations('keyword') 
    let pathName = usePathname().split('/')[2] || ''
    let [activeLink, setActiveLink] = useState<string>()
    useEffect(() => {
        setActiveLink('home')
    }, [])

    return (
        <NavigationBar>
            {navigationBarListHome.map(el => {
               return <div
                    key={el.id}
                    className={`navigation-bar-item ${activeLink === el.title && "active"}`}
                    onClick={() => setActiveLink(el.title)}
                >  
                    <Link href={el.href}>
                        {t(el.title)}
                    </Link>
                </div>
            })}
        </NavigationBar>
    )
}

export default HomeNavigationBar