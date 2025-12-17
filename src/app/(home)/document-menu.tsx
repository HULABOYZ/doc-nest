import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  FilePenIcon,
  MoreVerticalIcon,
  Trash2Icon,
} from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RemoveDialog } from "@/components/remove-dialog"
import { RenameDialog } from "@/components/rename-dialog"

interface DocumentMenuProps {
  documentId: Id<"documents">
  title: string
  onNewTab: (id: Id<"documents">) => void
}

export const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="hover:bg-yellow-100/80 rounded-sm"
      >
        {/* To avoid hydration issues, just bcz both are buttons */}
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVerticalIcon className="text-yellow-900 size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 ring-0 bg-yellow-50">
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
            className="
            text-yellow-900
            hover:bg-yellow-100
            hover:text-yellow-900
            focus:bg-yellow-100
            focus:text-yellow-900
            border-none
            cursor-pointer
          "
          >
            <FilePenIcon className="size-4 mr-2" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
            className="
            text-yellow-900
            hover:bg-yellow-100
            hover:text-yellow-900
            focus:bg-yellow-100
            focus:text-yellow-900
            border-none
            cursor-pointer
          "
          >
            <Trash2Icon className="size-4 mr-2" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem
          onClick={() => onNewTab(documentId)}
          className="
            text-yellow-900
            hover:bg-yellow-100
            hover:text-yellow-900
            focus:bg-yellow-100
            focus:text-yellow-900
            border-none
            cursor-pointer
          "
        >
          <ExternalLink className="size-4 mr-2 text-yellow-900" />
          Open in a new Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   ExternalLink,
//   FilePenIcon,
//   MoreVerticalIcon,
//   Trash2Icon,
// } from "lucide-react"
// import { Id } from "../../../convex/_generated/dataModel"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { api } from "../../../convex/_generated/api"
// import { PermissionDeniedDialog } from "./PermissionDeniedDialog"
// import { useMutation } from "convex/react"
// // import { PermissionDeniedDialog } from "./permissionDeniedDialog"

// interface DocumentMenuProps {
//   documentId: Id<"documents">
//   title: string
//   onNewTab: (id: Id<"documents">) => void
// }

// export const DocumentMenu = ({
//   documentId,
//   title,
//   onNewTab,
// }: DocumentMenuProps) => {
//   const [showForbiddenModal, setShowForbiddenModal] = useState(false)

//   const removeById = useMutation(api.document.removeById)
//   const updateById = useMutation(api.document.updateById)

//   // Handler for delete
//   const handleRemove = async (e: React.MouseEvent) => {
//     e.stopPropagation()
//     try {
//       await removeById({ id: documentId })
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         if (err.message === "Forbidden") setShowForbiddenModal(true)
//         else console.error(err.message)
//       } else {
//         console.error("Unknown error", err)
//       }
//     }
//   }

//   // Handler for rename
//   const handleRename = async (e: React.MouseEvent) => {
//     e.stopPropagation()
//     const newTitle = prompt("Enter new title", title)
//     if (!newTitle) return
//     try {
//       await updateById({ id: documentId, title: newTitle })
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         if (err.message === "Forbidden") setShowForbiddenModal(true)
//         else console.error(err.message)
//       } else {
//         console.error("Unknown error", err)
//       }
//     }
//   }

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger
//           asChild
//           className="hover:bg-yellow-100/80 rounded-sm"
//         >
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <MoreVerticalIcon className="text-yellow-900 size-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="border-0 ring-0 bg-yellow-50">
//           <DropdownMenuItem
//             onClick={handleRename}
//             className="text-yellow-900 hover:bg-yellow-100 hover:text-yellow-900 focus:bg-yellow-100 focus:text-yellow-900 border-none cursor-pointer"
//           >
//             <FilePenIcon className="size-4 mr-2" />
//             Rename
//           </DropdownMenuItem>

//           <DropdownMenuItem
//             onClick={handleRemove}
//             className="text-yellow-900 hover:bg-yellow-100 hover:text-yellow-900 focus:bg-yellow-100 focus:text-yellow-900 border-none cursor-pointer"
//           >
//             <Trash2Icon className="size-4 mr-2" />
//             Remove
//           </DropdownMenuItem>

//           <DropdownMenuItem
//             onClick={() => onNewTab(documentId)}
//             className="text-yellow-900 hover:bg-yellow-100 hover:text-yellow-900 focus:bg-yellow-100 focus:text-yellow-900 border-none cursor-pointer"
//           >
//             <ExternalLink className="size-4 mr-2 text-yellow-900" />
//             Open in a new Tab
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Permission denied modal */}
//       <PermissionDeniedDialog
//         open={showForbiddenModal}
//         onOpenChange={setShowForbiddenModal}
//       />
//     </>
//   )
// }
