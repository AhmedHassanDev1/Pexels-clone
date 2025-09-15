"use client"
import { useTranslations } from "next-intl"
import Link from "next/link"


function NotFound() {
    let t = useTranslations('gallery.not_found')
   
  
    
    return (
        <div className="w-full max-w-3xl self-center rounded-md border-2 border-solid border-zinc-400 p-10 flex flex-col gap-6 items-center text-center ">
            <h1 className="text-4xl font-bold">{t('title')}</h1>
            <p className="title-6">{t('description')}</p>
            <div className="black-button w-fit">
                <Link  href={`/`}  >
                    {t('redirect_button')}
                </Link>
            </div>
        </div>
    )
}

export default NotFound