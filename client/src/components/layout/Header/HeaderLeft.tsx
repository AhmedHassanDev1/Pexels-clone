"use client"
import LicenseLink from "@/components/ui/links/licenseLink"
import UploadLink from "@/components/ui/links/uploadLink"
import UserImg from "@/components/features/user/userImg"
import LanguageBtn from "@/components/ui/buttons/languageBtn"
import ExploreBtn from "@/components/ui/buttons/exploreBtn"
import { useAppSelector } from "@/store/store"
function HeaderLeft() {
  let state = useAppSelector(state => state.meState);
  let user = state.data

  return (
    <nav className="flex gap-2 items-center">
      {user ? <>
        <ExploreBtn />
        <LanguageBtn />
        <LicenseLink />
        <UserImg />
        <UploadLink />
      </> : <>
      </>}

    </nav>
  )
}

export default HeaderLeft