"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const travelTips = [
  "Ricordati di portare un adattatore universale per le prese elettriche.",
  "Fai una copia dei tuoi documenti e salvala online.",
  "Scarica le mappe offline della tua destinazione prima di partire.",
  "Controlla sempre le previsioni meteo prima di uscire.",
  "Porta con te un kit di pronto soccorso con medicinali essenziali.",
  "Impara alcune frasi di base nella lingua locale.",
  "Informa la tua banca che viaggerai all'estero per evitare blocchi della carta.",
  "Usa una VPN quando ti connetti a reti Wi-Fi pubbliche.",
  "Porta sempre con te una bottiglia d'acqua riutilizzabile.",
  "Fai una lista di numeri di emergenza locali.",
]

export function TravelTipsModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTip, setCurrentTip] = useState("")

  useEffect(() => {
    // Mostra un consiglio casuale ogni 20 minuti
    const showRandomTip = () => {
      const randomIndex = Math.floor(Math.random() * travelTips.length)
      setCurrentTip(travelTips[randomIndex])
      setIsOpen(true)
    }

    // Mostra il primo consiglio dopo 1 minuto (per demo)
    const initialTimeout = setTimeout(showRandomTip, 60000)

    // Poi mostra un consiglio ogni 20 minuti
    const interval = setInterval(showRandomTip, 1200000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-ocean-600"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            Consiglio di viaggio
          </DialogTitle>
          <DialogDescription>{currentTip}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
