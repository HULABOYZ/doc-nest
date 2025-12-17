"use client"

import { FileText, LoaderIcon } from "lucide-react"

export function EditorRoomLoader() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div
        className="
          relative
          bg-yellow-100
          border-2 border-yellow-800
          rounded-xl
          px-6 py-5
          shadow-[0.35em_0.35em_black]
          flex flex-col items-center gap-3
        "
      >
        {/* Icon */}
        <div className="relative">
          <FileText className="h-10 w-10 text-yellow-900" />
          <LoaderIcon className="absolute -bottom-40 h-9 w-9 animate-spin text-yellow-700" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-bold text-yellow-900">Opening document…</p>
          <p className="text-xs text-yellow-700">Syncing collaborators</p>
        </div>
      </div>
    </div>
  )
}
