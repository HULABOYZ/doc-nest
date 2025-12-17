import { useThreads } from "@liveblocks/react/suspense"
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap"
import { Editor } from "@tiptap/react"

// for faster loading use "ClientSideSuspense", but it loads the editor too fast that the loading animation isn't even showing, so I comment it out ->

// export const Threads = ({ editor }: { editor: Editor | null }) => {
//   return (
//     <ClientSideSuspense fallback={null}>
//       <ThreadsList editor={editor} />
//     </ClientSideSuspense>
//   )
// }

export function Threads({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads({ query: { resolved: false } })

  return (
    <>
      <div className="anchored-threads">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="floating-threads"
      />
      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  )
}
