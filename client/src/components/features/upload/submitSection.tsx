"use client"
import { UploadContext } from "@/app/[locale]/upload/page"
import { submitMediaDetails } from "@/lib/api/upload"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useContext } from "react"
function submitSection() {
  const { media, mediaInfo, publish_ids,setMedia } = useContext(UploadContext) || {}
  let { mutate } = useMutation({
    mutationFn: submitMediaDetails
  })
  let onSubmitMediaDetails = () => {
    let body = {
      "title": "title",
      "tags": [],
      "location": "giza"
    }

    if (media?.length) {
      for (const m of media) {
        let media_id = publish_ids?.find(el => el.file_id == m.id)?.publish_id
        if (media_id) {
          mutate(media_id,body)
        }

      }
    }
    setMedia([])
  }


  let t = useTranslations("buttons")
  if (media?.length === 0) return null
  return (
    <div className="fixed bottom-0 z-99 w-full bg-white border-t border-gray-200 p-4 flex justify-center">

      <button
        onClick={onSubmitMediaDetails}
        disabled={publish_ids?.length !== media?.length}
        className="submit-button">
        {t("submit_conent")}
      </button>
    </div>
  )
}

export default submitSection