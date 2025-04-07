"use client"

import { createContext, useContext, useState, useEffect } from "react"
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
    const navigate = useNavigate()

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true)

            // Check if we have tokens in localStorage
            const storedAccessToken = localStorage.getItem("access_token")
            const storedRefreshToken = localStorage.getItem("refresh_token")
            const storedUser = localStorage.getItem("user")

            if (storedAccessToken && storedRefreshToken) {
                setAccessToken(storedAccessToken)
                setRefreshToken(storedRefreshToken)

                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                    setIsAuthenticated(true)
                } else {
                    // If we have tokens but no user data, fetch user data
                    try {
                        await fetchUserData(storedAccessToken)
                    } catch (error) {
                        // If token is invalid, try to refresh it
                        try {
                            await refreshAccessToken(storedRefreshToken)
                        } catch (refreshError) {
                            // If refresh fails, clear auth state
                            logout()
                        }
                    }
                }
            }

            setIsLoading(false)
        }

        initializeAuth()
    }, [])

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

    // Login function - calls the /token endpoint with password grant
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

            // Store tokens
            setAccessToken(data.access_token)
            setRefreshToken(data.refresh_token)
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            localStorage.setItem("isAuthenticated", "true")

            // If user data is included in the response, store it
            if (data.user) {
                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
                setIsAuthenticated(true)
            } else {
                // Otherwise fetch user data
                await fetchUserData(data.access_token)
            }

            setIsLoading(false)
            return data
        } catch (error) {
            setIsLoading(false)
            console.error("Login error:", error)
            throw error
        }
    }

    // Signup function - calls the /signup endpoint
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

            // If email is already confirmed, log the user in
            if (data.user?.email_confirmed_at) {
                setAccessToken(data.access_token)
                setRefreshToken(data.refresh_token)
                localStorage.setItem("access_token", data.access_token)
                localStorage.setItem("refresh_token", data.refresh_token)
                localStorage.setItem("isAuthenticated", "true")

                setUser(data.user)
                localStorage.setItem("user", JSON.stringify(data.user))
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

    // Refresh token function - calls the /token endpoint with refresh_token grant
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

            // Update tokens
            setAccessToken(data.access_token)
            setRefreshToken(data.refresh_token)
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)

            return data
        } catch (error) {
            console.error("Token refresh error:", error)
            // If refresh fails, log the user out
            logout()
            throw error
        }
    }

    // Logout function - calls the /logout endpoint and clears auth state
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
                // Continue with local logout even if API call fails
            }
        }

        // Clear auth state
        setUser(null)
        setAccessToken(null)
        setRefreshToken(null)
        setIsAuthenticated(false)

        // Clear localStorage
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
        localStorage.removeItem("isAuthenticated")

        // Redirect to login
        navigate("/login")
    }

    // Create an interceptor for API calls to handle token refresh
    const authFetch = async (url, options = {}) => {
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

        try {
            const response = await fetch(url, authOptions)

            // If unauthorized, try to refresh the token
            if (response.status === 401) {
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
            }

            return response
        } catch (error) {
            console.error("API request error:", error)
            throw error
        }
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
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

