"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Wind } from "lucide-react"

interface WeatherCardProps {
  city: string
  countryCode: string
}

export function WeatherCard({ city, countryCode }: WeatherCardProps) {
  const [weather, setWeather] = useState({
    temperature: 24,
    condition: "Soleggiato",
    icon: "sun",
    localTime: "14:30",
    timeZone: "GMT+1",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula il caricamento dei dati meteo
    // In un'implementazione reale, qui ci sarebbe una chiamata API
    const fetchWeather = async () => {
      setIsLoading(true)

      // Simula una chiamata API
      setTimeout(() => {
        // Dati meteo casuali per demo
        const conditions = ["Soleggiato", "Nuvoloso", "Pioggia", "Temporale", "Neve", "Ventoso"]
        const icons = ["sun", "cloud", "cloud-rain", "cloud-lightning", "cloud-snow", "wind"]
        const randomIndex = Math.floor(Math.random() * conditions.length)

        // Temperatura casuale tra 5 e 35 gradi
        const randomTemp = Math.floor(Math.random() * 30) + 5

        // Ora locale casuale
        const hours = Math.floor(Math.random() * 24)
        const minutes = Math.floor(Math.random() * 60)
        const localTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

        // Fuso orario casuale
        const timeZones = ["GMT-5", "GMT-4", "GMT-3", "GMT+0", "GMT+1", "GMT+2", "GMT+3", "GMT+8", "GMT+9"]
        const randomTimeZone = timeZones[Math.floor(Math.random() * timeZones.length)]

        setWeather({
          temperature: randomTemp,
          condition: conditions[randomIndex],
          icon: icons[randomIndex],
          localTime,
          timeZone: randomTimeZone,
        })

        setIsLoading(false)
      }, 1000)
    }

    fetchWeather()
  }, [city, countryCode])

  const renderWeatherIcon = () => {
    switch (weather.icon) {
      case "sun":
        return <Sun className="h-8 w-8 text-sun-500" />
      case "cloud":
        return <Cloud className="h-8 w-8 text-sky-400" />
      case "cloud-rain":
        return <CloudRain className="h-8 w-8 text-sky-600" />
      case "cloud-lightning":
        return <CloudLightning className="h-8 w-8 text-sky-700" />
      case "cloud-snow":
        return <CloudSnow className="h-8 w-8 text-sky-300" />
      case "wind":
        return <Wind className="h-8 w-8 text-sky-500" />
      default:
        return <Sun className="h-8 w-8 text-sun-500" />
    }
  }

  return (
    <Card className="border-ocean-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-ocean-600" />
          Fuso Orario e Meteo
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Ora locale</p>
              <p className="text-2xl font-semibold">{weather.localTime}</p>
              <p className="text-xs text-muted-foreground">{weather.timeZone}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Meteo</p>
              <div className="flex items-center justify-end gap-2">
                {renderWeatherIcon()}
                <span className="text-2xl font-semibold">{weather.temperature}°C</span>
              </div>
              <p className="text-xs text-muted-foreground">{weather.condition}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
