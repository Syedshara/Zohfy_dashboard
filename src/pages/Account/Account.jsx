"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/Card/Card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs/Tabs"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Label } from "../../components/ui/Label/Label"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar/Avatar"
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
} from "lucide-react"

function Account() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex flex-col gap-6">
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
          {activeTab === "users" && <UserManagement />}
          {activeTab === "tenant" && <TenantSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </Tabs>
    </div>
  )
}

function UserManagement() {
  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your personal information and account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
            <div className="flex-1 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="John Doe" className="pl-10" defaultValue="John Doe" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    className="pl-10"
                    defaultValue="john.doe@example.com"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    defaultValue="+1 (555) 123-4567"
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
          <Button size="sm" className="hover-scale">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TeamMember
              name="John Doe"
              email="john.doe@example.com"
              role="Admin"
              status="Active"
              avatar="/placeholder-user.jpg"
              isCurrentUser={true}
            />
            <TeamMember
              name="Sarah Johnson"
              email="sarah.j@example.com"
              role="Support"
              status="Active"
              avatar="/placeholder.svg?height=40&width=40"
            />
            <TeamMember
              name="Michael Brown"
              email="michael.b@example.com"
              role="Support"
              status="Invited"
              avatar="/placeholder.svg?height=40&width=40"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="current-password" type="password" className="pl-10" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="new-password" type="password" className="pl-10" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="confirm-password" type="password" className="pl-10" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function TeamMember({ name, email, role, status, avatar, isCurrentUser = false }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{name}</p>
            {isCurrentUser && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">You</span>}
          </div>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">{role}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${status === "Active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
        >
          {status}
        </span>
        <Button variant="ghost" size="sm" disabled={isCurrentUser}>
          {isCurrentUser ? "Current User" : "Manage"}
        </Button>
      </div>
    </div>
  )
}

function TenantSettings() {
  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Manage your company details and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="h-24 w-24 rounded-md bg-primary flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-primary-foreground" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
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
                    placeholder="Acme Inc."
                    className="pl-10"
                    defaultValue="Business Dashboard Inc."
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    className="pl-10"
                    defaultValue="https://businessdashboard.com"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="industry"
                    placeholder="Technology"
                    className="pl-10"
                    defaultValue="Software & Technology"
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
              <div className="flex gap-2">
                <div className="h-10 w-10 rounded-full bg-[#10b981] cursor-pointer ring-2 ring-offset-2 ring-[#10b981]"></div>
                <div className="h-10 w-10 rounded-full bg-[#3b82f6] cursor-pointer"></div>
                <div className="h-10 w-10 rounded-full bg-[#8b5cf6] cursor-pointer"></div>
                <div className="h-10 w-10 rounded-full bg-[#ec4899] cursor-pointer"></div>
                <div className="h-10 w-10 rounded-full bg-[#f59e0b] cursor-pointer"></div>
                <div className="h-10 w-10 rounded-full bg-[#ef4444] cursor-pointer"></div>
                <div className="h-10 w-10 rounded-full bg-[#6b7280] cursor-pointer"></div>
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
  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how and when you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <NotificationSetting
              title="New Orders"
              description="Get notified when a new order is placed"
              emailEnabled={true}
              pushEnabled={true}
              smsEnabled={false}
            />
            <NotificationSetting
              title="Customer Messages"
              description="Get notified when a customer sends a new message"
              emailEnabled={true}
              pushEnabled={true}
              smsEnabled={true}
            />
            <NotificationSetting
              title="Payment Received"
              description="Get notified when a payment is processed successfully"
              emailEnabled={true}
              pushEnabled={false}
              smsEnabled={false}
            />
            <NotificationSetting
              title="System Updates"
              description="Get notified about system updates and maintenance"
              emailEnabled={true}
              pushEnabled={false}
              smsEnabled={false}
            />
            <NotificationSetting
              title="Low Inventory"
              description="Get notified when product inventory is running low"
              emailEnabled={true}
              pushEnabled={true}
              smsEnabled={false}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="hover-scale">
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
                placeholder="john.doe@example.com"
                className="pl-10"
                defaultValue="john.doe@example.com"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notification-phone">Phone Number (for SMS)</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="notification-phone"
                placeholder="+1 (555) 123-4567"
                className="pl-10"
                defaultValue="+1 (555) 123-4567"
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

function NotificationSetting({ title, description, emailEnabled, pushEnabled, smsEnabled }) {
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
            defaultChecked={emailEnabled}
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
            defaultChecked={pushEnabled}
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
            defaultChecked={smsEnabled}
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

