"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DialogPatternProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  footer?: React.ReactNode
  children?: React.ReactNode
  showCloseButton?: boolean
}

export function DialogPattern({
  open,
  onOpenChange,
  title,
  description,
  footer,
  children,
  showCloseButton = true,
}: DialogPatternProps) {
  const ariaLabel = title ? undefined : (description || "Dialog")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={showCloseButton} aria-label={ariaLabel}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
