"use client"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/editor-store"
import { type Level } from "@tiptap/extension-heading"
import { CirclePicker, SketchPicker, type ColorResult } from "react-color"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BrushCleaningIcon,
  ChevronDown,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  LucideIcon,
  LucideListTodo,
  MessageSquarePlus,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheck2,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const FontFamilyBtn = () => {
  const { editor } = useEditorStore()

  const fonts = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Helvetica", value: "Helvetica, sans-serif" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
    { label: "Gill Sans", value: "'Gill Sans', sans-serif" },
    { label: "Times New Roman", value: "'Times New Roman', serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Palatino", value: "Palatino, serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Lucida Console", value: "'Lucida Console', monospace" },
    { label: "Monaco", value: "Monaco, monospace" },
    { label: "Brush Script MT", value: "'Brush Script MT', cursive" },
    { label: "Comic Sans MS", value: "'Comic Sans MS', cursive, sans-serif" },
    { label: "Impact", value: "Impact, sans-serif" },
    {
      label: "Franklin Gothic Medium",
      value: "'Franklin Gothic Medium', sans-serif",
    },
    { label: "Cursive", value: "cursive" },
    { label: "Monospace", value: "monospace" },
    { label: "Sans Serif", value: "sans-serif" },
    // { label: "Inter", value: "Inter, sans-serif" }, Not browser safe
    // { label: "Roboto", value: "Roboto, sans-serif" },
    // { label: "Lato", value: "Lato, sans-serif" },
  ]

  const currentFont =
    editor?.getAttributes("textStyle").fontFamily || "Monospace"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-[140px] flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <span className="truncate">
            {fonts.find((f) => f.value === currentFont)?.label || "Monospace"}
          </span>
          <ChevronDown className="ml-2 size-5 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1 border-none">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-md text-yellow-900 hover:bg-yellow-500/80",
              currentFont === value && "bg-yellow-300"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeadingBtn = () => {
  const { editor } = useEditorStore()

  const headings = [
    { label: "Normal text", value: "paragraph", fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "34px" },
    { label: "Heading 2", value: 2, fontSize: "30px" },
    { label: "Heading 3", value: 3, fontSize: "26px" },
    { label: "Heading 4", value: 4, fontSize: "20px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
    { label: "Heading 6", value: 6, fontSize: "12px" },
  ]

  const getCurrentHeading = () => {
    if (!editor) return "Normal text"

    for (let level = 1; level <= 6; level++) {
      if (editor.isActive("heading", { level })) {
        return `Heading ${level}`
      }
    }

    if (editor.isActive("paragraph")) {
      return "Normal text"
    }

    return "Normal text"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-[150px] flex items-center justify-between rounded-lg px-3 text-sm text-yellow-900",
            "bg-yellow-200/60 backdrop-blur-md",
            "transition-all duration-200 ease-in-out",
            "hover:bg-yellow-300/50 hover:shadow-lg hover:scale-[1.03]"
          )}
        >
          <span className="truncate font-medium">{getCurrentHeading()}</span>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-70" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[200px] p-1 border-none rounded-xl bg-yellow-100/95 backdrop-blur-md shadow-xl"
      >
        {headings.map(({ label, value, fontSize }) => {
          const isActive =
            value === "paragraph" ?
              editor?.isActive("paragraph")
            : editor?.isActive("heading", { level: value })

          return (
            <button
              key={label}
              onClick={() => {
                if (value === "paragraph") {
                  editor?.chain().focus().setParagraph().run()
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run()
                }
              }}
              style={{ fontSize }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-yellow-900",
                "transition-all duration-150",
                "hover:bg-yellow-300/60",
                isActive && "bg-yellow-400/60 font-semibold"
              )}
            >
              {label}
            </button>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorBtn = () => {
  const { editor } = useEditorStore()

  const value = editor?.getAttributes("textStyle").color || "#FF0000"

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run()
  }

  const customStyles = {
    default: {
      picker: {
        backgroundColor: "#fefcbf",
      },
    },
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-8 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <div
            className="size-4 w-full mt-auto mb-auto rounded-lg"
            style={{ background: value }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0 p-0">
        <SketchPicker color={value} onChange={onChange} styles={customStyles} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextHighlightBtn = () => {
  const { editor } = useEditorStore()

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-9 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <BrushCleaningIcon className="size-5 mt-auto mb-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-6 p-4">
        <CirclePicker onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const LinkBtn = () => {
  const { editor } = useEditorStore()

  const [value, setValue] = useState(editor?.getAttributes("link").href || "")

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run()
    setValue("")
  }

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "")
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-9 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <LinkIcon className="size-5 mt-auto mb-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 gap-x-2 flex items-center border-none">
        <Input
          placeholder="https://docnest.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={() => onChange(value)}
          style={{
            background: "#f0e2a5",
            fontFamily: "inherit",
            padding: "0.8em .6em",
            fontWeight: "900",
            fontSize: "0.8em",
            border: "3px solid #78350f",
            borderRadius: "0.5em",
            boxShadow: "0.25em 0.25em black",
            cursor: "pointer",
            color: "#78350f",
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(-0.12em, -0.12em)"
            e.currentTarget.style.boxShadow = "0.35em 0.35em black" // stronger shadow
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)"
            e.currentTarget.style.boxShadow = "0.25em 0.25em black"
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translate(0.15em, 0.15em)"
            e.currentTarget.style.boxShadow = "0.1em 0.1em black"
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)"
            e.currentTarget.style.boxShadow = "0.25em 0.25em black"
          }}
        >
          Apply The Link
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ImageBtn = () => {
  const { editor } = useEditorStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState(
    editor?.getAttributes("link").href || ""
  )

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run()
  }

  const onUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        onChange(imageUrl)
      }
    }
    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl)
      setImageUrl("")
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "h-10 min-w-9 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
              "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
            )}
          >
            <ImageIcon className="size-5 mt-auto mb-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-yellow-100 border-none rounded-md p-1 text-yellow-800 shadow-lg">
          <DropdownMenuItem
            onClick={onUpload}
            className="
        rounded-md 
        hover:bg-yellow-500/80 hover:text-yellow-900 
        focus:bg-yellow-500/80 focus:text-yellow-900 focus:outline-none
        transition-colors cursor-pointer
      "
          >
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="
        rounded-md 
        hover:bg-yellow-500/80 hover:text-yellow-900 
        focus:bg-yellow-500/80 focus:text-yellow-900 focus:outline-none
        transition-colors cursor-pointer
      "
          >
            <SearchIcon className="size-4 mr-2" />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleImageUrlSubmit()
              }
            }}
          />
          <DialogFooter>
            <Button
              onClick={handleImageUrlSubmit}
              style={{
                background: "#f0e2a5",
                fontFamily: "inherit",
                padding: "0.8em .6em",
                fontWeight: "900",
                fontSize: "0.8em",
                border: "3px solid #78350f",
                borderRadius: "0.5em",
                boxShadow: "0.25em 0.25em black",
                cursor: "pointer",
                color: "#78350f",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-0.12em, -0.12em)"
                e.currentTarget.style.boxShadow = "0.35em 0.35em black" // stronger shadow
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)"
                e.currentTarget.style.boxShadow = "0.25em 0.25em black"
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translate(0.15em, 0.15em)"
                e.currentTarget.style.boxShadow = "0.1em 0.1em black"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)"
                e.currentTarget.style.boxShadow = "0.25em 0.25em black"
              }}
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const AlignBtn = () => {
  const { editor } = useEditorStore()
  const alignments = [
    {
      label: "Align Left",
      icon: AlignLeftIcon,
      value: "left",
    },
    {
      label: "Align Center",
      icon: AlignCenterIcon,
      value: "center",
    },
    {
      label: "Align Right",
      icon: AlignRightIcon,
      value: "right",
    },
    {
      label: "Align Justify",
      icon: AlignJustifyIcon,
      value: "justify",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-9 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <AlignLeftIcon className="size-5 mt-auto mb-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 border-none">
        {alignments.map(({ label, icon: Icon, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center px-3 gap-x-2 py-1 rounded-sm hover:bg-yellow-500/80 text-yellow-900",
              editor?.isActive({ TextAlign: value }) && "bg-yellow-500/80"
            )}
          >
            <Icon className="size-4" /> <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ListBtn = () => {
  const { editor } = useEditorStore()

  const lists = [
    {
      label: "Bullet",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-9 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <ListIcon className="size-5 mt-auto mb-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 border-none">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center px-3 gap-x-2 py-1 rounded-sm hover:bg-yellow-500/80 text-yellow-900",
              isActive() && "bg-yellow-500/80"
            )}
          >
            <Icon className="size-4" /> <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontSizeBtn = () => {
  const { editor } = useEditorStore()

  const currFontSize =
    editor?.getAttributes("textStyle").fontSize ?
      editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16"

  const [fontSize, setFontSize] = useState(currFontSize)
  const [inputValue, setInputValue] = useState(fontSize)
  const [isEditable, setIsEdable] = useState(false)

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize)

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize)
      setInputValue(newSize)
      setIsEdable(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    updateFontSize(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      updateFontSize(inputValue)
      editor?.commands.focus()
    }
  }

  const increment = () => {
    const newSize = parseInt(fontSize) + 1
    updateFontSize(newSize.toString())
  }

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1
    if (newSize > 0) {
      updateFontSize(newSize.toString())
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      <button
        onClick={decrement}
        className="h-10 w-10 flex items-center justify-center rounded-lg text-yellow-900 bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <MinusIcon className="w-5 h-5" />
      </button>

      {isEditable ?
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-10 w-14 text-center rounded-lg border border-yellow-900 text-yellow-900 bg-yellow-100/50 backdrop-blur-sm px-2 text-sm focus:outline-none focus:ring-0"
        />
      : <button
          onClick={() => {
            setIsEdable(true)
            setFontSize(currFontSize)
          }}
          className="h-10 w-14 text-center rounded-lg border border-yellow-900 text-yellow-900 bg-yellow-100/50 backdrop-blur-sm px-2 text-sm cursor-text"
        >
          {currFontSize}
        </button>
      }

      <button
        onClick={increment}
        className="h-10 w-10 flex items-center justify-center rounded-lg text-yellow-900 bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <PlusIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

const LineHeightBtn = () => {
  const { editor } = useEditorStore()

  const lineHeights = [
    { label: "Default", value: "normal" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "2", value: "2" },
    { label: "2.5", value: "2.5" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-10 min-w-9 flex items-center justify-between rounded-lg text-yellow-900 px-2 text-sm transition-all duration-200 ease-in-out",
            "bg-yellow-200/60 backdrop-blur-sm hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105"
          )}
        >
          <ListCollapseIcon className="size-5 mt-auto mb-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 border-none">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center px-3 gap-x-2 py-1 rounded-sm hover:bg-yellow-500/80 text-yellow-900",
              editor?.getAttributes("paraggraph").lineHeight === value &&
                "bg-yellow-500/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface ToolbarBtnProps {
  onClick?: () => void
  isActive?: boolean
  icon: LucideIcon
  label: string
}

const ToolbarBtn = ({
  onClick,
  isActive,
  icon: Icon,
  label,
}: ToolbarBtnProps & { label: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "h-10 w-10 flex items-center justify-center rounded-lg",
            "text-yellow-900 bg-yellow-200/60 backdrop-blur-md",
            "transition-all duration-200",
            "hover:bg-yellow-300/50 hover:shadow-lg hover:scale-105",
            isActive && "bg-yellow-400/60 shadow-lg scale-105"
          )}
        >
          <Icon className="size-5" />
        </button>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        className="text-xs bg-black/80 text-yellow-100 px-2 py-1 rounded-md"
      >
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

const ToolBar = () => {
  const { editor } = useEditorStore()

  const sections: {
    label: string
    isActive?: boolean
    icon: LucideIcon
    onClick: () => void
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck2,
        onClick: () => {
          const curr = editor?.view.dom.getAttribute("spellcheck")
          editor?.view.dom.setAttribute(
            "spellcheck",
            curr === "false" ? "true" : "false"
          )
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlus,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive("liveblocksCommentMark"),
      },
      {
        label: "Add-ons",
        icon: LucideListTodo,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ]

  return (
    <div className="fixed top-[66px] left-1/2 transform -translate-x-1/2  bg-white/95 backdrop-blur-md shadow-lg border border-yellow-300 rounded-xl px-4 py-2 flex overflow-x-auto items-center justify-center gap-2 max-w-[95%]">
      {/* Section 1: Undo/Redo/Print/Spellcheck */}
      {sections[0].map((item) => (
        <ToolbarBtn key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="h-6 bg-yellow-500" />

      {/* Font Controls */}
      <FontFamilyBtn />
      <HeadingBtn />
      <FontSizeBtn />

      <Separator orientation="vertical" className="h-6 bg-yellow-500" />

      {/* Section 2: Text Formatting */}
      {sections[1].map((item) => (
        <ToolbarBtn key={item.label} {...item} />
      ))}

      {/* Color and Highlight */}
      <TextColorBtn />
      <TextHighlightBtn />

      <Separator orientation="vertical" className="h-6 bg-yellow-500" />

      {/* Links, Images, Alignment */}
      <LinkBtn />
      <ImageBtn />
      <AlignBtn />
      <LineHeightBtn />
      <ListBtn />

      {/* Section 3: Comments/Add-ons/Remove Formatting */}
      {sections[2].map((item) => (
        <ToolbarBtn key={item.label} {...item} />
      ))}
    </div>
  )
}

export default ToolBar
