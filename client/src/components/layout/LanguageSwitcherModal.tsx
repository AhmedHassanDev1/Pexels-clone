"use client"

import { closeLanguageSwitcher } from "@/store/slices/UIContextSlice";
import { useAppSelector } from "@/store/store"
import { useEffect } from "react";

import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LanguagesList } from "@/constants/languages";

import { usePathname,useRouter } from "next/navigation";
import { useLocale } from "next-intl";




function LanguageSwitcherModal() {
  let { isOpen } = useAppSelector(state => state.UIContext.languageSwitcher)
  let dispatch = useDispatch()
  let currentLocale=useLocale()
  let pathName = usePathname()
  let router=useRouter()
  
  
  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";

  }, [isOpen])
  let handleClose = () => {

    dispatch(closeLanguageSwitcher())
  }


  const changeLanguage = (locale: string) => {
    
    router.push(`/${locale}${pathName.replace(`/${currentLocale}`,'/')}`);
    handleClose();
  };

  if (!isOpen) {
    return
  }
  return (
    <dialog open={isOpen} className="modal flex justify-center items-center p-5" >
      <div className="w-full max-w-2xl bg-white rounded-2xl p-10">
        <div onClick={handleClose} className="text-right text-2xl text-gray-400 cursor-pointer">
          <IoClose />
        </div>
        <div className="p-2">
          <h2 className="text-xl">Choose your language:</h2>
          <div className="flex flex-wrap gap-4">
            {LanguagesList.map(el => (
              <div
                key={el.flag_code}
                onClick={() => changeLanguage(el.languageCode)}
                className="flex gap-2 items-center cursor-pointer p-2 rounded-2xl border-[1px] border-solid border-zinc-200">
                <span className={`fi fi-${el.flag_code}`}></span>
                <p>{el.languageName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default LanguageSwitcherModal