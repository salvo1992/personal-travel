"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function CurrentTime() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    // Aggiorna l'ora ogni secondo
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString())
    }

    updateTime() // Imposta l'ora iniziale
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span>{time}</span>
    </div>
  )
}
