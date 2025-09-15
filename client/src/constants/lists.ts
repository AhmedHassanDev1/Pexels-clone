import { FiUser } from "react-icons/fi";
import { PiBookmarkSimpleLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { SlRocket } from "react-icons/sl";
import { GrLanguage } from "react-icons/gr";

export const userDropDownList = [
    {
        title: 'your profile',
        icon: FiUser,
        href: '/gallery',
        key:'1'
    },
    {
        title: 'your collections',
        icon: PiBookmarkSimpleLight,
        href: '/collections',
        key:'2'


    },
    {
        title: 'setting',
        icon: IoSettingsOutline,
        href: '/edit-profile',
        key:'3'


    },
]

export const exploreDropDownList=[
    {
        title: 'Discover Photos',
        icon: GrLanguage,
        href: '/',
        key:'1'
    },
    {
        title: 'leaderboard',
        icon: SlRocket,
        href: '/leaderboard',
        key:'2'
    },
    {
        title: 'free Videos',
        icon: MdOutlineSlowMotionVideo,
        href: '/videos',
        key:'3'
    },
]

export const navigationBarListHome=[
    {
      id:1,
        title:"home",
        href:"/",   
    },
     {
      id:2,
        title:"videos",
        href:"/videos",   
    },
     {
      id:3,
        title:"leaderboard",
        href:"/leaderboard",   
    }

]

export const navigationBarListProfile=[
    {
        id:1,
        title:"highlights",
        href:"/highlights",
        stat:"views_count"
    },
     {
        id:2,
        title:"gallery",
        href:"/gallery",
        stat:"assets_count"
    },
     {
        id:3,
        title:"collections",
        href:"/collections",
    },
     {
        id:4,
        title:"statistics",
        href:"/stat",
    },
     {
        id:5,
        title:"followers",
        href:"/followers",
        stat:"followers_count"
    },
    {
        id:6,
        title:"following",
        href:"/following",
        stat:"following_count"

    },
]

