"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DynamicTablePickerProps {
  maxRows?: number
  maxCols?: number
  onSelect: (options: { rows: number; cols: number }) => void
}

export function DynamicTablePicker({
  maxRows = 8,
  maxCols = 10,
  onSelect,
}: DynamicTablePickerProps) {
  const [hovered, setHovered] = React.useState<{
    rows: number
    cols: number
  } | null>(null)

  return (
    <div className="p-3 select-none" onMouseLeave={() => setHovered(null)}>
      <div className="flex flex-col gap-1">
        {Array.from({ length: maxRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {Array.from({ length: maxCols }).map((_, colIndex) => {
              const isActive =
                hovered && rowIndex <= hovered.rows && colIndex <= hovered.cols

              return (
                <div
                  key={colIndex}
                  onMouseEnter={() =>
                    setHovered({ rows: rowIndex, cols: colIndex })
                  }
                  onClick={() =>
                    onSelect({ rows: rowIndex + 1, cols: colIndex + 1 })
                  }
                  className={cn(
                    "h-5 w-5 border rounded-[2px] transition-colors duration-100",
                    isActive
                      ? "bg-yellow-400 border-yellow-500"
                      : "bg-yellow-100 border-yellow-200 hover:bg-yellow-200"
                  )}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Display selected grid size */}
      <div className="mt-3 text-center text-xs font-medium text-yellow-900 min-h-[18px]">
        {hovered
          ? `${hovered.cols + 1} × ${hovered.rows + 1}`
          : "Select table size"}
      </div>
    </div>
  )
}
