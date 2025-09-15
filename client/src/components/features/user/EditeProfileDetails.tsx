import { editeUserType } from "@/types/user"
import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useAppSelector } from "@/store/store"
import { editeProfile } from "@/lib/api/user"
import { useDispatch } from "react-redux"
import { updateCurrentUser } from "@/store/slices/CurrrentuserSlice"
import { toast ,ToastContainer} from "react-toastify"

function EditeProfileDetails() {
  let { data: user } = useAppSelector(state => state.meState)
  let dispatch = useDispatch()

  let form = useForm<editeUserType>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      bio: user?.bio,
      location:user?.location,
      "platforms": {
        x: user.platforms.find(el => el.platform == 'x')?.url,
        instagram: user.platforms.find(el => el.platform == 'instagram')?.url,
        tiktok: user.platforms.find(el => el.platform == 'tiktok')?.url,
        youtube: user.platforms.find(el => el.platform == 'youtube')?.url,
      }

    }
  })
  let { register, formState: { isValid, isDirty },reset, handleSubmit } = form
  let { mutate } = useMutation({
    mutationFn: editeProfile,
    onSuccess: (data) => {
      dispatch(updateCurrentUser(data.data))
       toast.success('Your profile was updated successfully',{
               position:"bottom-center",
               hideProgressBar:true,
               pauseOnHover:false
      
             });
    },

  })
  let edite: SubmitHandler<editeUserType> = async (data: editeUserType) => {
    let platforms = [
      {
        platform: 'x',
        url: data.platforms?.x
      },
      {
        platform: 'instagram',
        url: data?.platforms?.instagram
      },
      {
        platform: 'tiktok',
        url: data.platforms?.tiktok
      },
      {
        platform: 'youtube',
        url: data.platforms?.youtube
      }
    ]
    delete data.platforms
    data.platforms = platforms
    mutate(data)
    
  }

  return (
    <form
      className=" space-y-5 flex flex-col"
      onSubmit={handleSubmit(edite)}
    >
      <section className="grid grid-rows-2 grid-cols-2 gap-5">
        <div className="text-zinc-700 flex flex-col gap-1">
          <span className="text-lg font-semibold">First name
            <sup className="text-lg text-pink-500">*</sup>
          </span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register('first_name')}
            required />
        </div>

        <div className="text-zinc-700 flex flex-col gap-1">
          <span className="text-lg font-semibold">Last name
            <sup className="text-lg text-pink-500">*</sup>
          </span>
          <input
            className="  border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register('last_name')}
            required />
        </div>

        <div className="text-zinc-700 flex flex-col gap-1">
          <span className="text-lg font-semibold">Email
            <sup className="text-lg text-pink-500">*</sup>
          </span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="email"
            {...register('email')}
            required />
        </div>
      </section>
      <h3 className="text-3xl font-semibold ">About you</h3>

      <section className="grid grid-cols-2 gap-6">
        <div className="text-zinc-700 flex flex-col gap-1 col-span-2">
          <span className="text-lg font-semibold">Short bio
            <sup className="text-lg text-pink-500">*</sup>
          </span>
          <textarea
            {...register('bio')}
            className="border-2 border-zinc-200 border-solid bg-white rounded-lg p-3 max-h-96 min-h-36"
            maxLength={130}
          ></textarea>

        </div>

        <div className="text-zinc-600 flex flex-col gap-1">
          <span className="text-lg font-semibold">Location</span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register('location')}
          />
        </div>

        <div className="text-zinc-600 flex flex-col gap-1">
          <span className="text-lg font-semibold">X</span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register('platforms.x')}
          />
        </div>

        <div className="text-zinc-600 flex flex-col gap-1">
          <span className="text-lg font-semibold">Instagram</span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register('platforms.instagram')}
          />
        </div>

        <div className="text-zinc-600 flex flex-col gap-1">
          <span className="text-lg font-semibold">Youtube</span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register('platforms.youtube')}
          />
        </div>

        <div className="text-zinc-600 flex flex-col gap-1">
          <span className="text-lg font-semibold">TikTok</span>
          <input
            className=" border-2 border-zinc-200 border-solid bg-white rounded-lg p-3"
            type="text"
            {...register("platforms.tiktok")}
          />
        </div>


      </section>
      <button
        disabled={!isDirty}
        className="submit-button">
        save profile
      </button>
      <ToastContainer/>
    </form>
  )
}

export default EditeProfileDetails