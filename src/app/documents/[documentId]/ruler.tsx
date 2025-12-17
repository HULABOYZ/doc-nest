import { useRef, useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import { useStorage, useMutation } from "@liveblocks/react"
import {
  EDITOR_WIDTH,
  LEFT_MARGIN,
  MIN_SPACE,
  RIGHT_MARGIN,
} from "@/constants/margins"

const markers = Array.from({ length: 83 }, (_, i) => i)

export const Ruler = () => {
  const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set("leftMargin", position)
  }, [])

  const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set("rightMargin", position)
  }, [])

  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const rulerRef = useRef<HTMLDivElement>(null)

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true)
  }

  const handleRightMouseDown = () => {
    setIsDraggingRight(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container")

      if (container) {
        const containerRect = container.getBoundingClientRect()
        const relativeX = e.clientX - containerRect.left
        const rowPosition = Math.max(0, Math.min(relativeX, EDITOR_WIDTH))

        if (isDraggingLeft) {
          // Left marker cannot cross right marker - MIN_SPACE
          const maxLeft = EDITOR_WIDTH - rightMargin - MIN_SPACE
          const newLeft = Math.min(rowPosition, maxLeft)
          setLeftMargin(newLeft)
        } else if (isDraggingRight) {
          // Right marker cannot cross left marker + MIN_SPACE
          const minRight = leftMargin + MIN_SPACE
          const newRight = EDITOR_WIDTH - rowPosition
          const constrainedRight = Math.min(
            EDITOR_WIDTH - minRight,
            Math.max(0, newRight)
          )
          setRightMargin(constrainedRight)
        }
      }
    }
  }

  const handleMouseUp = () => {
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(LEFT_MARGIN)
  }

  const handleRightDoubleClick = () => {
    setRightMargin(RIGHT_MARGIN)
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-[#C7C7C7] flex relative items-end select-none print:hidden"
    >
      <div id="ruler-container" className="h-full w-full relative">
        <Marker // Left
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker // RIght
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0  h-full">
          <div className="relative h-full w-[816px]">
            {markers.map((marker) => {
              const pos = (marker * EDITOR_WIDTH) / 82 // because of divisor 82 we can't miss the last tick

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${pos}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-yellow-900" />
                      <span className="absolute bottom-2 text-[10px] text-yellow-900 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-yellow-900" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-yellow-900" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number
  isLeft: boolean
  isDragging: boolean
  onMouseDown: () => void
  onDoubleClick: () => void
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 h-full w-4 cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-yellow-900 transfrom -translate-x-1/2" />
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{
          height: "100vh",
          width: "1px",
          transform: "scaleX(0.5)",
          backgroundColor: "#78350F",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  )
}
