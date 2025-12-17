"use client"

import { usePaginatedQuery } from "convex/react"
import { Navbar } from "./navbar"
import { TemplateGallery } from "./template-gallery"
import { api } from "../../../convex/_generated/api"
import { DocumentTable } from "./document-table"
import { useSearchParam } from "@/hooks/use-search-param"

const Home = () => {
  const [search] = useSearchParam()
  const { results, status, loadMore } = usePaginatedQuery(
    api.document.get,
    { search },
    { initialNumItems: 5 }
  )

  // if (documents === undefined) {
  //   return (
  //     <div className="flex min-h-full items-center justify-center">
  //       <Loader />
  //     </div>
  //   )
  // }
  return (
    <div className="min-h-screen flex flex-col">
      <div className="left-0 right-0 top-0 z-10 fixed h-24 bg-transparent p-6 transition-all ease-in-out duration-300 backdrop-blur-xl border-b border-transparent hover:border-[#fcf9eb]">
        <Navbar />
      </div>
      <div className="mt-24">
        <TemplateGallery />
        <DocumentTable document={results} status={status} loadMore={loadMore} />
      </div>
    </div>
  )
}

export default Home
