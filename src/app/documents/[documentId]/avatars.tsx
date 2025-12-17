"use client"

import { Separator } from "@/components/ui/separator"
import { useOthers, useSelf } from "@liveblocks/react/suspense"
import { ClientSideSuspense } from "@liveblocks/react/suspense"

const AVATAR_SIZE = 40

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={<p>Loading....</p>}>
      <AvatarStack />
    </ClientSideSuspense>
  )
}

const AvatarStack = () => {
  const users = useOthers()
  const currUser = useSelf()

  if (users.length === 0) return null

  return (
    <>
      <div className="flex items-center">
        {currUser && (
          <div className="relative ml-2">
            <Avatar src={currUser.info.avatar} name="You" />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => {
            return (
              <Avatar key={connectionId} src={info.avatar} name={info.name} />
            )
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  )
}

interface AvatarProps {
  name: string
  src: string
}

const Avatar = ({ name, src }: AvatarProps) => {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className="group -ml-2 shrink-0 flex items-center justify-center border-2 relative border-yellow-500 rounded-full bg-neutral-500 transition-shadow duration-300 hover:shadow-[0_0_15px_4px_rgba(245,158,11,0.6)] cursor-pointer"
    >
      {/* Tooltip */}
      <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 px-2 py-2 z-10 mt-2.5 whitespace-nowrap rounded-md text-xs bg-black text-yellow-100 transition-opacity">
        {name}
      </div>

      {/* Avatar image */}
      <img
        alt={name}
        src={src || "/default-avatar.png"} // fallback avatar
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  )
}
