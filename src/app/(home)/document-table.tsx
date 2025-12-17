import { PaginationStatus } from "convex/react"
import { Doc } from "../../../convex/_generated/dataModel"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Loader from "@/components/loader"
import { DocumentRow } from "./document-row"
import { LoaderIcon } from "lucide-react"

interface DocumentTableProps {
  document: Doc<"documents">[] | undefined
  status: PaginationStatus
  loadMore: (numItems: number) => void
}

export const DocumentTable = ({
  document,
  status,
  loadMore,
}: DocumentTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-10 flex flex-col gap-5 bg-[#fcf9eb]">
      {document === undefined ?
        <div className="flex max-h-screen justify-center items-center">
          <Loader />
        </div>
      : <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-center text-yellow-900 font-semibold">
                Name
              </TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="text-center text-yellow-900 font-semibold hidden md:table-cell">
                Shared
              </TableHead>
              <TableHead className="text-center text-yellow-900 font-semibold hidden md:table-cell">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          {document.length === 0 ?
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="text-center text-yellow-900 h-24"
                >
                  No docs been found
                </TableCell>
              </TableRow>
            </TableBody>
          : <TableBody>
              {document.map((doc) => {
                return <DocumentRow key={doc._id} document={doc} />
              })}
            </TableBody>
          }
        </Table>
      }
      <div className="mt-6 flex items-center justify-center gap-4 text-sm text-yellow-900">
        <span className="h-px w-20 bg-yellow-300" />

        {status === "LoadingMore" && "opacity-80" ?
          <LoaderIcon className="h-4 w-4 animate-spin text-yellow-700" />
        : status === "CanLoadMore" ?
          <span
            onClick={() => loadMore(5)}
            className="
        cursor-pointer
        hover:text-yellow-950
        transition-colors
      "
          >
            Load more
          </span>
        : <span className="opacity-60">End of results</span>}

        <span className="h-px w-20 bg-yellow-300" />
      </div>
    </div>
  )
}
