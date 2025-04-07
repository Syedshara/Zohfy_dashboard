"use client"

import { forwardRef } from "react"
import { Menu } from "lucide-react"
import { Button } from "../ui/Button/Button"
import { useSidebar } from "./SidebarContext"
import { cn } from "@/lib/utils"

const SidebarTrigger = forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <Menu />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})

export { SidebarTrigger }

