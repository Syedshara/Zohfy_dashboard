"use client"

import { useState } from "react"
import { Search, Filter, UserPlus, MoreHorizontal, Mail, Phone, Edit, Trash, Eye } from "lucide-react"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar/Avatar"
import { Badge } from "../../components/ui/Badge/Badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/Dialog/Dialog"
import { Label } from "../../components/ui/Label/Label"
import { Textarea } from "../../components/ui/Textarea/Textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu/DropdownMenu"

// Sample customer data
const initialCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    orders: 24,
    totalSpent: "₹12,450",
    lastOrder: "2 days ago",
    notes: "VIP customer, prefers email communication",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    orders: 18,
    totalSpent: "₹9,320",
    lastOrder: "1 week ago",
    notes: "Interested in premium plans",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    orders: 15,
    totalSpent: "₹7,840",
    lastOrder: "3 weeks ago",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    orders: 12,
    totalSpent: "₹6,210",
    lastOrder: "5 days ago",
    notes: "Prefers phone calls over emails",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    phone: "+1 (555) 876-5432",
    status: "active",
    orders: 10,
    totalSpent: "₹5,180",
    lastOrder: "2 weeks ago",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

function Customers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers, setCustomers] = useState(initialCustomers)
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false)
  const [isViewCustomerOpen, setIsViewCustomerOpen] = useState(false)
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false)
  const [isDeleteCustomerOpen, setIsDeleteCustomerOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    notes: "",
  })

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddCustomer = () => {
    const id = customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1
    const customer = {
      ...newCustomer,
      id,
      orders: 0,
      totalSpent: "₹0",
      lastOrder: "Never",
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setCustomers([...customers, customer])
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "active",
      notes: "",
    })
    setIsAddCustomerOpen(false)
  }

  const handleEditCustomer = () => {
    setCustomers(customers.map((c) => (c.id === currentCustomer.id ? currentCustomer : c)))
    setIsEditCustomerOpen(false)
  }

  const handleDeleteCustomer = () => {
    setCustomers(customers.filter((c) => c.id !== currentCustomer.id))
    setIsDeleteCustomerOpen(false)
  }

  const viewCustomer = (customer) => {
    setCurrentCustomer(customer)
    setIsViewCustomerOpen(true)
  }

  const editCustomer = (customer) => {
    setCurrentCustomer(customer)
    setIsEditCustomerOpen(true)
  }

  const deleteCustomer = (customer) => {
    setCurrentCustomer(customer)
    setIsDeleteCustomerOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage your customer database and information</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2 bg-background/50 rounded-md border px-3 focus-within:ring-1 focus-within:ring-primary">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
          <Button size="sm" className="hover-scale" onClick={() => setIsAddCustomerOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                    Contact
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden md:table-cell">
                    Orders
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground hidden lg:table-cell">
                    Total Spent
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors border-b"
                    onClick={() => viewCustomer(customer)}
                  >
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground hidden sm:block">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge
                        className={
                          customer.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }
                        variant="outline"
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle hidden md:table-cell">{customer.orders}</td>
                    <td className="p-4 align-middle hidden lg:table-cell">{customer.totalSpent}</td>
                    <td className="p-4 align-middle text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover-scale">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              viewCustomer(customer)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              editCustomer(customer)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Customer</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteCustomer(customer)
                            }}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete Customer</span>
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

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Add a new customer to your database. Fill in the customer's details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                placeholder="John Smith"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                placeholder="john.smith@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={newCustomer.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={newCustomer.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={newCustomer.notes}
                onChange={handleInputChange}
                placeholder="Add any additional notes about this customer"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCustomerOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Customer Dialog */}
      {currentCustomer && (
        <Dialog open={isViewCustomerOpen} onOpenChange={setIsViewCustomerOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={currentCustomer.avatar} alt={currentCustomer.name} />
                  <AvatarFallback className="text-lg">
                    {currentCustomer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{currentCustomer.name}</h3>
                  <Badge
                    className={
                      currentCustomer.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mt-1"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 mt-1"
                    }
                    variant="outline"
                  >
                    {currentCustomer.status.charAt(0).toUpperCase() + currentCustomer.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{currentCustomer.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{currentCustomer.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="font-medium">{currentCustomer.orders}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-medium">{currentCustomer.totalSpent}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Order</p>
                  <p className="font-medium">{currentCustomer.lastOrder}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Notes</p>
                <div className="p-3 bg-muted rounded-md">
                  <p>{currentCustomer.notes || "No notes available."}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewCustomerOpen(false)}>
                Close
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewCustomerOpen(false)
                  editCustomer(currentCustomer)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Customer Dialog */}
      {currentCustomer && (
        <Dialog open={isEditCustomerOpen} onOpenChange={setIsEditCustomerOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>Update the customer's information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={currentCustomer.name}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={currentCustomer.email}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={currentCustomer.phone}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  name="status"
                  value={currentCustomer.status}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, status: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={currentCustomer.notes}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCustomerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCustomer}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Customer Dialog */}
      {currentCustomer && (
        <Dialog open={isDeleteCustomerOpen} onOpenChange={setIsDeleteCustomerOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Customer</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this customer? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-center font-medium">{currentCustomer.name}</p>
              <p className="text-center text-sm text-muted-foreground">{currentCustomer.email}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteCustomerOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteCustomer}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default Customers

