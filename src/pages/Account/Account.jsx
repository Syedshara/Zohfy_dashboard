"use client"

import { useState, useRef } from "react"
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
              <Avatar className="h-36 w-36 border border-primary">
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
  const [selectedColor, setSelectedColor] = useState("#2DD4BF") // Default teal color
  const [companyInfo, setCompanyInfo] = useState({
    name: "Business Dashboard Inc.",
    website: "https://businessdashboard.com",
    industry: "Software & Technology",
  })

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

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target
    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const applyThemeColor = (color) => {
    setSelectedColor(color)

    // Update CSS variables for the theme
    document.documentElement.style.setProperty("--primary", color)

    // This is a simplified approach - in a real app you would update the theme more comprehensively
    // For demonstration purposes, we're just changing the primary color
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
          <div className="grid gap-4">
            <div>
              <Label className="mb-2 block">Theme Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <div
                    key={color.value}
                    className={`h-10 w-10 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${selectedColor === color.value ? "ring-2 ring-offset-2" : ""}`}
                    style={{ backgroundColor: color.value, ringColor: color.value }}
                    onClick={() => applyThemeColor(color.value)}
                    title={color.name}
                  ></div>
                ))}
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

            <div>
              <Label className="mb-2 block">Layout</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer bg-muted/50">
                  <div className="w-full h-24 border rounded flex">
                    <div className="w-1/4 h-full bg-primary/20"></div>
                    <div className="w-3/4 h-full"></div>
                  </div>
                  <span className="text-sm font-medium">Default</span>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer">
                  <div className="w-full h-24 border rounded flex">
                    <div className="w-1/4 h-full bg-primary/20"></div>
                    <div className="w-3/4 h-full flex flex-col">
                      <div className="h-1/3 border-b"></div>
                      <div className="h-2/3"></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">Split View</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="hover-scale">
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
