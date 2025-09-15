"use client"

import { mediaInterface } from "@/types/media"
import Image from "next/image"
import { LiaCheckCircleSolid } from "react-icons/lia";
import { FaAudioDescription } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import MediaDetailsSection from "./mediaDetailsSection";
function MediaContainer({ media }: { media: mediaInterface }) {
    let { details, title, url, colors, type } = media
    let t = useTranslations('MediaPage')
    return (
        <section className="w-full flex flex-col items-center gap-3   rounded-3xl p-10">
            <div className={`${details.width > details.height ? 'w-full lg:w-[90%]' : 'w-1/2'}`}>
                {type==='image' ?
                    <div
                        className="relative w-full "
                        style={{
                            aspectRatio: details.width / details.height
                        }}>
                        <Image src={url} fill alt="" />
                    </div>
                    : null}
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="">
                    <p className="font-semibold  flex gap-1 items-center text-gray-600">
                        <LiaCheckCircleSolid size={20} />
                        {t('free_content')}
                    </p>
                    {title && <div className="flex items-center gap-2 text-gray-600">
                        <FaAudioDescription size={20} />
                        <p className=" text-sm font-semibold ">{title}</p>
                    </div>}
                </div>
                <MediaDetailsSection  media={media}/>
            </div>
        </section>
    )
}

export default MediaContainer