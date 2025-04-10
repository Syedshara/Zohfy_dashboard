"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/Card/Card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Label } from "../../components/ui/Label/Label"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar/Avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/Dialog/Dialog"
import {
  User,
  Mail,
  Phone,
  Building,
  Save,
  Upload,
  Bell,
  UserPlus,
  Key,
  Globe,
  Palette,
  Smartphone,
  BarChart3,
  Check,
} from "lucide-react"
import { useTheme } from "../../components/ThemeProvider/ThemeProvider"

function Account() {
  const [activeTab, setActiveTab] = useState("users")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Support",
    status: "Invited",
  })
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      isCurrentUser: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Support",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Support",
      status: "Invited",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="transition-all">
            User Management
          </TabsTrigger>
          <TabsTrigger value="tenant" className="transition-all">
            Tenant Settings
          </TabsTrigger>
          <TabsTrigger value="notifications" className="transition-all">
            Notifications
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {activeTab === "users" && (
            <UserManagement
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              onAddUserClick={() => setIsAddUserOpen(true)}
            />
          )}
          {activeTab === "tenant" && <TenantSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Add a new user to your team. They will receive an email invitation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john.smith@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Support">Support</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const newMember = {
                  id: teamMembers.length + 1,
                  name: newUser.name,
                  email: newUser.email,
                  role: newUser.role,
                  status: "Invited",
                  avatar: "/placeholder.svg?height=40&width=40",
                  isCurrentUser: false,
                }
                setTeamMembers([...teamMembers, newMember])
                setNewUser({
                  name: "",
                  email: "",
                  role: "Support",
                  status: "Invited",
                })
                setIsAddUserOpen(false)
              }}
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function UserManagement({ teamMembers, setTeamMembers, onAddUserClick }) {
  const [profileImage, setProfileImage] = useState("/placeholder-user.jpg")
  const profileInputRef = useRef(null)
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const handleProfileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess(false)

    // Simple validation
    if (!passwordInfo.currentPassword || !passwordInfo.newPassword || !passwordInfo.confirmPassword) {
      setPasswordError("All fields are required")
      return
    }

    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    // Simulate password update
    setPasswordSuccess(true)
    setPasswordInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your personal information and account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-4 my-10 mx-16">
              <Avatar className="h-36 w-36 ">
                <AvatarImage src={profileImage} alt="User" />
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              <input
                type="file"
                ref={profileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfileUpload}
              />
              <Button variant="outline" size="sm" className="w-full" onClick={() => profileInputRef.current.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    placeholder="John Doe"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    placeholder="john.doe@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange}
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="hover-scale">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage users who have access to your account</CardDescription>
          </div>
          <Button size="sm" className="hover-scale" onClick={onAddUserClick}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.id}
                member={member}
                onDelete={() => {
                  if (!member.isCurrentUser) {
                    setTeamMembers(teamMembers.filter((m) => m.id !== member.id))
                  }
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit}>
          <CardContent className="space-y-4">
            {passwordError && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">{passwordError}</div>
            )}
            {passwordSuccess && (
              <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-md text-sm flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Password updated successfully
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="current-password"
                  name="currentPassword"
                  value={passwordInfo.currentPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="new-password"
                  name="newPassword"
                  value={passwordInfo.newPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  value={passwordInfo.confirmPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPasswordInfo({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                })
                setPasswordError("")
                setPasswordSuccess(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update Password</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

function TeamMember({ member, onDelete }) {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{member.name}</p>
              {member.isCurrentUser && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">You</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{member.role}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${member.status === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              }`}
          >
            {member.status}
          </span>
          {member.isCurrentUser ? (
            <Button variant="ghost" size="sm" disabled>
              Current User
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setIsConfirmDeleteOpen(true)}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {member.name} from your team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center font-medium">{member.name}</p>
            <p className="text-center text-sm text-muted-foreground">{member.email}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete()
                setIsConfirmDeleteOpen(false)
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function TenantSettings() {
  const [companyLogo, setCompanyLogo] = useState(null)
  const logoInputRef = useRef(null)
  const { setTheme } = useTheme()

  // Enhanced color state with more properties
  const [colorSettings, setColorSettings] = useState(() => {
    // Initialize from localStorage if available, otherwise use default settings
    const savedSettings = localStorage.getItem("theme-color-settings")
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
        baseColor: "#2DD4BF",
        intensity: 100, // percentage of color intensity (saturation)
        contrast: 50, // contrast level
        useGradient: false,
        gradientColor: "#3B82F6",
        gradientDirection: "to right",
        blendMode: "normal",
      }
  })

  // Preview state to show changes before applying
  const [previewColor, setPreviewColor] = useState(colorSettings.baseColor)
  const [previewIntensity, setPreviewIntensity] = useState(colorSettings.intensity)
  const [previewContrast, setPreviewContrast] = useState(colorSettings.contrast)
  const [previewUseGradient, setPreviewUseGradient] = useState(colorSettings.useGradient)
  const [previewGradientColor, setPreviewGradientColor] = useState(colorSettings.gradientColor)
  const [previewGradientDirection, setPreviewGradientDirection] = useState(colorSettings.gradientDirection)
  const [previewBlendMode, setPreviewBlendMode] = useState(colorSettings.blendMode)

  const [companyInfo, setCompanyInfo] = useState({
    name: "Acme Inc.",
    website: "https://example.com",
    industry: "Technology",
  })

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target
    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCompanyLogo(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    // Apply the stored color settings on component mount
    applyThemeColor(colorSettings, false)
  }, [])

  // Preview the color changes in real-time
  useEffect(() => {
    const previewSettings = {
      baseColor: previewColor,
      intensity: previewIntensity,
      contrast: previewContrast,
      useGradient: previewUseGradient,
      gradientColor: previewGradientColor,
      gradientDirection: previewGradientDirection,
      blendMode: previewBlendMode,
    }

    // Apply preview without saving to storage
    applyThemeColor(previewSettings, false)
  }, [
    previewColor,
    previewIntensity,
    previewContrast,
    previewUseGradient,
    previewGradientColor,
    previewGradientDirection,
    previewBlendMode,
  ])

  const applyThemeColor = (settings, saveToStorage = true) => {
    if (saveToStorage) {
      // Save all settings to localStorage for persistence
      localStorage.setItem("theme-color-settings", JSON.stringify(settings))
      // Update the state with the saved settings
      setColorSettings(settings)
    }

    // Convert hex to HSL for CSS variables
    const hexToHSL = (hex) => {
      // Remove the # if present
      hex = hex.replace(/^#/, "")

      // Parse the hex values
      const r = Number.parseInt(hex.substring(0, 2), 16) / 255
      const g = Number.parseInt(hex.substring(2, 4), 16) / 255
      const b = Number.parseInt(hex.substring(4, 6), 16) / 255

      // Find the min and max values to calculate saturation
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h,
        s,
        l = (max + min) / 2

      if (max === min) {
        h = s = 0 // achromatic
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
          default:
            break
        }

        h /= 6
      }

      // Convert to degrees and percentages
      h = Math.round(h * 360)
      s = Math.round(s * 100)
      l = Math.round(l * 100)

      return { h, s, l }
    }

    const hsl = hexToHSL(settings.baseColor)

    // Apply intensity (saturation) adjustment
    const adjustedS = Math.min(Math.max(hsl.s * (settings.intensity / 100), 0), 100)

    // Apply contrast adjustment (affects lightness)
    const contrastFactor = (settings.contrast - 50) / 100
    const adjustedL = Math.min(Math.max(hsl.l + contrastFactor * 20, 10), 90)

    const hslString = `${hsl.h} ${adjustedS}% ${adjustedL}%`

    // Update CSS variables for the theme
    const root = document.documentElement

    // Primary color and its variants
    root.style.setProperty("--primary", hslString)

    // If using gradient, set up gradient background
    if (settings.useGradient) {
      const gradientHsl = hexToHSL(settings.gradientColor)
      const adjustedGradientS = Math.min(Math.max(gradientHsl.s * (settings.intensity / 100), 0), 100)
      const adjustedGradientL = Math.min(Math.max(gradientHsl.l + contrastFactor * 20, 10), 90)
      const gradientHslString = `${gradientHsl.h} ${adjustedGradientS}% ${adjustedGradientL}%`

      // Set gradient for elements that support it
      root.style.setProperty(
        "--primary-gradient",
        `linear-gradient(${settings.gradientDirection}, hsl(${hslString}), hsl(${gradientHslString}))`,
      )

      // Add a CSS class to enable gradient usage
      document.body.classList.add("use-gradient-theme")
    } else {
      // Remove gradient if not using it
      root.style.setProperty("--primary-gradient", "none")
      document.body.classList.remove("use-gradient-theme")
    }

    // Set blend mode
    root.style.setProperty("--color-blend-mode", settings.blendMode)

    // Update accent color based on primary (slightly lighter)
    const accentL = Math.min(adjustedL + 45, 96)
    root.style.setProperty("--accent", `${hsl.h} ${adjustedS * 0.8}% ${accentL}%`)

    // Update accent-foreground to be the primary color but with adjusted contrast for better readability
    root.style.setProperty("--accent-foreground", `${hsl.h} ${adjustedS}% ${adjustedL < 50 ? 90 : 20}%`)

    // Update ring color to match primary but slightly more saturated for focus states
    root.style.setProperty("--ring", `${hsl.h} ${Math.min(adjustedS + 10, 100)}% ${adjustedL}%`)

    // Update sidebar colors with adjusted intensity
    root.style.setProperty("--sidebar-primary", hslString)
    root.style.setProperty("--sidebar-accent", `${hsl.h} ${adjustedS}% ${Math.max(adjustedL - 5, 10)}%`)

    // Update chart colors with complementary hues but consistent saturation/lightness
    root.style.setProperty("--chart-1", hslString)
    root.style.setProperty("--chart-2", `${(hsl.h + 60) % 360} ${adjustedS}% ${adjustedL}%`)
    root.style.setProperty("--chart-3", `${(hsl.h + 120) % 360} ${adjustedS}% ${adjustedL}%`)
    root.style.setProperty("--chart-4", `${(hsl.h + 180) % 360} ${adjustedS}% ${adjustedL}%`)
    root.style.setProperty("--chart-5", `${(hsl.h + 240) % 360} ${adjustedS}% ${adjustedL}%`)

    // Add CSS custom properties for text on colored backgrounds
    const textColor = adjustedL < 60 ? "255, 255, 255" : "0, 0, 0"
    root.style.setProperty("--on-primary-text", textColor)
  }

  // Save the preview settings as the actual theme
  const saveThemeSettings = () => {
    const newSettings = {
      baseColor: previewColor,
      intensity: previewIntensity,
      contrast: previewContrast,
      useGradient: previewUseGradient,
      gradientColor: previewGradientColor,
      gradientDirection: previewGradientDirection,
      blendMode: previewBlendMode,
    }

    applyThemeColor(newSettings, true)
  }

  // Reset preview to current settings
  const cancelPreview = () => {
    setPreviewColor(colorSettings.baseColor)
    setPreviewIntensity(colorSettings.intensity)
    setPreviewContrast(colorSettings.contrast)
    setPreviewUseGradient(colorSettings.useGradient)
    setPreviewGradientColor(colorSettings.gradientColor)
    setPreviewGradientDirection(colorSettings.gradientDirection)
    setPreviewBlendMode(colorSettings.blendMode)
  }

  const colorOptions = [
    { name: "Teal", value: "#2DD4BF" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
    { name: "Gray", value: "#6B7280" },
  ]

  const gradientDirections = [
    { name: "To Right", value: "to right" },
    { name: "To Left", value: "to left" },
    { name: "To Bottom", value: "to bottom" },
    { name: "To Top", value: "to top" },
    { name: "To Bottom Right", value: "to bottom right" },
    { name: "To Bottom Left", value: "to bottom left" },
    { name: "To Top Right", value: "to top right" },
    { name: "To Top Left", value: "to top left" },
  ]

  const blendModes = [
    { name: "Normal", value: "normal" },
    { name: "Multiply", value: "multiply" },
    { name: "Screen", value: "screen" },
    { name: "Overlay", value: "overlay" },
    { name: "Darken", value: "darken" },
    { name: "Lighten", value: "lighten" },
    { name: "Color Dodge", value: "color-dodge" },
    { name: "Color Burn", value: "color-burn" },
    { name: "Hard Light", value: "hard-light" },
    { name: "Soft Light", value: "soft-light" },
    { name: "Difference", value: "difference" },
    { name: "Exclusion", value: "exclusion" },
  ]

  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Manage your company details and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-4 mx-16 my-10">
              {companyLogo ? (
                <div className="h-24 w-24 rounded-md overflow-hidden border border-primary">
                  <img
                    src={companyLogo || "/placeholder.svg"}
                    alt="Company Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-md bg-primary flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-primary-foreground" />
                </div>
              )}
              <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
              <Button variant="outline" size="sm" className="w-full" onClick={() => logoInputRef.current.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
            </div>
            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company-name"
                    name="name"
                    value={companyInfo.name}
                    onChange={handleCompanyInfoChange}
                    placeholder="Acme Inc."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    name="website"
                    value={companyInfo.website}
                    onChange={handleCompanyInfoChange}
                    placeholder="https://example.com"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="industry"
                    name="industry"
                    value={companyInfo.industry}
                    onChange={handleCompanyInfoChange}
                    placeholder="Technology"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="hover-scale">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Color settings column */}
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Primary Color</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className={`h-10 w-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${previewColor === color.value ? "ring-2 ring-offset-2" : ""}`}
                      style={{ backgroundColor: color.value, ringColor: color.value }}
                      onClick={() => setPreviewColor(color.value)}
                      title={color.name}
                    ></div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={previewColor}
                      onChange={(e) => setPreviewColor(e.target.value)}
                      className="h-10 w-10 cursor-pointer rounded-full border-0 bg-transparent"
                      title="Custom color"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-intensity">Color Intensity</Label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">Subtle</span>
                  <input
                    id="color-intensity"
                    type="range"
                    min="20"
                    max="100"
                    value={previewIntensity}
                    onChange={(e) => setPreviewIntensity(Number.parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">Vibrant</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-contrast">Contrast</Label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">Low</span>
                  <input
                    id="color-contrast"
                    type="range"
                    min="0"
                    max="100"
                    value={previewContrast}
                    onChange={(e) => setPreviewContrast(Number.parseInt(e.target.value))}
                    className="flex-1 bg-black"
                  />
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="use-gradient"
                    checked={previewUseGradient}
                    onChange={(e) => setPreviewUseGradient(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="use-gradient">Use Gradient</Label>
                </div>

                {previewUseGradient && (
                  <div className="pl-6 space-y-4 mt-2">
                    <div>
                      <Label className="mb-2 block">Secondary Color</Label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((color) => (
                          <div
                            key={color.value}
                            className={`h-8 w-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${previewGradientColor === color.value ? "ring-2 ring-offset-2" : ""}`}
                            style={{ backgroundColor: color.value, ringColor: color.value }}
                            onClick={() => setPreviewGradientColor(color.value)}
                            title={color.name}
                          ></div>
                        ))}
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={previewGradientColor}
                            onChange={(e) => setPreviewGradientColor(e.target.value)}
                            className="h-8 w-8 cursor-pointer rounded-full border-0 bg-transparent"
                            title="Custom color"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gradient-direction">Gradient Direction</Label>
                      <select
                        id="gradient-direction"
                        value={previewGradientDirection}
                        onChange={(e) => setPreviewGradientDirection(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                      >
                        {gradientDirections.map((direction) => (
                          <option key={direction.value} value={direction.value}>
                            {direction.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="blend-mode">Blend Mode</Label>
                <div className="relative">
                  <select
                    id="blend-mode"
                    value={previewBlendMode}
                    onChange={(e) => setPreviewBlendMode(e.target.value)}
                    className="flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pl-3 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {blendModes.map((mode) => (
                      <option key={mode.value} value={mode.value}>
                        {mode.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview column */}
            <div className="space-y-6">
              <Label className="block mb-2">Live Preview</Label>
              <div className="space-y-4 border rounded-lg p-4">
                {/* Header preview */}
                <div className="border-b pb-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Header</h3>
                </div>
                <div className="h-12 bg-background flex items-center px-4 border rounded-md">
                  <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">Logo</span>
                  </div>
                  <div className="ml-4 h-6 w-24 bg-muted rounded"></div>
                  <div className="ml-auto flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                    <div className="h-8 w-8 rounded-full bg-muted"></div>
                  </div>
                </div>

                {/* Sidebar preview */}
                <div className="border-b pb-2 mt-4">
                  <h3 className="font-semibold text-sm text-muted-foreground">Sidebar</h3>
                </div>
                <div className="flex h-32 border rounded-md overflow-hidden">
                  <div className="w-1/4 bg-sidebar flex flex-col p-2 gap-2">
                    <div className="h-6 bg-sidebar-accent rounded w-full"></div>
                    <div className="h-6 bg-sidebar-accent/50 rounded w-full"></div>
                    <div className="h-6 bg-sidebar-accent/50 rounded w-full"></div>
                  </div>
                  <div className="w-3/4 p-3">
                    <div className="h-8 w-3/4 bg-primary/10 rounded-md mb-3"></div>
                    <div className="h-4 w-full bg-muted rounded mb-2"></div>
                    <div className="h-4 w-full bg-muted rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-muted rounded"></div>
                  </div>
                </div>




              </div>
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Theme Mode</Label>
            <div className="flex gap-4">
              <div
                className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/50 transition-all"
                onClick={() => setTheme("light")}
              >
                <div className="w-full h-24 border rounded bg-white"></div>
                <span className="text-sm font-medium">Light Mode</span>
              </div>
              <div
                className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-muted/50 transition-all"
                onClick={() => setTheme("dark")}
              >
                <div className="w-full h-24 border rounded bg-gray-800"></div>
                <span className="text-sm font-medium">Dark Mode</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={cancelPreview}>
            Reset Changes
          </Button>
          <Button className="hover-scale" onClick={saveThemeSettings}>
            <Palette className="mr-2 h-4 w-4" />
            Apply Theme
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function NotificationSettings() {
  const [notificationPreferences, setNotificationPreferences] = useState([
    {
      id: 1,
      title: "New Orders",
      description: "Get notified when a new order is placed",
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: false,
    },
    {
      id: 2,
      title: "Customer Messages",
      description: "Get notified when a customer sends a new message",
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: true,
    },
    {
      id: 3,
      title: "Payment Received",
      description: "Get notified when a payment is processed successfully",
      emailEnabled: true,
      pushEnabled: false,
      smsEnabled: false,
    },
    {
      id: 4,
      title: "System Updates",
      description: "Get notified about system updates and maintenance",
      emailEnabled: true,
      pushEnabled: false,
      smsEnabled: false,
    },
    {
      id: 5,
      title: "Low Inventory",
      description: "Get notified when product inventory is running low",
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: false,
    },
  ])

  const [contactInfo, setContactInfo] = useState({
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationToggle = (id, type) => {
    setNotificationPreferences(
      notificationPreferences.map((pref) => (pref.id === id ? { ...pref, [type]: !pref[type] } : pref)),
    )
  }

  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSavePreferences = () => {
    // Simulate saving
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how and when you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {saveSuccess && (
            <div className="p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-md text-sm flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Notification preferences saved successfully
            </div>
          )}
          <div className="space-y-4">
            {notificationPreferences.map((pref) => (
              <NotificationSetting
                key={pref.id}
                title={pref.title}
                description={pref.description}
                emailEnabled={pref.emailEnabled}
                pushEnabled={pref.pushEnabled}
                smsEnabled={pref.smsEnabled}
                onToggle={(type) => handleNotificationToggle(pref.id, type)}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="hover-scale" onClick={handleSavePreferences}>
            <Bell className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </CardFooter>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details for notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="notification-email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="notification-email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                placeholder="john.doe@example.com"
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notification-phone">Phone Number (for SMS)</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="notification-phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactInfoChange}
                placeholder="+1 (555) 123-4567"
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="hover-scale">
            <Save className="mr-2 h-4 w-4" />
            Update Contact Info
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function NotificationSetting({ title, description, emailEnabled, pushEnabled, smsEnabled, onToggle }) {
  return (
    <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`email-${title}`}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={emailEnabled}
            onChange={() => onToggle("emailEnabled")}
          />
          <Label htmlFor={`email-${title}`} className="text-sm">
            Email
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`push-${title}`}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={pushEnabled}
            onChange={() => onToggle("pushEnabled")}
          />
          <Label htmlFor={`push-${title}`} className="text-sm">
            Push
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`sms-${title}`}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={smsEnabled}
            onChange={() => onToggle("smsEnabled")}
          />
          <Label htmlFor={`sms-${title}`} className="text-sm">
            SMS
          </Label>
        </div>
      </div>
    </div>
  )
}

export default Account
