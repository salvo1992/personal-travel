"use client"

import { useEffect, useState } from "react"
import { Plane } from "lucide-react"

export function LoadingPlane() {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md h-4 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-ocean-600 transition-all duration-300 ease-in-out"
          style={{ width: `${position}%` }}
        />
        <div
          className="absolute top-0 transform -translate-y-full transition-all duration-300 ease-in-out"
          style={{ left: `${position}%` }}
        >
          <Plane className="h-8 w-8 text-ocean-600 rotate-90" />
        </div>
      </div>
      <p className="absolute mt-16 text-sm text-muted-foreground">Preparando il tuo viaggio...</p>
    </div>
  )
}
