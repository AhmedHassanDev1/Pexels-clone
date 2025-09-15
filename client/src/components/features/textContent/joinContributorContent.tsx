"use client"
import { useTranslations } from "next-intl"
import { FaCircleCheck } from "react-icons/fa6";
function JoinContributorContent() {
  let t=useTranslations('RegisterPage')  
  return (
    <div className=" p-3">
       <h2 className="text-xl lg:text-2xl font-semibold">{t('description')} </h2>
       <h3 className="text-md lg:text-xl font-normal leading-12">{t('about')}</h3>
       <p className="flex gap-1 items-center leading-7 text-xs lg:text-sm font-semibold "><FaCircleCheck color="oklch(72.3% 0.219 149.579)" /> {t('features1')} </p>
       <p className="flex gap-1 items-center leading-7 text-xs lg:text-sm font-semibold "><FaCircleCheck color="oklch(72.3% 0.219 149.579)" /> {t('features2')} </p>
       <p className="flex gap-1 items-center leading-7 text-xs lg:text-sm font-semibold "><FaCircleCheck color="oklch(72.3% 0.219 149.579)" /> {t('features3')} </p>
    </div>
  )
}

export default JoinContributorContent