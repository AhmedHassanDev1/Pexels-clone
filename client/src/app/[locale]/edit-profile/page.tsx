
"use client"
import EditeProfileDetails from "@/components/features/user/EditeProfileDetails"
import EditeProfileImage from "@/components/features/user/EditeProfileImage"

function page() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className=" w-full max-w-3xl p-12 space-y-6">
        <h1 className="text-4xl font-semibold text-center">Profile settings</h1>
        <EditeProfileImage />
        <EditeProfileDetails />
      </div>
    </div>
  )
}

export default page