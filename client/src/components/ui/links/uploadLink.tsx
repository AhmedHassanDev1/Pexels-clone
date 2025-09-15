import Link from 'next/link'
import { LuUpload } from "react-icons/lu";
import { usePathname } from 'next/navigation';
function UploadLink() {
  let pathname:string=usePathname()
  let isUploadPage=pathname.endsWith('upload')
  if (isUploadPage) return;
  
  return (
    <Link
      className='w-fit h-fit  bg-black rounded-xl text-white font-semibold  '
      href={'/upload'} >
      <div className="inline-block md:hidden p-4 ">
        <LuUpload />
      </div>
      <div className="hidden md:inline-block p-3">Upload</div>
    </Link>
  )
}

export default UploadLink