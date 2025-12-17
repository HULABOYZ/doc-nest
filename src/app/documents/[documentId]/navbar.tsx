"use client"

import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./document-input"
import { useState } from "react"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarShortcut,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar"
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenLineIcon,
  FilePlus2Icon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react"
import { BsFilePdf } from "react-icons/bs"
import { useEditorStore } from "@/store/editor-store"
import { DynamicTablePicker } from "./dynamic-table-picker"
import { InsertTableDialog } from "./insert-table-dialog"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Avatars } from "./avatars"
import { Inbox } from "./inbox"
import { Doc } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useRouter } from "next/navigation"
import { uiToast } from "@/components/uiToast"
import { RemoveDialog } from "@/components/remove-dialog"
import { RenameDialog } from "@/components/rename-dialog"

interface NavbarProps {
  data: Doc<"documents">
}

export const Navbar = ({ data }: NavbarProps) => {
  const { editor } = useEditorStore()

  const router = useRouter()
  const mutation = useMutation(api.document.create)

  const onNewDocument = async () => {
    try {
      const id = await mutation({
        title: "Untitled document",
        initialContent: "",
      })

      uiToast({
        title: "Document created successfully",
        variant: "success",
        duration: 3000,
      })

      router.push(`/documents/${id}`)
    } catch {
      uiToast({
        title: "Something went wrong",
        description: "The document could not be created.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const [openDialog, setOpenDialog] = useState(false)

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run()
    setOpenDialog(false)
  }

  const onDownload = (blob: Blob, filename: string) => {
    // Blob -> Binary Lage Object
    const url = URL.createObjectURL(blob) // returns a temporary local URL that represents the data in memory.

    const a = document.createElement("a") // Creates an <a> (anchor) element dynamically in memory — not yet in the DOM.

    a.href = url // Assigns that temporary blob URL as the anchor's href. So if we clicked that link manually, the browser would navigate to (or download) the blob.

    a.download = filename // The download attribute tells the browser: “Don't navigate — download this instead, and name it filename.”

    a.click() // It'll trigger a file save dialog with the name

    URL.revokeObjectURL(url) // Cleanup the free memory
  }

  const onSaveJSON = () => {
    if (!editor) return

    const content = editor.getJSON()

    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    })

    onDownload(blob, `${data.title}.json`)
  }

  const onSaveHTML = () => {
    if (!editor) return

    const content = editor.getHTML()

    const blob = new Blob([content], {
      type: "text/html",
    })

    onDownload(blob, `${data.title}.html`)
  }

  const onSaveTEXT = () => {
    if (!editor) return

    const content = editor.getText()

    const blob = new Blob([content], {
      type: "text/palin",
    })

    onDownload(blob, `${data.title}.txt`)
  }
  return (
    <>
      {" "}
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={40} height={36} />
          </Link>
          <div className="flex flex-col">
            <DocumentInput title={data.title} id={data._id} />

            <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="size-4 mr-2" />
                        Save As
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={onSaveJSON}>
                          <FileJsonIcon className="size-4 mr-2" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML}>
                          <GlobeIcon className="size-4 mr-2" />
                          HTML
                        </MenubarItem>
                        <MenubarItem onClick={() => window.print()}>
                          <BsFilePdf className="size-4 mr-2" />
                          PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveTEXT}>
                          <FileTextIcon className="size-4 mr-2" />
                          TXT
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={onNewDocument}>
                      <FilePlus2Icon className="size-4 mr-2" />
                      New Documnet
                    </MenubarItem>
                    <MenubarSeparator />
                    <RenameDialog
                      documentId={data._id}
                      initialTitle={data.title}
                    >
                      <MenubarItem
                        onClick={(e) => e.stopPropagation}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <FilePenLineIcon className="size-4 mr-2" />
                        Rename
                      </MenubarItem>
                    </RenameDialog>

                    <RemoveDialog documentId={data._id}>
                      <MenubarItem
                        onClick={(e) => e.stopPropagation}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Trash2Icon className="size-4 mr-2" />
                        Remove
                      </MenubarItem>
                    </RemoveDialog>

                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                      <PrinterIcon className="size-4 mr-2" />
                      Print <MenubarShortcut>Ctrl P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().undo().run()}
                    >
                      <Undo2Icon className="size-4 mr-2" />
                      Undo <MenubarShortcut>Ctrl Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => editor?.chain().focus().redo().run()}
                    >
                      <Redo2Icon className="size-4 mr-2" />
                      Redo <MenubarShortcut>Ctrl Y</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Insert
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>Table</MenubarSubTrigger>
                      <MenubarSubContent>
                        <DynamicTablePicker onSelect={insertTable} />
                        <MenubarSeparator />
                        <MenubarItem
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setOpenDialog(true)
                          }}
                        >
                          Custom Table
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Format
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <TextIcon className="size-4 mr-2" />
                        Text
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                        >
                          <BoldIcon className="size-4 mr-2" />
                          Bold <MenubarShortcut>Ctrl B</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                        >
                          <ItalicIcon className="size-4 mr-2" />
                          Italic <MenubarShortcut>Ctrl I</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                        >
                          <UnderlineIcon className="size-4 mr-2" />
                          Underline <MenubarShortcut>Ctrl U</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                          onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                          }
                        >
                          <StrikethroughIcon className="size-4 mr-2" />
                          StrikeThrough
                          <MenubarShortcut className="ml-4">
                            Ctrl Shift S
                          </MenubarShortcut>
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem
                      onClick={() =>
                        editor?.chain().focus().unsetAllMarks().run()
                      }
                    >
                      <RemoveFormattingIcon className="size-4 mr-2" />
                      Clear Formatting
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center pl-5">
          <Avatars />
          <Inbox />
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
          />
          <UserButton />
        </div>
      </nav>
      <InsertTableDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onInsert={insertTable}
      />
    </>
  )
}
