"use client"
import Image from "next/image"

function profileImage({ userId, src }: { userId: string, src: string | undefined | null }) {

    return (
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
                className="rounded-full"
                src={src||'/userDefaultImg.png'}
                fill
                alt="profile-image" />
        </div>
    )
}

export default profileImage