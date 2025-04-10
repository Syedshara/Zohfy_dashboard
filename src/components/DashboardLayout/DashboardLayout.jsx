"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BarChart3, Users, Package, Settings, Home, LogOut, Moon, Sun, FileLineChart } from "lucide-react"
import { SiMeta } from "react-icons/si"
import { Button } from "../ui/Button/Button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu/DropdownMenu"
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarSeparator,
} from "../Sidebar"
import { useTheme } from "../ThemeProvider/ThemeProvider"
import { useIsMobile } from "@/hooks/useMediaQuery"
import { useAuth } from "../../context/AuthContext"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Orders", href: "/orders", icon: Package },
  { name: "Flow", href: "/flow", icon: FileLineChart },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Account", href: "/account", icon: Settings },
]

const integrations = [{ name: "Meta Onboarding", href: "/facebook-login", icon: SiMeta }]

function DashboardLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const isMobile = useIsMobile()
  const [isMounted, setIsMounted] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => logout()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar pathname={pathname} handleLogout={handleLogout} />
        <div className="flex flex-col flex-1 w-full transition-all duration-300">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger className="text-primary hover:bg-primary/10" />
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                {isMobile && <p className="text-lg font-semibold text-primary">Business Dashboard</p>}
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <UserMenu user={user} onLogout={handleLogout} />
              </div>
            </div>
          </header>
          <main className="flex-1 w-full overflow-auto p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-7xl mx-auto animate-in">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar({ pathname, handleLogout }) {
  const { state } = useSidebar()

  return (
    <Sidebar className="w-64 min-w-[16rem] flex flex-col h-screen border-r border-white/10 transition-all duration-300">
      <SidebarHeader className="flex items-center h-16 px-8 mt-3 border-b border-white/20">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-md border border-primary flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <span className="text-2xl font-semibold text-primary">Zohfy</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu className="py-1 mt-4">
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center gap-10 px-6 py-3 rounded-md w-full text-foreground hover:bg-primary/10 ${pathname === item.href ? "bg-primary/20" : ""}`}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator className="my-4 bg-primary/20" />
        <div className="px-6 py-2 text-sm font-medium text-muted-foreground">Integrations</div>
        <SidebarMenu className="py-1">
          {integrations.map((item) => (
            <SidebarMenuItem key={item.name}>
              <Link
                to={item.href}
                className={`flex items-center gap-10 px-6 py-3 rounded-md w-full text-foreground hover:bg-primary/10 ${pathname === item.href ? "bg-primary/20" : ""}`}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/20 p-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="menu-item-hover py-5 w-full hover:bg-secondary active:bg-white/30">
              <button onClick={handleLogout} className="flex items-center gap-4 w-full px-5 py-10 rounded-md">
                <LogOut className="h-6 w-6 text-red-400" />
                <span className="text-red-400">Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover-scale">
          {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function UserMenu({ user, onLogout }) {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("")
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover-scale">
          <Avatar className="h-8 w-8 border-2 border-primary/20">
            <AvatarImage src="/placeholder-user.jpg" alt={user?.name || user?.email || "User"} />
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium">{user?.name || user?.email || "User"}</p>
          <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
        </div>
        <DropdownMenuItem asChild>
          <Link to="/account" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4 text-red-400" />
          <span className="text-red-400">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DashboardLayout
