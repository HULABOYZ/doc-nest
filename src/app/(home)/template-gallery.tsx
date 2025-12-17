"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { templates } from "@/constants/templates"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "../../../convex/_generated/api"
import { useState } from "react"
import { uiToast } from "@/components/uiToast"
// import { CheckIcon, DockIcon } from "lucide-react"

export const TemplateGallery = () => {
  const router = useRouter()
  const create = useMutation(api.document.create)

  const [isCreating, setIsCreating] = useState(false)

  const templateOnClick = (title: string, initialContent: string) => {
    setIsCreating(true)
    create({ title, initialContent })
      .catch(() =>
        uiToast({
          title: "Something went wrong.",
          variant: "destructive",
          duration: 4000,
        })
      )
      .then((documentId) => {
        uiToast({
          title: "Document created successfully.",
          variant: "success",
          duration: 4000,
        })
        router.push(`/documents/${documentId}`)
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  return (
    <div className="bg-[#fff6bd]">
      <div className="flex flex-col gap-y-4 max-w-screen-xl mx-auto px-16 py-6">
        <h3 className="text-yellow-900 font-semibold">Start a new Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714285714285%] 3xl:basis-[12.5%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2/5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() =>
                      templateOnClick(template.label, template.initialContent)
                    }
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-yellow-900 rounded-sm border hover:bg-[#faf9f5] hover:border-2 transition flex flex-col gap-y-44 items-center justify-center bg-white"
                  ></button>
                  <svg
                    width="100%"
                    height="40"
                    viewBox="0 0 400 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0"
                      y1="10"
                      x2="400"
                      y2="10"
                      stroke="#78350f"
                      strokeWidth="4"
                    />
                    <path
                      d="M180 10 
                            C 175 10, 160 20, 165 30 
                            C 170 40, 190 40, 195 30 
                            C 200 20, 185 10, 180 10 
                            Z
                            M220 10
                            C 225 10, 240 20, 235 30
                            C 230 40, 210 40, 205 30
                            C 200 20, 215 10, 220 10
                            Z
                            M200 25
                            L 200 20
                            L 198 18
                            L 202 18
                            L 200 20
                            Z
                          "
                      fill="#78350f"
                    />
                  </svg>
                  <p className="text-sm truncate font-semibold text-yellow-900 flex items-center justify-center">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="border-yellow-900 text-yellow-900 hover:bg-white" />
          <CarouselNext className="border-yellow-900 text-yellow-900 hover:bg-white" />
        </Carousel>
      </div>
    </div>
  )
}
