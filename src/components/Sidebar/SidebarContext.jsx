"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useIsMobile } from "@/hooks/useMediaQuery"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = createContext(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export function SidebarProvider({ children, defaultOpen = true, open: openProp, onOpenChange: setOpenProp }) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = useState(false)

  // Internal state
  const [_open, _setOpen] = useState(() => {
    // Try to get the state from cookie
    if (typeof document !== "undefined") {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(SIDEBAR_COOKIE_NAME))
        ?.split("=")[1]

      return cookieValue === "true" ? true : defaultOpen
    }
    return defaultOpen
  })

  const open = openProp ?? _open
  const setOpen = useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value

      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // Set cookie
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open],
  )

  // Helper to toggle the sidebar
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={{
          "--sidebar-width": "17rem",
          "--sidebar-width-icon": "3rem",
        }}
        className="group/sidebar-wrapper flex min-h-screen w-full has-[[data-variant=inset]]:bg-sidebar"
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

