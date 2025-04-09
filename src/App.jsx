"use client"

import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"
import { AuthProvider, useAuth } from "./context/AuthContext"
import DashboardLayout from "./components/DashboardLayout/DashboardLayout"
import Dashboard from "./pages/Dashboard/Dashboard"
import Orders from "./pages/Orders/Orders"
import Customers from "./pages/Customers/Customers"
import Flow from "./pages/Flow/Flow"
import Analytics from "./pages/Analytics/Analytics"
import Account from "./pages/Account/Account"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import FacebookLogin from "./pages/FacebookLogin/FacebookLogin"

// Protected route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Orders />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Customers />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/flow"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Flow />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Account />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      {/* New Facebook Login Route */}
      <Route
        path="/facebook-login"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <FacebookLogin />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      {/* Redirect any unknown routes to dashboard if authenticated, otherwise to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking auth status
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
