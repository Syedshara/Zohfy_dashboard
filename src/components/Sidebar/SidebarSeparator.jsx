import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const SidebarSeparator = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 h-px w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})

export { SidebarSeparator }

