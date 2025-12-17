// to fetch the value of documentId from the url we can use interface alongwith params
"use client"

import { Preloaded, usePreloadedQuery } from "convex/react"
import Editor from "./editor"
import { Navbar } from "./navbar"
import { Room } from "./room"
import ToolBar from "./toolbar"
import { api } from "../../../../convex/_generated/api"

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.document.getById>
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument)
  return (
    <Room>
      <div className="min-h-screen bg-[#fefce8]">
        <div className="flex flex-col gap-y-2 left-0 top-0 right-0 z-10 fixed px-4 pt-2 bg-[#fefce8] print:hidden">
          <Navbar data={document} />
          <ToolBar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  )
}
