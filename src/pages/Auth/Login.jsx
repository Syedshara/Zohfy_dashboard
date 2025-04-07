"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  PieChart,
  Database,
  Users,
  Activity,
  Calendar,
  FileText,
  Home,
  Layers,
  LineChart,
  Package,
  ShoppingCart,
  Tag,
  TrendingUp,
  Clipboard,
  Clock,
  DollarSign,
  Globe,
  HelpCircle,
  Inbox,
  LinkIcon,
  List,
  MapPin,
  Monitor,
  Phone,
  Printer,
  Server,
  ShieldAlert,
  Smartphone,
  Tablet,
  Terminal,
  Wifi,
  BarChart3,
  Heart,
  Key,
} from "lucide-react"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/Card/Card"
import AuthBackground from "../../components/Auth/AuthBackground"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("password123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef(null)
  const networkNodesRef = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)

      // Navigate to the page the user was trying to access, or to the dashboard
      const from = location.state?.from?.pathname || "/"
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Draw network function
  const drawNetwork = (ctx, canvas, nodes) => {
    if (!ctx || !nodes.length) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    nodes.forEach((node) => {
      node.connections.forEach((targetIndex) => {
        const target = nodes[targetIndex]
        const gradient = ctx.createLinearGradient(
          centerX + node.x,
          centerY + node.y,
          centerX + target.x,
          centerY + target.y,
        )

        gradient.addColorStop(0, "rgba(100, 116, 139, 0.2)")
        gradient.addColorStop(1, "rgba(100, 116, 139, 0.7)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 0.1
        ctx.beginPath()
        ctx.moveTo(centerX + node.x, centerY + node.y)
        ctx.lineTo(centerX + target.x, centerY + target.y)
        ctx.stroke()
      })
    })
  }

  // Generate organized network nodes (icons)
  const generateOrganizedNetwork = () => {
    const iconCategories = {
      analytics: [BarChart3, PieChart, LineChart, Activity, TrendingUp],
      data: [Database, Server, Layers, Terminal],
      devices: [Monitor, Smartphone, Tablet, Wifi],
      global: [Globe, Shield, ShieldAlert, Key],
      finance: [CreditCard, DollarSign, ShoppingCart, Package, Tag],
      documents: [Clipboard, FileText, Calendar],
      users: [Users, User, Settings, Bell],
      communication: [HelpCircle, Inbox, Clock, Phone, Printer],
      navigation: [LinkIcon, List, Home, MapPin, Heart],
    }

    const nodes = []
    let nodeId = 0

    const createRing = (categoryKeys, radius, count, sizeRange, iconSizeRange, defaultFilled = false) => {
      let placedNodes = 0
      categoryKeys.forEach((category) => {
        const icons = iconCategories[category]
        const iconsToPlace = Math.min(icons.length, Math.ceil(count / categoryKeys.length))

        for (let i = 0; i < iconsToPlace; i++) {
          if (placedNodes >= count) break

          const angle = (placedNodes / count) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          // Randomize size within the specified range
          const size = Math.floor(sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]))
          const iconSize = Math.floor(iconSizeRange[0] + Math.random() * (iconSizeRange[1] - iconSizeRange[0]))
          const filled = defaultFilled ? Math.random() > 0.7 : false

          nodes.push({
            id: nodeId++,
            x,
            y,
            icon: icons[i % icons.length],
            category,
            size,
            iconSize,
            filled,
            connections: [],
          })

          placedNodes++
        }
      })

      return nodes.slice(-placedNodes)
    }

    // Create three rings with different size ranges
    const innerRing = createRing(
      ["analytics", "users", "finance"],
      350,
      12,
      [30, 40], // Size range: 30-40px
      [3, 5], // Icon size range: 3-5 (h-3 to h-5)
      false,
    )
    const middleRing = createRing(
      ["data", "global", "documents"],
      500,
      15,
      [40, 50], // Size range: 25-35px
      [4, 5], // Icon size range: 3-4
      true,
    )
    const outerRing = createRing(
      ["devices", "communication", "navigation"],
      650,
      18,
      [50, 60], // Size range: 20-30px
      [5, 6], // Icon size range: 2-3
      false,
    )

    const connectWithinRing = (ring) => {
      ring.forEach((node, i) => {
        const nextIndex = nodes.indexOf(ring[(i + 1) % ring.length])
        if (!node.connections.includes(nextIndex)) {
          node.connections.push(nextIndex)
        }

        const acrossIndex = nodes.indexOf(ring[(i + Math.floor(ring.length / 2)) % ring.length])
        if (!node.connections.includes(acrossIndex)) {
          node.connections.push(acrossIndex)
        }
      })
    }

    const connectBetweenRings = (innerRing, outerRing) => {
      const step = Math.floor(outerRing.length / innerRing.length)
      innerRing.forEach((innerNode, i) => {
        for (let j = 0; j < 2; j++) {
          const outerIndex = nodes.indexOf(outerRing[(i * step + j) % outerRing.length])
          if (!innerNode.connections.includes(outerIndex)) {
            innerNode.connections.push(outerIndex)
          }
        }
      })
    }

    connectWithinRing(innerRing)
    connectWithinRing(middleRing)
    connectWithinRing(outerRing)
    connectBetweenRings(innerRing, middleRing)
    connectBetweenRings(middleRing, outerRing)

    const addCrossCategoryConnections = (count) => {
      for (let i = 0; i < count; i++) {
        const sourceIndex = Math.floor(Math.random() * nodes.length)
        const targetIndex = Math.floor(Math.random() * nodes.length)

        if (sourceIndex !== targetIndex && !nodes[sourceIndex].connections.includes(targetIndex)) {
          nodes[sourceIndex].connections.push(targetIndex)
        }
      }
    }

    addCrossCategoryConnections(10)

    return nodes
  }

  // Fix Bug 1: Background Icons Not Visible Initially
  // Update the useEffect for canvas initialization to ensure it runs properly on mount
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const nodes = generateOrganizedNetwork()
    networkNodesRef.current = nodes

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawNetwork(ctx, canvas, nodes)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Force immediate draw
    setTimeout(() => {
      drawNetwork(ctx, canvas, nodes)
    }, 0)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  // Force initial render
  useEffect(() => {
    const timeout = setTimeout(() => {
      const nodes = networkNodesRef.current
      if (nodes.length) {
        const canvas = canvasRef.current
        if (canvas) {
          const ctx = canvas.getContext("2d")
          drawNetwork(ctx, canvas, nodes)
        }
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  // Render static network icons
  const renderNetworkIcons = () => {
    if (!networkNodesRef.current.length) return null

    return networkNodesRef.current.map((node, i) => {
      const Icon = node.icon
      return (
        <div
          key={`icon-${i}`}
          className={`absolute flex items-center justify-center rounded-full transition-all duration-300 ${node.filled
            ? "bg-primary/90 text-primary-foreground shadow-md"
            : "bg-background/30 border border-primary/20 text-primary/80 shadow-sm"
            } hover:scale-110 hover:shadow-lg`}
          style={{
            left: "50%",
            top: "50%",
            width: `${node.size}px`,
            height: `${node.size}px`,
            transform: "translate(-50%, -50%)",
            translate: `${node.x}px ${node.y}px`,
            backdropFilter: "blur(4px)",
          }}
        >
          <Icon className={`h-${node.iconSize} w-${node.iconSize}`} />
        </div>
      )
    })
  }

  // Generate background bubbles
  const bubbles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: 2 + Math.random() * 6,
    opacity: 0.05 + Math.random() * 0.1,
    x: (Math.random() - 0.5) * 1500,
    y: (Math.random() - 0.5) * 1500,
  }))

  return (
    <AuthBackground>
      {/* User Icon */}
      <div className="relative z-20 mb-8">
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
          <User className="h-10 w-10 text-primary-foreground" />
        </div>
      </div>

      {/* Login Card */}
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 items-center justify-center relative z-10">
        <Card className="w-full max-w-md mx-auto border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-background/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-end">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"} {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthBackground>
  )
}

