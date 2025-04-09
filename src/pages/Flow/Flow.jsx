"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs/Tabs"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Label } from "../../components/ui/Label/Label"
import { Textarea } from "../../components/ui/Textarea/Textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/Dialog/Dialog"
import { Plus, Settings, AlertTriangle, FileText, Trash, Edit, Copy, X, Save } from "lucide-react"

function Flow() {
  const [activeTab, setActiveTab] = useState("responses")
  const [customer_name, setCustomerName] = useState("John Doe")
  const [order_id, setOrderId] = useState("12345")
  const [tracking_link, setTrackingLink] = useState("https://example.com/track/12345")
  const [address, setAddress] = useState("123 Main St, Anytown")
  const [isNewResponseOpen, setIsNewResponseOpen] = useState(false)
  const [isNewWorkflowOpen, setIsNewWorkflowOpen] = useState(false)
  const [isNewRuleOpen, setIsNewRuleOpen] = useState(false)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const [newResponse, setNewResponse] = useState({
    title: "",
    keyword: "",
    response: "",
    active: true,
  })
  const [responses, setResponses] = useState([
    {
      id: 1,
      title: "Welcome Message",
      keyword: "hello,hi,hey",
      response: "Hello! Thanks for reaching out to Business Dashboard. How can we help you today?",
      active: true,
    },
    {
      id: 2,
      title: "Business Hours",
      keyword: "hours,open,timing",
      response: "Our business hours are Monday to Friday, 9 AM to 6 PM. We're closed on weekends and public holidays.",
      active: true,
    },
    {
      id: 3,
      title: "Pricing Inquiry",
      keyword: "price,cost,pricing",
      response:
        "Our pricing starts at $29/month for the basic plan. Would you like me to send you our detailed pricing information?",
      active: true,
    },
    {
      id: 4,
      title: "Support Request",
      keyword: "help,support,issue",
      response:
        "I understand you need assistance. Could you please provide more details about your issue so we can help you better?",
      active: false,
    },
    {
      id: 5,
      title: "Order Status",
      keyword: "order,status,tracking",
      response:
        "To check your order status, please provide your order number and I'll look that up for you right away.",
      active: true,
    },
  ])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewResponse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddResponse = () => {
    const newId = responses.length > 0 ? Math.max(...responses.map((r) => r.id)) + 1 : 1
    setResponses([...responses, { ...newResponse, id: newId }])
    setNewResponse({ title: "", keyword: "", response: "", active: true })
    setIsNewResponseOpen(false)
  }

  const handleDeleteResponse = (id) => {
    setResponses(responses.filter((response) => response.id !== id))
  }

  const handleToggleResponseActive = (id) => {
    setResponses(
      responses.map((response) => (response.id === id ? { ...response, active: !response.active } : response)),
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Flow</h1>
        <p className="text-muted-foreground">Configure automated responses and workflows for customer interactions</p>
      </div>

      <Tabs defaultValue="responses" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="responses" className="transition-all">
            Automated Responses
          </TabsTrigger>
          <TabsTrigger value="workflows" className="transition-all">
            Workflows
          </TabsTrigger>
          <TabsTrigger value="escalation" className="transition-all">
            Escalation Rules
          </TabsTrigger>
          <TabsTrigger value="templates" className="transition-all">
            Message Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="responses" className="mt-6">
          <AutomatedResponses
            responses={responses}
            onAddClick={() => setIsNewResponseOpen(true)}
            onDeleteResponse={handleDeleteResponse}
            onToggleActive={handleToggleResponseActive}
          />
        </TabsContent>
        <TabsContent value="workflows" className="mt-6">
          <Workflows onAddClick={() => setIsNewWorkflowOpen(true)} />
        </TabsContent>
        <TabsContent value="escalation" className="mt-6">
          <EscalationRules onAddClick={() => setIsNewRuleOpen(true)} />
        </TabsContent>
        <TabsContent value="templates" className="mt-6">
          <MessageTemplates onAddClick={() => setIsNewTemplateOpen(true)} />
        </TabsContent>
      </Tabs>

      {/* New Response Dialog */}
      <Dialog open={isNewResponseOpen} onOpenChange={setIsNewResponseOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Response</DialogTitle>
            <DialogDescription>
              Create an automated response that will be triggered by specific keywords.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Response Title</Label>
              <Input
                id="title"
                name="title"
                value={newResponse.title}
                onChange={handleInputChange}
                placeholder="e.g., Welcome Message"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keyword">Trigger Keywords (comma separated)</Label>
              <Input
                id="keyword"
                name="keyword"
                value={newResponse.keyword}
                onChange={handleInputChange}
                placeholder="e.g., hello,hi,hey"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="response">Response Message</Label>
              <Textarea
                id="response"
                name="response"
                value={newResponse.response}
                onChange={handleInputChange}
                placeholder="Enter the automated response message"
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={newResponse.active}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewResponseOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddResponse}>Add Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Workflow Dialog */}
      <Dialog open={isNewWorkflowOpen} onOpenChange={setIsNewWorkflowOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>Set up an automated workflow for customer interactions.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="workflow-title">Workflow Title</Label>
              <Input id="workflow-title" placeholder="e.g., New Customer Onboarding" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-description">Description</Label>
              <Textarea id="workflow-description" placeholder="Describe what this workflow does" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label>Trigger</Label>
              <div className="flex items-center space-x-2 p-4 border rounded-md">
                <div className="flex-1">When a new customer is created</div>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Steps</Label>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <div className="flex-1">1. Send welcome email</div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-md">
                  <div className="flex-1">2. Wait for 2 days</div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewWorkflowOpen(false)}>
              Cancel
            </Button>
            <Button>Create Workflow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Escalation Rule Dialog */}
      <Dialog open={isNewRuleOpen} onOpenChange={setIsNewRuleOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Escalation Rule</DialogTitle>
            <DialogDescription>Create a rule to automatically escalate certain situations.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rule-title">Rule Title</Label>
              <Input id="rule-title" placeholder="e.g., Urgent Support Requests" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rule-condition">Condition</Label>
              <Input id="rule-condition" placeholder="e.g., Message contains 'urgent'" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rule-action">Action</Label>
              <Input id="rule-action" placeholder="e.g., Assign to support manager" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rule-priority">Priority</Label>
              <select
                id="rule-priority"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRuleOpen(false)}>
              Cancel
            </Button>
            <Button>Add Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Template Dialog */}
      <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Message Template</DialogTitle>
            <DialogDescription>Create a reusable message template with placeholders.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template-title">Template Title</Label>
              <Input id="template-title" placeholder="e.g., Order Confirmation" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="template-category">Category</Label>
              <select
                id="template-category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="transactional">Transactional</option>
                <option value="onboarding">Onboarding</option>
                <option value="customer-service">Customer Service</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="template-content">Template Content</Label>
              <Textarea
                id="template-content"
                placeholder="Enter template with placeholders like {{customer_name}}"
                rows={5}
              />
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">
                Available placeholders: {{ customer_name }}, {{ order_id }}, {{ tracking_link }}, {{ address }}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTemplateOpen(false)}>
              Cancel
            </Button>
            <Button>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AutomatedResponses({ responses, onAddClick, onDeleteResponse, onToggleActive }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Automated Responses</h2>
        <Button className="hover-scale" onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Response
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {responses.map((response) => (
          <ResponseCard
            key={response.id}
            response={response}
            onDelete={() => onDeleteResponse(response.id)}
            onToggleActive={() => onToggleActive(response.id)}
          />
        ))}
        <Card
          className="border-dashed border-2 hover:border-primary/50 transition-all duration-200 flex items-center justify-center cursor-pointer"
          onClick={onAddClick}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Add New Response</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ResponseCard({ response, onDelete, onToggleActive }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedResponse, setEditedResponse] = useState(response)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditedResponse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSave = () => {
    // In a real app, you would update the response in the database
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Card className="card-hover overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <Input name="title" value={editedResponse.title} onChange={handleInputChange} className="font-semibold" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2">
            <Label htmlFor="edit-keyword">Triggers:</Label>
            <Input
              id="edit-keyword"
              name="keyword"
              value={editedResponse.keyword}
              onChange={handleInputChange}
              className="mt-1 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <Label htmlFor="edit-response">Response:</Label>
          <Textarea
            id="edit-response"
            name="response"
            value={editedResponse.response}
            onChange={handleInputChange}
            className="mt-1"
            rows={3}
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="edit-active"
              name="active"
              checked={editedResponse.active}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="edit-active" className="ml-2">
              Active
            </Label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{response.title}</CardTitle>
          <div
            className={`h-3 w-3 rounded-full cursor-pointer ${response.active ? "bg-green-500" : "bg-gray-300"}`}
            onClick={onToggleActive}
            title={response.active ? "Active" : "Inactive"}
          ></div>
        </div>
        <CardDescription>
          Triggers: <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{response.keyword}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{response.response}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Workflows({ onAddClick }) {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      title: "New Customer Onboarding",
      description: "Automatically send welcome messages and setup guides to new customers",
      steps: 4,
      active: true,
    },
    {
      id: 2,
      title: "Order Confirmation",
      description: "Send order confirmation and tracking details when a new order is placed",
      steps: 3,
      active: true,
    },
    {
      id: 3,
      title: "Abandoned Cart Recovery",
      description: "Follow up with customers who have items in their cart but haven't completed checkout",
      steps: 2,
      active: false,
    },
  ])

  const toggleWorkflowActive = (id) => {
    setWorkflows(
      workflows.map((workflow) => (workflow.id === id ? { ...workflow, active: !workflow.active } : workflow)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Workflows</h2>
        <Button className="hover-scale" onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <div className="grid gap-4">
        {workflows.map((workflow) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            onToggleActive={() => toggleWorkflowActive(workflow.id)}
          />
        ))}
      </div>
    </div>
  )
}

