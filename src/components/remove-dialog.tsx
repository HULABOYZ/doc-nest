"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import { useState } from "react"
import { uiToast } from "./uiToast"

interface RemoveDialogProps {
  documentId: Id<"documents">
  children: React.ReactNode
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const remove = useMutation(api.document.removeById)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="
      bg-yellow-100
      border-none
      rounded-lg
      shadow-lg
      text-yellow-900
      ring-0
    "
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold">
            Are you sure?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-yellow-800">
            Do you really want to remove this document? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className="
          bg-yellow-200
          text-yellow-900
          border-2 border-yellow-700
          rounded-md
          px-4 py-2
          font-semibold
          hover:bg-yellow-300
          focus:outline-none focus:ring-0
        "
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isDeleting}
            onClick={async (e) => {
              e.stopPropagation()
              setIsDeleting(true)
              remove({ id: documentId })
                .then(() => {
                  uiToast({
                    title: "Document removed successfully!",
                    description: "The document has been deleted.",
                    variant: "warning",
                    duration: 4000,
                  })
                })
                .catch(() => {
                  uiToast({
                    title: "You cannot delete this document.",
                    description: "Only admins can remove documents.",
                    variant: "destructive",
                    duration: 4000,
                  })
                })
                .finally(() => setIsDeleting(false))
            }}
            className="
          bg-red-400
          text-red-950
          border-2 border-red-900
          rounded-md
          px-4 py-2
          font-bold
          shadow-[0.25em_0.25em_black]
          transition-all
          hover:bg-red-500
          active:translate-x-[0.15em]
          active:translate-y-[0.15em]
          active:shadow-[0.1em_0.1em_black]
          focus:outline-none focus:ring-0
        "
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
