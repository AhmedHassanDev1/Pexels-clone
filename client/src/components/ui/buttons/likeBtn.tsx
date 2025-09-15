"use client"


import { Like, unLike } from "@/lib/api/interactions"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

type LikeBtnProps = {
    children: (isLike: boolean | null | undefined, likesCount: number) => React.ReactNode,
    mediaId: string
    Liked: boolean | null | undefined
    likesCount: number
}
function LikeBtn({ children, mediaId, Liked, likesCount }: LikeBtnProps) {
    let [count, setCount] = useState(likesCount)
    let [isLike, setLike] = useState(Liked)
    let { status: LikeStatus, mutate: like } = useMutation({
        mutationKey: ['user', mediaId],
        mutationFn: Like,
        onError: (err) => console.log(err)

    })
    let { status: unLikeStatus, mutate: unlike } = useMutation({
        mutationKey: ['user', mediaId],
        mutationFn: unLike,
        onError: (err) => console.log(err)


    })
    let onClick = () => {
        if (isLike) {
            unlike(mediaId)
            setCount(count--)

        } {
            like(mediaId)
            setCount(count++)
        }

        setLike(!isLike)
    }
    return (
        <div onClick={onClick}>{children(isLike, count)}</div>
    )
}

export default LikeBtn