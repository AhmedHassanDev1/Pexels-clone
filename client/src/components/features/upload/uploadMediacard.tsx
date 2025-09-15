
import { mediaType, UploadContext, uploadContextType } from "@/app/[locale]/upload/page"
import { generateThumbnail } from "@/lib/canvas";
import { useContext, useEffect, useState } from "react";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import UploadForm from "./uploadForm";
import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "@/lib/api/upload";

function uploadMediacard({ file, setMedia }: { file: mediaType, setMedia: (updater: (media: mediaType[]) => mediaType[]) => void }) {
    let [startUpload, setStartUpload] = useState(false);
    let { setPublish } = useContext<uploadContextType | null>(UploadContext) || {}

    let { mutate, isPending } = useMutation({
        mutationFn: uploadMedia,
        onSuccess: (data) => {
            console.log(data);
            
            setMedia((prev) => prev.map((item) => item.id === file.id ? { ...item, status: "done" } : item))
            if (!setPublish) return
            setPublish(prev => {
                return [...prev, { publish_id: data._id, file_id: file.id }]
            })

        },
        onError: (error) => console.log(error),

    })
    let [url, setUrl] = useState<string | null>(file.type === "image" ? file.src : null);

    if (file.type === "video") {
        generateThumbnail(file.src)
            .then((thumbnail) => {
                setUrl(thumbnail);
            });
    }

    useEffect(() => {
        if (startUpload) return

        setStartUpload(() => true)



    }, [file])

    useEffect(() => {
        if (!file.file || !startUpload) return

        let fd: FormData = new FormData()
        fd.append('file', file.file)
        mutate(fd)


    }, [startUpload]);

    const handleDelete = () => {
        setMedia((prev: mediaType[]) => prev.filter((item) => item.id !== file.id));
    };

    return (
        <div className="flex gap-1 h-fit items-center">
            <div className="w-full p-6 bg-gray-100 rounded-lg grid grid-cols-2 gap-4 items-center ">
                <div className="p-3 relative">
                    {file.type == "video" && <span className="text-green-600 absolute top-5 right-5 bg-white rounded-full p-1 cursor-pointer" >
                        <MdOutlineSlowMotionVideo />
                    </span>}

                    {url && <img
                        src={url}
                        alt={'uploaded media'}
                        className="w-full aspect-square object-cover rounded-lg" />
                    }
                    {isPending && <div className="absolute flex justify-center items-center inset-3 bg-black/30 rounded-inherit z-10">
                        <div className="loader " />"
                    </div>}
                </div>
                <UploadForm id={file.id} />
            </div>
            <div className="  h-full p-4 flex items-center rounded-full bg-gray-100 ">
                <FaRegTrashCan
                    className="cursor-pointer"
                    onClick={handleDelete}
                    size={20}
                />
            </div>

        </div>
    )
}

export default uploadMediacard