"use client"

import { ClientSideSuspense } from "@liveblocks/react/suspense"
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="relative" size="icon">
            <BellIcon className="size-5" />
            {inboxNotifications?.length > 0 && (
              <span
                className="
                absolute -top-1 -right-1 size-4
                rounded-full bg-yellow-700
                text-xs text-yellow-100
                flex items-center justify-center
                animate-pulse
              "
              >
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="
    w-[420px]
    rounded-xl
    border-2 border-yellow-600
    bg-[#f1ebaa]
    shadow-[0.4rem_0.4rem_0_black]
    p-2
  "
        >
          {inboxNotifications.length > 0 ?
            <InboxNotificationList className="flex flex-col gap-2">
              {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                  className="liveblocks-inbox-item"
                />
              ))}
            </InboxNotificationList>
          : <div className="p-4 text-sm text-yellow-900 text-center font-medium">
              No notifications ✨
            </div>
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator className="h-6" orientation="vertical" />
    </>
  )
}

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <InboxMenu />
    </ClientSideSuspense>
  )
}
