import * as React from "react"

import { X } from "../icons"
import { cn } from "../../lib/utils"

const DialogContext = React.createContext(null)

function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used inside <Dialog>")
  }
  return context
}

function DialogPortal({ children }) {
  return children
}

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/70", className)}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useDialog()

  React.useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onOpenChange?.(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <DialogPortal>
      <DialogOverlay onClick={() => onOpenChange?.(false)} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange?.(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Đóng</span>
        </button>
      </div>
    </DialogPortal>
  )
})
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-normal", className)} {...props} />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = "DialogDescription"

const DialogTrigger = ({ children }) => children
const DialogClose = ({ children }) => children

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
