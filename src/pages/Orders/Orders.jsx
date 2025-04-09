"use client"

import { useState } from "react"
import { Search, Plus, Filter, MoreHorizontal, FileEdit, Trash, Eye } from "lucide-react"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Card, CardContent } from "../../components/ui/Card/Card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu/DropdownMenu"
import { Badge } from "../../components/ui/Badge/Badge"

// Sample data
const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    address: "123 Main St, New York, NY 10001",
    status: "delivered",
    payment: "paid",
    source: "whatsapp",
    date: "2023-04-01",
    total: "₹125.00",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    address: "456 Park Ave, Boston, MA 02108",
    status: "processing",
    payment: "paid",
    source: "whatsapp",
    date: "2023-04-02",
    total: "₹85.50",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    address: "789 Oak St, Chicago, IL 60601",
    status: "shipped",
    payment: "pending",
    source: "whatsapp",
    date: "2023-04-03",
    total: "₹210.75",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    address: "321 Pine St, San Francisco, CA 94101",
    status: "cancelled",
    payment: "refunded",
    source: "whatsapp",
    date: "2023-04-04",
    total: "₹65.25",
  },
]

function Orders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false)

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "refunded":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full ">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and track all your customer orders</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2 bg-background/50 rounded-md border px-3 focus-within:ring-1 focus-within:ring-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hover-scale">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="hover-scale">
            <Plus className="mr-2 h-4 w-4" />
            Add Order
          </Button>
        </div>
      </div>

      <Card className="card-hover">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                    Address
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                    Source
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="cursor-pointer hover:bg-muted/50 transition-colors border-b">
                    <td className="p-4 align-middle font-medium">{order.id}</td>
                    <td className="p-4 align-middle">{order.customer}</td>
                    <td className="p-4 align-middle hidden md:table-cell">{order.address}</td>
                    <td className="p-4 align-middle">
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge className={getPaymentColor(order.payment)} variant="outline">
                        {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell">{order.source}</td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover-scale">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <FileEdit className="mr-2 h-4 w-4" />
                            <span>Edit Order</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive cursor-pointer">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Order</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Orders

