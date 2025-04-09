"use client"

import { useState } from "react"
import { BarChart3, Calendar, Download, FileBarChart, Users, IndianRupee, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "../../components/ui/Button/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card/Card"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs/Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/Select/Select"
import { LineChart } from "../../components/Charts/LineChart"
import { BarChart } from "../../components/Charts/BarChart"
import { StackedBarChart } from "../../components/Charts/StackedBarChart"
import { PieChart } from "../../components/Charts/PieChart"

function Analytics() {
  const [dateRange, setDateRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground">Track your business performance with detailed analytics</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="transition-all">
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="transition-all">
              Orders
            </TabsTrigger>
            <TabsTrigger value="customers" className="transition-all">
              Customers
            </TabsTrigger>
            <TabsTrigger value="revenue" className="transition-all">
              Revenue
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="hover-scale">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value="1,248"
          icon={<BarChart3 className="h-4 w-4 text-primary" />}
          change={{ value: "12.5%", type: "increase" }}
          description="from previous period"
        />
        <StatCard
          title="Revenue"
          value="₹45,231.89"
          icon={<IndianRupee className="h-4 w-4 text-primary" />}
          change={{ value: "8.2%", type: "increase" }}
          description="from previous period"
        />
        <StatCard
          title="Active Customers"
          value="573"
          icon={<Users className="h-4 w-4 text-primary" />}
          change={{ value: "4.3%", type: "increase" }}
          description="from previous period"
        />
        <StatCard
          title="Avg. Response Time"
          value="2.4 min"
          icon={<FileBarChart className="h-4 w-4 text-primary" />}
          change={{ value: "18.1%", type: "increase" }}
          description="faster than target"
        />
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "orders" && <OrdersTab />}
      {activeTab === "customers" && <CustomersTab />}
      {activeTab === "revenue" && <RevenueTab />}

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 transition-all duration-200 hover:bg-accent">
              <h3 className="text-sm font-medium">Conversion Rate</h3>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% from last month</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 transition-all duration-200 hover:bg-accent">
              <h3 className="text-sm font-medium">Avg. Order Value</h3>
              <div className="text-2xl font-bold">₹86.42</div>
              <p className="text-xs text-muted-foreground">+₹4.20 from last month</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 transition-all duration-200 hover:bg-accent">
              <h3 className="text-sm font-medium">Customer Retention</h3>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/50 transition-all duration-200 hover:bg-accent">
              <h3 className="text-sm font-medium">Customer Satisfaction</h3>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">Based on 324 reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 card-hover">
        <CardHeader>
          <CardTitle>Order Trends</CardTitle>
          <CardDescription>Number of orders over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[4/2]">
            <LineChart />
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3 card-hover">
        <CardHeader>
          <CardTitle>Customer Activity</CardTitle>
          <CardDescription>Customer engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[4/2]">
            <BarChart />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 card-hover">
        <CardHeader>
          <CardTitle>Revenue by Channel</CardTitle>
          <CardDescription>Distribution of revenue across channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 p-3">
            <PieChart />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4 card-hover">
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
          <CardDescription>Revenue breakdown by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-[4/2]">
            <StackedBarChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function OrdersTab() {
  return (
    <div className="grid gap-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Order Volume</CardTitle>
          <CardDescription>Daily order volume over the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Distribution of orders by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Delivered</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Processing</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Shipped</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Cancelled</span>
                <span className="text-sm font-medium">5%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Order Sources</CardTitle>
            <CardDescription>Where orders are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <PieChart />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Popular Times</CardTitle>
            <CardDescription>When customers place orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-1 h-40">
                {[35, 42, 27, 18, 30, 75, 65, 50, 85, 90, 65, 45].map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/80 rounded-t-sm hover:bg-primary transition-colors"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>12 AM</span>
                <span>6 AM</span>
                <span>12 PM</span>
                <span>6 PM</span>
                <span>12 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CustomersTab() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New customers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <LineChart />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Distribution by customer type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <PieChart />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>Returning vs. new customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <StackedBarChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Customers with highest order value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Orders</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total Spent</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Order</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "John Smith", orders: 24, spent: "₹12,450", lastOrder: "2 days ago", status: "Active" },
                  { name: "Sarah Johnson", orders: 18, spent: "₹9,320", lastOrder: "1 week ago", status: "Active" },
                  { name: "Michael Brown", orders: 15, spent: "₹7,840", lastOrder: "3 days ago", status: "Active" },
                  { name: "Emily Davis", orders: 12, spent: "₹6,210", lastOrder: "5 days ago", status: "Inactive" },
                  { name: "Robert Wilson", orders: 10, spent: "₹5,180", lastOrder: "2 weeks ago", status: "Active" },
                ].map((customer, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle font-medium">{customer.name}</td>
                    <td className="p-4 align-middle">{customer.orders}</td>
                    <td className="p-4 align-middle">{customer.spent}</td>
                    <td className="p-4 align-middle">{customer.lastOrder}</td>
                    <td className="p-4 align-middle text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${customer.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RevenueTab() {
  return (
    <div className="grid gap-6">
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Total revenue over the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Revenue by Product Category</CardTitle>
            <CardDescription>Distribution of revenue across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <BarChart />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Revenue by Payment Method</CardTitle>
            <CardDescription>Distribution of revenue by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <PieChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Monthly Revenue Comparison</CardTitle>
          <CardDescription>Current period vs. previous period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Month</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Current Period
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Previous Period
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { month: "January", current: "₹12,450", previous: "₹10,320", change: "+20.6%" },
                  { month: "February", current: "₹14,320", previous: "₹11,840", change: "+21.0%" },
                  { month: "March", current: "₹15,840", previous: "₹13,210", change: "+19.9%" },
                  { month: "April", current: "₹13,210", previous: "₹12,180", change: "+8.5%" },
                  { month: "May", current: "₹16,180", previous: "₹14,250", change: "+13.5%" },
                  { month: "June", current: "₹18,250", previous: "₹15,320", change: "+19.1%" },
                ].map((data, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4 align-middle font-medium">{data.month}</td>
                    <td className="p-4 align-middle text-right">{data.current}</td>
                    <td className="p-4 align-middle text-right">{data.previous}</td>
                    <td className="p-4 align-middle text-right text-green-500 font-medium">{data.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
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

export default Analytics

