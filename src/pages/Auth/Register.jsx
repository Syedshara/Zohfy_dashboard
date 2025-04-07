"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, ArrowRight, User, Building } from "lucide-react"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/Card/Card"
import AuthBackground from "../../components/Auth/AuthBackground"
import { useAuth } from "../../context/AuthContext"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    tenant: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    try {
      if (!formData.email || !formData.password || !formData.role || !formData.tenant) {
        throw new Error("All fields are required")
      }

      const userData = {
        role: formData.role,
        tenant: formData.tenant,
      }

      const response = await signup(formData.email, formData.password, userData)

      // Handle successful registration
      if (response.user?.email_confirmed_at) {
        // If email is already confirmed, log the user in
        navigate("/")
      } else {
        // If email confirmation is required
        setSuccessMessage("Check your email to verify your account.")
        // Optionally, you could redirect to a page explaining next steps
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthBackground>
      {/* User Icon */}
      <div className="relative z-20 mb-8">
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
          <User className="h-10 w-10 text-primary-foreground" />
        </div>
      </div>

      {/* Register Card */}
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 items-center justify-center relative z-10">
        <Card className="w-full max-w-md mx-auto border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-background/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to get started</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}
              {successMessage && (
                <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-sm p-3 rounded-md">
                  {successMessage}
                </div>
              )}

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
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
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="role"
                    placeholder="Role"
                    className="pl-10"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    name="tenant"
                    placeholder="Tenant"
                    className="pl-10"
                    value={formData.tenant}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}{" "}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AuthBackground>
  )
}

