import { cookies } from "next/headers";
import ProfileDetails from "@/components/features/user/profileDetails";
import ProfileNavigationBar from "@/components/layout/navigationBars/profileNavigationBar";


async function layout({
    children,
    params

}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>

}) {
    let { id } = await params
    const cookieStore = await cookies();
    const token = cookieStore.get('access-token')?.value;

    let data = await fetch("http://localhost:8000/users/details/" + id, {
        headers: {
            "Cookie": "access-token=" + token
        }
    });
    let user = await data.json()
    let userId = user._id
  
    return (
        <div className=" flex flex-col  gap-2">
            <ProfileDetails user={user} />
            <ProfileNavigationBar userStatistics={user?.statistics} />
            {children}

        </div>
    )
}

export default layout