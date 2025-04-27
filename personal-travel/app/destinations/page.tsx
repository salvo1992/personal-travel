"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Globe, Search, CalendarIcon, Users, Plus, Settings, Trash } from "lucide-react"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { LoadingPlane } from "@/components/loading-plane"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { useToast } from "@/components/ui/use-toast"
import { searchDestinations } from "@/lib/destinations"
import { getTrips, saveTrip, deleteTrip } from "@/lib/storage"

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [travelers, setTravelers] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [trips, setTrips] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  // Carica i viaggi salvati
  useEffect(() => {
    if (user) {
      const savedTrips = getTrips()
      setTrips(savedTrips)
    }
  }, [user])

  // Gestisce la ricerca delle destinazioni
  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = searchDestinations(searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleSearch = () => {
    if (!searchQuery || !startDate) {
      toast({
        title: "Informazioni mancanti",
        description: "Inserisci una destinazione e una data di partenza",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Trova la destinazione corrispondente
    const destination = searchDestinations(searchQuery)[0]

    if (!destination) {
      toast({
        title: "Destinazione non trovata",
        description: "La destinazione inserita non è disponibile",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Crea un nuovo viaggio
    const newTrip = {
      id: `trip-${Date.now()}`,
      destinationId: destination.id,
      destination: destination.name,
      country: destination.country,
      countryCode: destination.countryCode,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      travelers: travelers,
      imageUrl: destination.imageUrl,
    }

    // Salva il viaggio
    saveTrip(newTrip)

    // Aggiorna la lista dei viaggi
    setTrips([...trips, newTrip])

    // Reset form
    setSearchQuery("")
    setStartDate(undefined)
    setEndDate(undefined)
    setTravelers(1)
    setSearchResults([])

    toast({
      title: "Viaggio aggiunto",
      description: `Il tuo viaggio a ${destination.name} è stato aggiunto con successo`,
    })

    setIsLoading(false)
  }

  const handleDeleteTrip = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    deleteTrip(id)
    setTrips(trips.filter((trip) => trip.id !== id))

    toast({
      title: "Viaggio eliminato",
      description: "Il viaggio è stato eliminato con successo",
    })
  }

  if (!user) {
    return <LoadingPlane />
  }

  return (
    <div className="flex min-h-screen flex-col">
      {isLoading && <LoadingPlane />}

      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-ocean-600" />
            <span className="text-xl font-bold text-gradient">TravelDreams</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Impostazioni</span>
              </Button>
            </Link>
            <UserNav />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-ocean-500 to-leaf-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Scegli la tua prossima meta
              </h1>
              <p className="max-w-[700px] text-white md:text-xl">
                Cerca una destinazione, seleziona le date e inizia a pianificare il tuo viaggio.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Card className="-mt-20 border-ocean-200 shadow-lg">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <label htmlFor="destination" className="text-sm font-medium">
                      Destinazione
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="destination"
                        placeholder="Cerca una destinazione..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />

                      {/* Risultati della ricerca */}
                      {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                          {searchResults.map((result) => (
                            <div
                              key={result.id}
                              className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer"
                              onClick={() => {
                                setSearchQuery(result.name)
                                setSearchResults([])
                              }}
                            >
                              <img
                                src={`https://flagcdn.com/w20/${result.countryCode.toLowerCase()}.png`}
                                width="20"
                                height="15"
                                alt={result.country}
                                className="rounded"
                              />
                              <span>
                                {result.name}, {result.country}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "dd/MM/yyyy") : "Partenza"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground",
                            )}
                            disabled={!startDate}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "dd/MM/yyyy") : "Ritorno"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => date < (startDate || new Date())}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Viaggiatori</label>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      >
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
                          className="h-4 w-4"
                        >
                          <path d="M5 12h14" />
                        </svg>
                        <span className="sr-only">Rimuovi</span>
                      </Button>
                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{travelers}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setTravelers(travelers + 1)}
                      >
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
                          className="h-4 w-4"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        <span className="sr-only">Aggiungi</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button
                      className="w-full bg-ocean-600 hover:bg-ocean-700"
                      onClick={handleSearch}
                      disabled={!searchQuery || !startDate}
                    >
                      Cerca
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">I tuoi viaggi</h2>

              {trips.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-muted/50">
                  <p className="text-muted-foreground mb-4">Non hai ancora pianificato nessun viaggio</p>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => document.getElementById("destination")?.focus()}
                  >
                    <Plus className="h-4 w-4" />
                    Aggiungi il tuo primo viaggio
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {trips.map((trip) => (
                    <Link href={`/dashboard/${trip.id}`} key={trip.id} className="group">
                      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                        <div className="aspect-video bg-ocean-100 relative overflow-hidden">
                          {trip.imageUrl ? (
                            <img
                              src={trip.imageUrl || "/placeholder.svg"}
                              alt={trip.destination}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Globe className="h-12 w-12 text-ocean-300" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={(e) => handleDeleteTrip(trip.id, e)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={`https://flagcdn.com/w20/${trip.countryCode.toLowerCase()}.png`}
                                width="20"
                                height="15"
                                alt={trip.country}
                                className="rounded"
                              />
                              <h3 className="font-bold text-lg">{trip.destination}</h3>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{trip.travelers}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(trip.startDate), "dd MMM yyyy", { locale: it })}
                            {trip.endDate && <> - {format(new Date(trip.endDate), "dd MMM yyyy", { locale: it })}</>}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
