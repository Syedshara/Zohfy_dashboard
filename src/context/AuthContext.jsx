"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

// Create the auth context
const AuthContext = createContext(null)

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [tokenExpiry, setTokenExpiry] = useState(null)
    const navigate = useNavigate()

    // Check if token is expired
    const isTokenExpired = useCallback(() => {
        if (!tokenExpiry) return true
        return Date.now() >= tokenExpiry
    }, [tokenExpiry])

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true)

            const storedAccessToken = localStorage.getItem("access_token")
            const storedRefreshToken = localStorage.getItem("refresh_token")
            const storedUser = localStorage.getItem("user")
            const storedExpiry = localStorage.getItem("token_expiry")

            if (storedAccessToken && storedRefreshToken) {
                setAccessToken(storedAccessToken)
                setRefreshToken(storedRefreshToken)
                setTokenExpiry(Number(storedExpiry))

                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                    setIsAuthenticated(true)
                } else {
                    try {
                        await fetchUserData(storedAccessToken)
                    } catch (error) {
                        if (isTokenExpired()) {
                            try {
                                await refreshAccessToken(storedRefreshToken)
                            } catch (refreshError) {
                                logout()
                            }
                        } else {
                            logout()
                        }
                    }
                }
            }

            setIsLoading(false)
        }

        initializeAuth()
    }, [isTokenExpired])

    // Fetch user data from the /user endpoint
    const fetchUserData = async (token) => {
        try {
            const response = await fetch("https://zohfy.xyz/trustauth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token || accessToken}`,
                },
            })

            if (!response.ok) {
                throw new Error("Failed to fetch user data")
            }

            const userData = await response.json()
            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
            setIsAuthenticated(true)
            return userData
        } catch (error) {
            console.error("Error fetching user data:", error)
            throw error
        }
    }

    // Login function
    const login = async (email, password) => {
        setIsLoading(true)

        try {
            const response = await fetch("https://zohfy.xyz/trustauth/token?grant_type=password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    grant_type: "password",
                }),
            })

            if (!response.ok) {
                throw new Error("Invalid credentials")
            }

            const data = await response.json()
            const expiryTime = Date.now() + (data.expires_in * 1000)

            // Store tokens and expiry
            setAccessToken(data.access_token)
            setRefreshToken(data.refresh_token)
            setTokenExpiry(expiryTime)
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            localStorage.setItem("token_expiry", expiryTime.toString())
            localStorage.setItem("isAuthenticated", "true")

            await fetchUserData(data.access_token)
            setIsLoading(false)
            return data
        } catch (error) {
            setIsLoading(false)
            console.error("Login error:", error)
            throw error
        }
    }

    // Signup function
    const signup = async (email, password, userData = {}) => {
        setIsLoading(true)

        try {
            const response = await fetch("https://zohfy.xyz/trustauth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    data: userData,
                }),
            })

            if (!response.ok) {
                throw new Error("Signup failed")
            }

            const data = await response.json()

            if (data.user?.email_confirmed_at) {
                const expiryTime = Date.now() + (data.expires_in * 1000)
                setAccessToken(data.access_token)
                setRefreshToken(data.refresh_token)
                setTokenExpiry(expiryTime)
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("refresh_token", data.refresh_token)
                localStorage.setItem("token_expiry", expiryTime.toString())
                localStorage.setItem("isAuthenticated", "true")

                await fetchUserData()
                setIsAuthenticated(true)
            }

            setIsLoading(false)
            return data
        } catch (error) {
            setIsLoading(false)
            console.error("Signup error:", error)
            throw error
        }
    }

    // Refresh token function
    const refreshAccessToken = async (token = null) => {
        try {
            const tokenToUse = token || refreshToken

            if (!tokenToUse) {
                throw new Error("No refresh token available")
            }

            const response = await fetch("https://zohfy.xyz/trustauth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh_token: tokenToUse,
                    grant_type: "refresh_token",
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to refresh token")
            }

            const data = await response.json()
            const expiryTime = Date.now() + (data.expires_in * 1000)

            // Update tokens and expiry
            setAccessToken(data.access_token)
            setRefreshToken(data.refresh_token)
            setTokenExpiry(expiryTime)
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            localStorage.setItem("token_expiry", expiryTime.toString())

            return data
        } catch (error) {
            console.error("Token refresh error:", error)
            logout()
            throw error
        }
    }

    // Logout function
    const logout = async () => {
        if (accessToken) {
            try {
                await fetch("https://zohfy.xyz/trustauth/logout", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            } catch (error) {
                console.error("Logout error:", error)
            }
        }

        // Clear all auth state
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setTokenExpiry(null)
        setIsAuthenticated(false)

        // Clear localStorage
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("token_expiry")

        // Redirect to login
        navigate("/login")
    }

    // Enhanced authFetch with automatic token refresh
    const authFetch = async (url, options = {}) => {
        // Check if token is expired or about to expire (within 1 minute)
        if (isTokenExpired() || (tokenExpiry && Date.now() >= tokenExpiry - 60000)) {
            try {
                await refreshAccessToken()
            } catch (error) {
                logout()
                throw new Error("Session expired. Please login again.")
            }
        }

        if (!accessToken) {
            throw new Error("No access token available")
        }

        // Add authorization header
        const authOptions = {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
        }

        const response = await fetch(url, authOptions)

        // If unauthorized, try to refresh the token once
        if (response.status === 401) {
            try {
                const refreshData = await refreshAccessToken()

                // Retry the request with the new token
                const retryOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${refreshData.access_token}`,
                    },
                }

                return fetch(url, retryOptions)
            } catch (error) {
                logout()
                throw new Error("Session expired. Please login again.")
            }
        }

        return response
    }

    // Password reset function
    const resetPassword = async (email) => {
        try {
            const response = await fetch("https://zohfy.xyz/trustauth/recover", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) {
                throw new Error("Password reset failed")
            }

            return await response.json()
        } catch (error) {
            console.error("Password reset error:", error)
            throw error
        }
    }

    // Context value
    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        refreshToken: refreshAccessToken,
        fetchUserData,
        resetPassword,
        authFetch,
        accessToken,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}