"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey)
    return storedTheme || defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    // Apply the stored color settings if available
    const savedSettings = localStorage.getItem("theme-color-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)

      // Convert hex to HSL for CSS variables
      const hexToHSL = (hex) => {
        // Remove the # if present
        hex = hex.replace(/^#/, "")

        // Parse the hex values
        const r = Number.parseInt(hex.substring(0, 2), 16) / 255
        const g = Number.parseInt(hex.substring(2, 4), 16) / 255
        const b = Number.parseInt(hex.substring(4, 6), 16) / 255

        // Find the min and max values to calculate saturation
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h,
          s,
          l = (max + min) / 2

        if (max === min) {
          h = s = 0 // achromatic
        } else {
          const d = max - min
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0)
              break
            case g:
              h = (b - r) / d + 2
              break
            case b:
              h = (r - g) / d + 4
              break
            default:
              break
          }

          h /= 6
        }

        // Convert to degrees and percentages
        h = Math.round(h * 360)
        s = Math.round(s * 100)
        l = Math.round(l * 100)

        return { h, s, l }
      }

      const hsl = hexToHSL(settings.baseColor)

      // Apply intensity (saturation) adjustment
      const adjustedS = Math.min(Math.max(hsl.s * (settings.intensity / 100), 0), 100)

      // Apply contrast adjustment (affects lightness)
      const contrastFactor = (settings.contrast - 50) / 100
      const adjustedL = Math.min(Math.max(hsl.l + contrastFactor * 20, 10), 90)

      const hslString = `${hsl.h} ${adjustedS}% ${adjustedL}%`

      // Update CSS variables for the theme
      const root = document.documentElement

      // Primary color and its variants
      root.style.setProperty("--primary", hslString)

      // If using gradient, set up gradient background
      if (settings.useGradient) {
        const gradientHsl = hexToHSL(settings.gradientColor)
        const adjustedGradientS = Math.min(Math.max(gradientHsl.s * (settings.intensity / 100), 0), 100)
        const adjustedGradientL = Math.min(Math.max(gradientHsl.l + contrastFactor * 20, 10), 90)
        const gradientHslString = `${gradientHsl.h} ${adjustedGradientS}% ${adjustedGradientL}%`

        // Set gradient for elements that support it
        root.style.setProperty(
          "--primary-gradient",
          `linear-gradient(${settings.gradientDirection}, hsl(${hslString}), hsl(${gradientHslString}))`,
        )

        // Add a CSS class to enable gradient usage
        document.body.classList.add("use-gradient-theme")
      } else {
        // Remove gradient if not using it
        root.style.setProperty("--primary-gradient", "none")
        document.body.classList.remove("use-gradient-theme")
      }

      // Set blend mode
      root.style.setProperty("--color-blend-mode", settings.blendMode)

      // Update accent color based on primary (slightly lighter)
      const accentL = Math.min(adjustedL + 45, 96)
      root.style.setProperty("--accent", `${hsl.h} ${adjustedS * 0.8}% ${accentL}%`)

      // Update accent-foreground to be the primary color but with adjusted contrast for better readability
      root.style.setProperty("--accent-foreground", `${hsl.h} ${adjustedS}% ${adjustedL < 50 ? 90 : 20}%`)

      // Update ring color to match primary but slightly more saturated for focus states
      root.style.setProperty("--ring", `${hsl.h} ${Math.min(adjustedS + 10, 100)}% ${adjustedL}%`)

      // Update sidebar colors with adjusted intensity
      root.style.setProperty("--sidebar-primary", hslString)
      root.style.setProperty("--sidebar-accent", `${hsl.h} ${adjustedS}% ${Math.max(adjustedL - 5, 10)}%`)

      // Update chart colors with complementary hues but consistent saturation/lightness
      root.style.setProperty("--chart-1", hslString)
      root.style.setProperty("--chart-2", `${(hsl.h + 60) % 360} ${adjustedS}% ${adjustedL}%`)
      root.style.setProperty("--chart-3", `${(hsl.h + 120) % 360} ${adjustedS}% ${adjustedL}%`)
      root.style.setProperty("--chart-4", `${(hsl.h + 180) % 360} ${adjustedS}% ${adjustedL}%`)
      root.style.setProperty("--chart-5", `${(hsl.h + 240) % 360} ${adjustedS}% ${adjustedL}%`)

      // Add CSS custom properties for text on colored backgrounds
      const textColor = adjustedL < 60 ? "255, 255, 255" : "0, 0, 0"
      root.style.setProperty("--on-primary-text", textColor)
    }
  }, [])

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
