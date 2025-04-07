import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const SidebarMenu = forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
))

export { SidebarMenu }

