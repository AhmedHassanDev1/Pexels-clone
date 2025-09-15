"use client"
import { getMediaById } from "@/lib/api/content"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import ProfileImage from "./profileImage"
import { userInterface } from "@/types/user"
import { getUserById } from "@/lib/api/user"
import FollowButton from "@/components/ui/buttons/followBtn"
function userSection({ userId }: { userId: string }) {
    
    let { data } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId
    })
    let user = data?.data

    return (
        <div className="flex gap-2 items-center">
            {user && <ProfileImage userId={user?._id} src={user?.profile_image} />}
            <div className="">
                <h6>{user?.full_name}</h6>
                <FollowButton userId={userId} isFollowing={user?.is_follow}>
                    {(isFollow) => (
                        <div className="text-lg font-semibold cursor-pointer">
                            {isFollow ? "following" : "Follow"}
                        </div>
                    )}
                </FollowButton>
            </div>
        </div>
    )
}

export default userSection