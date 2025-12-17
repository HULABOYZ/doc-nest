"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { SiGoogledocs } from "react-icons/si"
import { Doc } from "../../../convex/_generated/dataModel"
import { Building2Icon, CircleUserIcon } from "lucide-react"
import { format } from "date-fns"
import { DocumentMenu } from "./document-menu"
import { useRouter } from "next/navigation"

interface DocumentRowProps {
  document: Doc<"documents">
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter()

  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank")
  }

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/documents/${document._id}`)}
    >
      <TableCell className="w-[50px] text-center">
        <SiGoogledocs className="size-6 fill-yellow-600 mx-auto" />
      </TableCell>

      <TableCell className="md:w-[50%] font-medium text-yellow-900 md:table-cell">
        {document.title}
      </TableCell>

      <TableCell className="text-muted-foreground text-center hidden md:table-cell">
        <div className="flex items-center justify-center gap-2">
          {document.organizationID ?
            <Building2Icon className="size-4 text-yellow-900" />
          : <CircleUserIcon className="size-4 text-yellow-900" />}
          {document.organizationID ? "Shared" : "Personal"}
        </div>
      </TableCell>

      <TableCell className="text-muted-foreground text-center hidden md:table-cell">
        {format(new Date(document._creationTime), "dd-MMM-yyyy")}
      </TableCell>

      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  )
}
