"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api"
import { useMutation } from "convex/react"
import React, { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { uiToast } from "./uiToast"

interface RenameDialogProps {
  documentId: Id<"documents">
  initialTitle: string
  onRename?: (newTitle: string) => void
  children: React.ReactNode
}

export const RenameDialog = ({
  documentId,
  initialTitle,
  onRename,
  children,
}: RenameDialogProps) => {
  const update = useMutation(api.document.updateById)
  const [isUpdating, setIsUpdating] = useState(false)
  const [title, setTitle] = useState(initialTitle ?? "")
  const [open, setOpen] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = title.trim() || "Untitled"

    // Only rename if the title actually changed
    if (trimmed === initialTitle) {
      setOpen(false)
      return
    }

    setIsUpdating(true)
    try {
      await update({ id: documentId, title: trimmed })
      setOpen(false)

      uiToast({
        title: "Document renamed successfully.",
        variant: "success",
        duration: 4000,
      })

      onRename?.(trimmed) // inform parent of the new title
    } catch {
      uiToast({
        title: "Rename failed",
        description: "You don’t have permission to rename this document.",
        variant: "destructive",
        duration: 4000,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
        bg-yellow-100
        border-none
        rounded-lg
        shadow-lg
        ring-0
        text-yellow-900
      "
      >
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Rename the Document
            </DialogTitle>

            <DialogDescription className="text-sm text-yellow-800">
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              className="
            bg-yellow-50
            border-2 border-yellow-700
            text-yellow-900
            placeholder:text-yellow-600
            rounded-md
            focus:outline-none
            focus:ring-0
          "
              placeholder="New document name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              className="
            bg-yellow-200
            text-yellow-900
            border-2 border-yellow-700
            rounded-md
            font-semibold
            hover:bg-yellow-300
            focus:outline-none focus:ring-0
          "
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }}
            >
              Cancel
            </Button>

            <Button
              className="
            bg-[#f0e2a5]
            text-[#78350f]
            border-2 border-[#78350f]
            rounded-md
            font-bold
            shadow-[0.25em_0.25em_black]
            transition-all
            hover:bg-[#f0e2a5]
            active:translate-x-[0.15em]
            active:translate-y-[0.15em]
            active:shadow-[0.1em_0.1em_black]
            focus:outline-none focus:ring-0
          "
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>{" "}
        </form>
      </DialogContent>
    </Dialog>
  )
}
