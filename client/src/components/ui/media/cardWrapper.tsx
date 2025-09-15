"use client"
import { useQuery } from "@tanstack/react-query"
import { mediaInterface } from "@/types/media"
import { getUserById } from "@/lib/api/user"
import ImageCard from "./imageCard"
import UserInfo from "./userInfo"
import Link from "next/link"
function cardWrapper({ media }: { media: mediaInterface }) {
    let { _id, user: userId, url, type, status, details: { width, height } } = media


    return (
        <div
            className={`group/wrapper relative overflow-hidden bg-gray-300 rounded-lg gallery-item `}
            style={{ aspectRatio: width / height }}>
            <ImageCard src={url} />
            <div className="absolute cursor-pointer inset-0 z-20">
                <Link
                    href={`/photo/${_id}`}
                    className="absolute inset-0">
                    {/* user info */}
                    <UserInfo userId={userId} />
                    <div className=""></div>
                    <div className=""></div>
                </Link>
            </div>



        </div>
    )
}

export default cardWrapper