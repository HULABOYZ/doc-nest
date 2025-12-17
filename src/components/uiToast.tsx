"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
  {
    variants: {
      variant: {
        default: "border bg-yellow-100 text-yellow-900",
        destructive: "border border-red-700 bg-red-400 text-red-950",
        warning: "border border-orange-500 bg-orange-100 text-orange-900",
        success: "border border-green-600 bg-green-100 text-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }))}
    {...props}
  />
))
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> & {
    variant?: string
  }
>(({ className, children, variant, ...props }, ref) => {
  // pick icon based on variant
  let Icon = AlertCircle
  if (variant === "success") Icon = CheckCircle
  else if (variant === "warning") Icon = AlertTriangle

  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn("flex items-center gap-2 text-sm font-bold", className)}
      {...props}
    >
      <Icon className="w-4 h-4" />
      {children}
    </ToastPrimitives.Title>
  )
})
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-yellow-900/50 hover:text-yellow-900 focus:outline-none focus:ring-1",
      className
    )}
    {...props}
  >
    <X className="w-4 h-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = "ToastClose"

type UiToastOptions = {
  title: string
  description?: string
  variant?: "default" | "destructive" | "warning" | "success"
  duration?: number
}

export function uiToast({
  title,
  description,
  variant = "default",
  duration = 3000,
}: UiToastOptions) {
  const container = document.createElement("div")
  document.body.appendChild(container)

  import("react-dom/client").then(({ createRoot }) => {
    const root = createRoot(container)
    const handleClose = () => {
      root.unmount()
      container.remove()
    }

    root.render(
      <ToastProvider>
        <Toast
          open
          variant={variant}
          onOpenChange={(open) => !open && handleClose()}
        >
          <div className="flex flex-col gap-1">
            <ToastTitle variant={variant}>{title}</ToastTitle>
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )

    setTimeout(() => handleClose(), duration)
  })
}
