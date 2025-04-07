"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, IndianRupee, Package, Users, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card/Card"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs/Tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar/Avatar"
import { LineChart } from "../../components/Charts/LineChart"

function Dashboard() {
  const [chartView, setChartView] = useState("daily")

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Today's Revenue"
          value="₹1,245.89"
          icon={<IndianRupee className="h-4 w-4 text-primary" />}
          change={{ value: "12.5%", type: "increase" }}
          description="from yesterday"
        />
        <StatCard
          title="Today's Orders"
          value="24"
          icon={<Package className="h-4 w-4 text-primary" />}
          change={{ value: "8.2%", type: "increase" }}
          description="from yesterday"
        />
        <StatCard
          title="Monthly Revenue"
          value="₹24,568.78"
          icon={<IndianRupee className="h-4 w-4 text-primary" />}
          change={{ value: "18.2%", type: "increase" }}
          description="from last month"
        />
        <StatCard
          title="Monthly Orders"
          value="512"
          icon={<Package className="h-4 w-4 text-primary" />}
          change={{ value: "4.3%", type: "increase" }}
          description="from last month"
        />
        <StatCard
          title="Unread Messages"
          value="18"
          icon={<MessageSquare className="h-4 w-4 text-primary" />}
          change={{ value: "12.5%", type: "increase", negative: true }}
          description="from yesterday"
        />
        <StatCard
          title="Active Users"
          value="24"
          icon={<Users className="h-4 w-4 text-primary" />}
          change={{ value: "10.1%", type: "increase" }}
          description="from last week"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 card-hover">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Order Trends</CardTitle>
              <CardDescription>Overview of your order performance for the last 10 days</CardDescription>
            </div>
            <div className="ml-auto">
              <Tabs value={chartView} onValueChange={setChartView}>
                <TabsList className="grid w-[180px] grid-cols-2">
                  <TabsTrigger value="daily" className="transition-all">
                    Daily
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="transition-all">
                    Monthly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/2]">
              <LineChart />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 card-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest activities in your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                name="John Doe"
                action="created a new order"
                details={["Order #1234", "₹89.99"]}
                time="2 hours ago"
              />
              <ActivityItem
                name="Alice Smith"
                action="updated customer details"
                details={["Customer #5678", "Jane Cooper"]}
                time="4 hours ago"
              />
              <ActivityItem
                name="Robert Johnson"
                action="marked order as delivered"
                details={["Order #9876", "₹245.50"]}
                time="Yesterday at 2:30 PM"
              />
              <ActivityItem
                name="Emma Wilson"
                action="added a new customer"
                details={["Customer #8765", "Michael Brown"]}
                time="Yesterday at 10:15 AM"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, change, description }) {
  return (
    <Card className="stat-card card-hover overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span className={`flex items-center ${change.negative ? "text-rose-500" : "text-emerald-500"}`}>
            {change.type === "increase" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            {change.value}
          </span>
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ name, action, details, time }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div className="flex items-start gap-4 transition-all duration-200 p-2 rounded-md hover:bg-muted/50">
      <Avatar className="h-9 w-9 border border-primary/20">
        <AvatarImage src="/placeholder-user.jpg" alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium">
          <span className="text-primary">{name}</span> {action}
        </p>
        <p className="text-xs text-muted-foreground">{details.join(" - ")}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

export default Dashboard

