"use client"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useParams } from "next/navigation"

function NotFound() {
    let t = useTranslations('highlights.not_found')
    let {id}=useParams()
  
    
    return (
        <div className="w-full max-w-xl self-center rounded-md bg-gray-100 p-5 flex flex-col gap-6 items-center text-center ">
            <h1 className="title-3">{t('title')}</h1>
            <p className="title-6">{t('description')}</p>
            <div className="black-button w-fit">
                <Link
                    href={`/${id}/gallery`}
                    >
                    {t('redirect_button')}
                </Link>
            </div>
        </div>
    )
}

export default NotFound