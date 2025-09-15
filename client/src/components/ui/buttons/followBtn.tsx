"use client"

import { Follow, unFollow } from "@/lib/api/user"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

type followBtnProps = {
    children: (isFollow: boolean | null | undefined) => React.ReactNode,
    userId: string
    isFollowing: boolean | null | undefined
}
function followBtn({ children, userId, isFollowing }: followBtnProps) {

    let [isFollow, setFollow] = useState(isFollowing)
    let { status: followStatus, mutate: follow } = useMutation({
        mutationKey: ['user'],
        mutationFn: Follow,
        onError: (err) => setFollow(!isFollow)

    })
    let { status: unFollowStatus, mutate: unfollow } = useMutation({
        mutationKey: ['user'],
        mutationFn: unFollow,
        onError: (err) => setFollow(!isFollow)

    })
    let onClick = () => {
        if (isFollow) {
            unfollow(userId)
        } {
            follow(userId)
        }

        setFollow(!isFollow)
    }
    return (
        <div onClick={onClick}>{children(isFollow)}</div>
    )
}

export default followBtn