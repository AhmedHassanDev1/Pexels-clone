
"use client"
import { useContext } from "react"
import { useTranslations } from "next-intl"
import { UploadContext } from "@/app/[locale]/upload/page"
function uploadForm({id}:{id:string}) {
    let t = useTranslations("inputs")
    let { mediaInfo, setMediaInfo } = useContext(UploadContext) || {}
    
    return (
        <form className="w-full max-w-3xl space-y-6">
            <div className="flex gap-1 flex-col ">
                <label className=" first-letter:uppercase text-sm text-gray-600 font-semibold">{t("title")}</label>
                <input
                    className="bg-white rounded-md p-2"
                    type="text"
                    
                />
            </div>
            <div className="flex gap-1 flex-col">
                <label className=" first-letter:uppercase text-sm text-gray-600 font-semibold">{t("tags")}</label>
                <input
                    className="bg-white rounded-md p-2"
                    type="text"
                   
                />
            </div>
            <div className="flex gap-1 flex-col">
                <label className=" first-letter:uppercase text-sm text-gray-600 font-semibold">{t("location")}</label>
                <input
                    className="bg-white rounded-md p-2"
                    type="text"
                    
                />
            </div>
        </form>
    )
}

export default uploadForm