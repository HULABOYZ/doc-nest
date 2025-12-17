"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import Image from "@tiptap/extension-image"
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from "@/store/editor-store"
import { Underline } from "@tiptap/extension-underline"
import { FontFamily } from "@tiptap/extension-font-family"
import { TextStyle } from "@tiptap/extension-text-style"
import { Color } from "@tiptap/extension-color"
import Hightlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import { FontSizeExtension } from "@/extensions/font-size"
import { LineHeightExtension } from "@/extensions/line-height"
import { Ruler } from "./ruler"
import { useLiveblocksExtension } from "@liveblocks/react-tiptap"
import { Threads } from "./threads"
import { useStorage } from "@liveblocks/react"
import { LEFT_MARGIN, RIGHT_MARGIN } from "@/constants/margins"

interface EditorProps {
  initialContent?: string | undefined
}

const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN
  const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  })

  const { setEditor } = useEditorStore()

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor)
    },

    onDestroy() {
      setEditor(null)
    },

    onUpdate({ editor }) {
      setEditor(editor)
    },

    onSelectionUpdate({ editor }) {
      setEditor(editor)
    },

    onTransaction({ editor }) {
      setEditor(editor)
    },

    onBlur({ editor }) {
      setEditor(editor)
    },

    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin ?? LEFT_MARGIN}px; padding-right: ${rightMargin ?? RIGHT_MARGIN}px;`,
        class:
          "focus:outline-none print:border-0 bg-white flex flex-col min-h-[1020px] w-[820px] pt-4 pb-10  pr-14 cursor-text border border-[#C7C7C7]",
        spellcheck: "true",
      },
    },

    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Underline,
      Table,
      TableRow,
      TableCell,
      ImageResize,
      TableHeader,
      Image,
      Link.configure({
        autolink: true,
        defaultProtocol: "https://",
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily,
      TextStyle,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Hightlight.configure({
        multicolor: true,
      }),
      Color,
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["heading", "paragraph"],
        defaultLineHeight: "normal",
      }),
      liveblocks,
    ],

    // immediatelyRender: false,
  })

  return (
    <div className="size-full overflow-x-auto px-4 pt-5 bg-[#fefce8] print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center mx-auto w-[820px] py-5 print:py-0 print:min-w-0 print:w-full">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  )
}

export default Editor
