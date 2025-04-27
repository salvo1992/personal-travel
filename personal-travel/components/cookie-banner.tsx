"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted")
    if (!cookiesAccepted) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-4xl shadow-lg border-ocean-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Cookie Policy</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm md:text-base">
            Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. I cookie sono piccoli file di testo
            che vengono memorizzati sul tuo dispositivo quando visiti il nostro sito. Ci aiutano a ricordare le tue
            preferenze, a personalizzare i contenuti e a analizzare il traffico.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            Rifiuta
          </Button>
          <Button onClick={acceptCookies} className="bg-ocean-600 hover:bg-ocean-700">
            Accetta tutti
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
