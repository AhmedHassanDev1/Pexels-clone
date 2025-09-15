"use client"
import { userInterface } from "@/types/user"
import Image from "next/image"
import Link from "next/link"
import { editeProfileRoute } from "@/constants/router"
import { useTranslations } from "next-intl"
import { LuSquarePen } from "react-icons/lu";
import { NumberCompactFormat } from "@/lib/format"
import { useSelector } from "react-redux"
import { useAppSelector } from "@/store/store"
function profileDetails({ user }: { user: userInterface }) {
    let { profile_image, _id, full_name, bio,statistics } = user
    let t = useTranslations('buttons')
    let currentUser = useAppSelector(state => state.meState)
    return (
        <section className="flex flex-col gap-3 justify-center items-center p-12">
            {profile_image &&
                <div className=" w-[10%]  aspect-square relative rounded-full overflow-hidden">
                    <Image
                        src={profile_image||'/userDefaultImg.png'}
                        alt="profile-image"
                        fill
                        objectFit="cover"
                    />
                </div>}
            <h1 className="title-2">{full_name}</h1>
            {currentUser.data._id === _id ? <div className="w-fit submit-button">
                <Link
                    href={editeProfileRoute}
                    className="flex gap-2 items-center">
                    <LuSquarePen size={20} />
                    {t('edite_profile')}
                </Link>
            </div> : <></>}
            <p className="text-gray-500 text-sm  max-w-5/6 font-semibold text-center">{bio}</p>
            <div className="">
                {statistics?.views_count && <div className="flex flex-col items-center">
                    <h6 className="text-gray-500 text-sm font-semibold">Total Views</h6>
                    {NumberCompactFormat(statistics?.views_count)}
                </div>}
            </div>
        </section>
    )
}

export default profileDetails