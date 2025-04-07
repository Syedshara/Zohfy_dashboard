"use client"

import { useState, useEffect, useRef } from "react"
import {
    BarChart3,
    User,
    Heart,
    Key,
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
} from "lucide-react"

const AuthBackground = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const canvasRef = useRef(null)

    // Generate background bubbles
    const bubbles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 6,
        opacity: 0.05 + Math.random() * 0.1,
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1500,
    }))

    // Generate network nodes (icons)
    const generateNetworkNodes = () => {
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

        // Create inner ring
        const createRing = (categoryKeys, radius, count, sizeRange, filled = false) => {
            let placedNodes = 0
            categoryKeys.forEach((category) => {
                const icons = iconCategories[category]
                const iconsToPlace = Math.min(icons.length, Math.ceil(count / categoryKeys.length))

                for (let i = 0; i < iconsToPlace; i++) {
                    if (placedNodes >= count) break

                    const angle = (placedNodes / count) * Math.PI * 2
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    const size = Math.floor(sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]))

                    nodes.push({
                        id: placedNodes,
                        x,
                        y,
                        icon: icons[i % icons.length],
                        size,
                        filled: filled ? Math.random() > 0.7 : false,
                    })

                    placedNodes++
                }
            })

            return nodes.slice(-placedNodes)
        }

        // Create three rings
        createRing(["analytics", "users", "finance"], 350, 12, [30, 40], false)
        createRing(["data", "global", "documents"], 500, 15, [40, 50], true)
        createRing(["devices", "communication", "navigation"], 650, 18, [50, 60], false)

        return nodes
    }

    // Draw network connections on canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Draw connections
        const drawConnections = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const nodes = generateNetworkNodes()
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2

            // Draw some connections between nodes
            for (let i = 0; i < nodes.length; i++) {
                // Connect to next node in same ring
                const nextIdx = (i + 1) % nodes.length

                // Draw line
                const gradient = ctx.createLinearGradient(
                    centerX + nodes[i].x,
                    centerY + nodes[i].y,
                    centerX + nodes[nextIdx].x,
                    centerY + nodes[nextIdx].y,
                )

                gradient.addColorStop(0, "rgba(100, 116, 139, 0.1)")
                gradient.addColorStop(1, "rgba(100, 116, 139, 0.3)")

                ctx.strokeStyle = gradient
                ctx.lineWidth = 0.5
                ctx.beginPath()
                ctx.moveTo(centerX + nodes[i].x, centerY + nodes[i].y)
                ctx.lineTo(centerX + nodes[nextIdx].x, centerY + nodes[nextIdx].y)
                ctx.stroke()

                // Connect to a random node
                if (i % 3 === 0) {
                    const randomIdx = Math.floor(Math.random() * nodes.length)

                    const gradient2 = ctx.createLinearGradient(
                        centerX + nodes[i].x,
                        centerY + nodes[i].y,
                        centerX + nodes[randomIdx].x,
                        centerY + nodes[randomIdx].y,
                    )

                    gradient2.addColorStop(0, "rgba(100, 116, 139, 0.05)")
                    gradient2.addColorStop(1, "rgba(100, 116, 139, 0.2)")

                    ctx.strokeStyle = gradient2
                    ctx.beginPath()
                    ctx.moveTo(centerX + nodes[i].x, centerY + nodes[i].y)
                    ctx.lineTo(centerX + nodes[randomIdx].x, centerY + nodes[randomIdx].y)
                    ctx.stroke()
                }
            }
        }

        // Initial draw
        drawConnections()

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            drawConnections()
        }

        window.addEventListener("resize", handleResize)

        // Set loaded state
        setIsLoaded(true)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    // Render network nodes
    const networkNodes = generateNetworkNodes()

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/5 via-background to-primary/5 p-4 sm:p-8 overflow-hidden relative">
            {/* Logo */}
            <div className="absolute top-8 left-8 flex items-center gap-2 z-10">
                <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold">Business Dashboard</span>
            </div>

            {/* Network canvas for connections */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div className="relative w-full h-full">
                    {/* Static bubbles */}
                    {bubbles.map((bubble) => (
                        <div
                            key={`bubble-${bubble.id}`}
                            className="absolute rounded-full bg-primary/30"
                            style={{
                                left: "50%",
                                top: "50%",
                                width: `${bubble.size}px`,
                                height: `${bubble.size}px`,
                                opacity: bubble.opacity,
                                transform: "translate(-50%, -50%)",
                                translate: `${bubble.x}px ${bubble.y}px`,
                            }}
                        />
                    ))}

                    {/* Network Icons - Rendered directly */}
                    {networkNodes.map((node, i) => {
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
                                <Icon className={`h-${Math.floor(node.size / 10)} w-${Math.floor(node.size / 10)}`} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Content */}
            {children}
        </div>
    )
}

export default AuthBackground