function WorkflowCard({ workflow, onToggleActive }) {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{workflow.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
            <div className="flex items-center mt-4">
              <Settings className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">{workflow.steps} steps</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div
              className={`px-2 py-1 rounded-full text-xs ${workflow.active ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`}
            >
              {workflow.active ? "Active" : "Inactive"}
            </div>
            <div className="flex mt-4 gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={workflow.active ? "text-red-500" : "text-green-500"}
                onClick={onToggleActive}
              >
                {workflow.active ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EscalationRules({ onAddClick }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Escalation Rules</h2>
        <Button className="hover-scale" onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      <Card className="card-hover">
        <CardContent className="p-6">
          <div className="space-y-4">
            <EscalationRule
              title="Urgent Support Requests"
              condition="Message contains 'urgent', 'emergency', or 'critical'"
              action="Assign to support manager and send SMS notification"
              priority="High"
            />
            <EscalationRule
              title="Unresolved Issues (24h)"
              condition="Issue remains open for more than 24 hours"
              action="Escalate to next support tier and send email notification"
              priority="Medium"
            />
            <EscalationRule
              title="VIP Customer"
              condition="Customer is tagged as VIP"
              action="Assign to senior support agent and prioritize in queue"
              priority="High"
            />
            <EscalationRule
              title="Refund Requests"
              condition="Message contains 'refund' or 'money back'"
              action="Route to billing department"
              priority="Medium"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EscalationRule({ title, condition, action, priority }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-4">
        <AlertTriangle
          className={`h-5 w-5 ${priority === "High" ? "text-red-500" : priority === "Medium" ? "text-yellow-500" : "text-blue-500"}`}
        />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            <span className="font-semibold">If:</span> {condition}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Then:</span> {action}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(priority)}`}>{priority} Priority</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function MessageTemplates({ onAddClick }) {
  const customer_name = "John Doe"
  const order_id = "12345"
  const tracking_link = "https://example.com/track/12345"
  const address = "123 Main St, Anytown"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Message Templates</h2>
        <Button className="hover-scale" onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TemplateCard
          title="Order Confirmation"
          category="Transactional"
          preview={`Thank you for your order #${order_id}! Your items will be shipped to ${address} within 2 business days.`}
        />
        <TemplateCard
          title="Shipping Notification"
          category="Transactional"
          preview={`Good news! Your order #${order_id} has been shipped and is on its way to you. Track your package: ${tracking_link}`}
        />
        <TemplateCard
          title="Welcome Message"
          category="Onboarding"
          preview={`Welcome to Business Dashboard, ${customer_name}! We're excited to have you on board. Here's how to get started...`}
        />
        <TemplateCard
          title="Feedback Request"
          category="Customer Service"
          preview={`Hi ${customer_name}, thank you for contacting our support team. We'd love to hear about your experience. Please take a moment to...`}
        />
      </div>
    </div>
  )
}

function TemplateCard({ title, category, preview }) {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{category}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-3 rounded-md">
          <p className="text-sm text-muted-foreground">{preview}</p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Duplicate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Flow
