"use client"

import { BsCloudCheck } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel"
import { useRef, useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { uiToast } from "@/components/uiToast"

interface DocumentInputProps {
  title: string
  id: Id<"documents">
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title)
  const [isError, setIsError] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const update = useMutation(api.document.updateById)

  const save = async () => {
    if (!isEditing) return

    const nextTitle = value.trim() || "Untitled"
    const currentTitle = title.trim()

    if (nextTitle === currentTitle) {
      setIsEditing(false)
      return
    }

    setIsPending(true)
    setIsError(false)

    try {
      await update({ id, title: nextTitle })

      setIsEditing(false)

      uiToast({
        title: "Document renamed",
        description: "The title has been updated successfully.",
        variant: "success",
        duration: 3000,
      })
    } catch {
      setIsError(true)

      uiToast({
        title: "Rename failed",
        description: "You don’t have permission to rename this document.",
        variant: "destructive",
        duration: 4000,
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {isEditing ?
        <form
          className="relative w-fit max-w-[50ch]"
          onSubmit={(e) => {
            e.preventDefault()
            save()
          }}
        >
          {/* width stabilizer */}
          <span className="whitespace-pre invisible px-1.5 text-xl">
            {value || " "}
          </span>

          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setValue(title)
                setIsEditing(false)
              }
            }}
            className="
              absolute inset-0
              truncate
              px-1.5
              text-xl
              text-yellow-900
              bg-yellow-100
              border border-yellow-600
              rounded-sm
              focus:outline-none
              focus:ring-1
              focus:ring-yellow-500
            "
          />
        </form>
      : <span
          onClick={() => {
            setIsEditing(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
          className="
            text-lg
            px-1.5
            truncate
            cursor-text
            rounded-sm
            text-yellow-900
            hover:bg-yellow-200/50
          "
        >
          {value}
        </span>
      }

      <BsCloudCheck
        className={`text-sm ${
          isPending ? "text-yellow-600"
          : isError ? "text-red-600"
          : "text-green-600"
        }`}
      />
    </div>
  )
}
