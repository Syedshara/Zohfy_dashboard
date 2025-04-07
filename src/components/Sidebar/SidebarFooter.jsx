import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const SidebarFooter = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
})

export { SidebarFooter }

