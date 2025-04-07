import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const SidebarMenuItem = forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
))

export { SidebarMenuItem }

