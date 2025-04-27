"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Calcola il tempo rimanente iniziale
    setTimeLeft(calculateTimeLeft())

    // Aggiorna il countdown ogni secondo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-leaf-100 text-leaf-800 px-4 py-3 rounded-lg flex flex-col items-center">
      <span className="text-sm">Mancano</span>
      <div className="flex items-center gap-2 my-1">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{timeLeft.days}</span>
          <span className="text-xs">giorni</span>
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</span>
          <span className="text-xs">ore</span>
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</span>
          <span className="text-xs">min</span>
        </div>
        <span className="text-xl font-bold">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</span>
          <span className="text-xs">sec</span>
        </div>
      </div>
      <span className="text-sm">al viaggio</span>
    </div>
  )
}
