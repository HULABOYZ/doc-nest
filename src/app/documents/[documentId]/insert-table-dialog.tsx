"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface InsertTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInsert: (options: { rows: number; cols: number }) => void
}

export function InsertTableDialog({
  open,
  onOpenChange,
  onInsert,
}: InsertTableDialogProps) {
  const [rows, setRows] = React.useState(2)
  const [cols, setCols] = React.useState(2)

  const handleInsert = () => {
    if (rows > 0 && cols > 0) {
      onInsert({ rows, cols })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Insert Table</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="rows"
              className="text-sm font-medium text-yellow-900"
            >
              Rows:
            </label>
            <Input
              id="rows"
              type="number"
              min={1}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="cols"
              className="text-sm font-medium text-yellow-900"
            >
              Columns:
            </label>
            <Input
              id="cols"
              type="number"
              min={1}
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleInsert}
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
  )
}
