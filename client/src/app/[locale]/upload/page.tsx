"use client"
import { useTranslations } from "next-intl"
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import UploadMediacard from "@/components/features/upload/uploadMediacard";
import Dropzone from 'react-dropzone'
import { ChangeEvent, useState, createContext, useEffect } from "react";
import SubmitSection from "@/components/features/upload/submitSection";
export type mediaType = {
  id: string;
  src: string;
  type: "image" | "video"
  size?: number
  status: "uploading" | "done" | "error"
  file?: File
}

export type mediainfoType = {
  id?: string;
  title?: string;
  tags?: string[] | string;
  location?: string
  file?: File
}
export type uploadContextType = {
  media: mediaType[];
  setMedia: (updater: (media?: mediaType[]) => mediaType[]) => void
  mediaInfo: mediainfoType[];
  setMediaInfo: (updater: (mediaInfo: mediainfoType[]) => mediainfoType[]) => void
  publish_ids: { publish_id: string; file_id: string }[];
  setPublish: (updater: (publish_ids: { publish_id: string; file_id: string }[]) => { publish_id: string; file_id: string }[]) => void;
}
export const UploadContext = createContext<uploadContextType | null>(null)

function page() {
  const UploadPageTranslations = useTranslations("uploadPage")
  const buttonTranslations = useTranslations("buttons")
  let [media, setMedia] = useState<mediaType[]>([])
  let [mediaInfo, setMediaInfo] = useState<mediainfoType[]>([]);
  let [publish_ids, setPublish] = useState<{publish_id:string,file_id:string}[]>([])

  let onAddFiles = (files: File[] | null) => {
    let mediaToAdd: mediaType[] = [];
    for (let file of files || []) {
      const src = URL.createObjectURL(file);
      const type = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : null;
      if (type) {
        mediaToAdd.push({
          id: Math.random().toString(36).substring(2, 15),
          src,
          type,
          file: file,
          size: file.size,
          status: "uploading"
        });
      }
    }
    setMedia((prev) => [...prev, ...mediaToAdd]);
  }

  return (
    <UploadContext.Provider value={{ media, setMedia, mediaInfo, setMediaInfo,publish_ids,setPublish }}>
      <main className="w-full  flex flex-col gap-4 items-center  h-[80vh]">
        <section className="w-full max-w-2xl text-center flex flex-col gap-3 mt-10 mb-3 ">
          <h1 className=" text-2xl font-extrabold ">{UploadPageTranslations("title")}</h1>
          <h3 className="title-5">{UploadPageTranslations("description")}</h3>
        </section>

        {media.length ?
          <section className="w-full max-w-4xl space-y-4 ">
            {media.map((file: mediaType) => {
              return <UploadMediacard
                key={file.id}
                file={file}
                setMedia={setMedia} />
            })}

          </section> :
          <section className="w-full relative max-w-5xl  h-96">
            <Dropzone
              onDrop={onAddFiles}
              noClick={true}
              noKeyboard={true}
              maxFiles={50}
              maxSize={5242880}
              accept={{ 'image/*': ["png", "jpg", "jpeg"], "video/*": ["mp4", "mov", "avi"] }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div
                    className="w-full h-full relative z-2 bg-gradient-to-b  from-transparent to-white p-5 flex flex-col  items-center gap-6"
                    {...getRootProps()}>
                    <input {...getInputProps()} />

                    <div className="self-end text-sm text-gray-200">{`(0/50)`}</div>
                    <div className="flex flex-col gap-4 items-center ">
                      <Image src="/upload-page.png" alt="upload" width={120} height={120} />
                      <h4 className="title-3">{UploadPageTranslations('upload_methods')}</h4>
                      <label htmlFor="file-upload" className="submit-button ">{buttonTranslations("borwse")}</label>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onAddFiles(e.target.files ? Array.from(e.target.files) : null)} />
                    </div>

                    <div className="grid grid-cols-3 grid-rows-2 gap-4 my-5">
                      {[1, 2, 3, 4, 5, 6].map((item, ind) => (

                        <div key={`rule-${ind}`} className="flex gap-1 items-center font-semibold text-sm text-gray-900">
                          <FaCheckCircle color="green" />

                          {UploadPageTranslations(`rules.${item}`)}
                        </div>

                      ))}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="absolute inset-0  border-2 border-dashed border-gray-300 rounded-lg z-1 "></div>
          </section>
        }

       <SubmitSection />
      </main>
    </UploadContext.Provider>
  )
}


export default page