"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Plus, Star, Trash, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CityCardProps {
  tripId: string
  destination: string
}

interface Place {
  id: string
  name: string
  type: string
  address: string
  rating: number
  notes: string
  visited: boolean
}

const placeTypes = [
  { value: "attraction", label: "Attrazioni" },
  { value: "museum", label: "Musei" },
  { value: "restaurant", label: "Ristoranti" },
  { value: "shopping", label: "Shopping" },
  { value: "nightlife", label: "Vita notturna" },
]

export function CityCard({ tripId, destination }: CityCardProps) {
  const [places, setPlaces] = useState<Place[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingPlace, setIsAddingPlace] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [newPlace, setNewPlace] = useState<Omit<Place, "id">>({
    name: "",
    type: "attraction",
    address: "",
    rating: 0,
    notes: "",
    visited: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi e localStorage
        const savedPlaces = localStorage.getItem(`places_${tripId}`)

        if (savedPlaces) {
          setPlaces(JSON.parse(savedPlaces))
        } else {
          // Dati di esempio basati sulla destinazione
          let mockPlaces: Place[] = []

          if (destination.toLowerCase().includes("roma")) {
            mockPlaces = [
              {
                id: "place-1",
                name: "Colosseo",
                type: "attraction",
                address: "Piazza del Colosseo, 1",
                rating: 5,
                notes: "Monumento iconico, comprare i biglietti in anticipo",
                visited: false,
              },
              {
                id: "place-2",
                name: "Musei Vaticani",
                type: "museum",
                address: "Viale Vaticano",
                rating: 5,
                notes: "Prenotare online per evitare code",
                visited: false,
              },
              {
                id: "place-3",
                name: "Trattoria Da Luigi",
                type: "restaurant",
                address: "Via del Corso, 123",
                rating: 4,
                notes: "Ottima carbonara",
                visited: false,
              },
            ]
          } else {
            mockPlaces = [
              {
                id: "place-1",
                name: "Attrazione principale",
                type: "attraction",
                address: "Centro città",
                rating: 5,
                notes: "Da non perdere",
                visited: false,
              },
              {
                id: "place-2",
                name: "Museo Nazionale",
                type: "museum",
                address: "Via Centrale, 1",
                rating: 4,
                notes: "Interessante collezione",
                visited: false,
              },
            ]
          }

          setPlaces(mockPlaces)
          localStorage.setItem(`places_${tripId}`, JSON.stringify(mockPlaces))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching places:", error)
        setIsLoading(false)
      }
    }

    fetchPlaces()
  }, [tripId, destination])

  const handleAddPlace = () => {
    if (!newPlace.name) {
      toast({
        title: "Errore",
        description: "Inserisci almeno il nome del luogo",
        variant: "destructive",
      })
      return
    }

    const place: Place = {
      id: `place-${Date.now()}`,
      ...newPlace,
    }

    const updatedPlaces = [...places, place]
    setPlaces(updatedPlaces)
    localStorage.setItem(`places_${tripId}`, JSON.stringify(updatedPlaces))

    setNewPlace({
      name: "",
      type: "attraction",
      address: "",
      rating: 0,
      notes: "",
      visited: false,
    })
    setIsAddingPlace(false)

    toast({
      title: "Luogo aggiunto",
      description: "Il luogo è stato aggiunto con successo",
    })
  }

  const handleDeletePlace = (id: string) => {
    const updatedPlaces = places.filter((place) => place.id !== id)
    setPlaces(updatedPlaces)
    localStorage.setItem(`places_${tripId}`, JSON.stringify(updatedPlaces))

    toast({
      title: "Luogo eliminato",
      description: "Il luogo è stato eliminato con successo",
    })
  }

  const handleToggleVisited = (id: string) => {
    const updatedPlaces = places.map((place) => {
      if (place.id === id) {
        return { ...place, visited: !place.visited }
      }
      return place
    })

    setPlaces(updatedPlaces)
    localStorage.setItem(`places_${tripId}`, JSON.stringify(updatedPlaces))
  }

  const filteredPlaces =
    activeTab === "all"
      ? places
      : activeTab === "visited"
        ? places.filter((place) => place.visited)
        : places.filter((place) => place.type === activeTab)

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      ))
  }

  return (
    <Card className="border-ocean-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-ocean-600" />
            <span>Luoghi da visitare</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => setIsAddingPlace(!isAddingPlace)}>
            {isAddingPlace ? (
              "Annulla"
            ) : (
              <>
                <Plus className="h-4 w-4" /> Aggiungi luogo
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
            </div>
          ) : (
            <>
              {isAddingPlace && (
                <div className="border rounded-md p-3 space-y-3 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input
                      placeholder="Es. Colosseo"
                      value={newPlace.name}
                      onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo</label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newPlace.type}
                      onChange={(e) => setNewPlace({ ...newPlace, type: e.target.value })}
                    >
                      {placeTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Indirizzo</label>
                    <Input
                      placeholder="Es. Via del Colosseo, 1"
                      value={newPlace.address}
                      onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Valutazione</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setNewPlace({ ...newPlace, rating })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              rating <= newPlace.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Note</label>
                    <Input
                      placeholder="Es. Comprare i biglietti in anticipo"
                      value={newPlace.notes}
                      onChange={(e) => setNewPlace({ ...newPlace, notes: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddPlace}>
                    Aggiungi luogo
                  </Button>
                </div>
              )}

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 mb-4">
                  <TabsTrigger value="all">Tutti</TabsTrigger>
                  <TabsTrigger value="attraction">Attrazioni</TabsTrigger>
                  <TabsTrigger value="museum">Musei</TabsTrigger>
                  <TabsTrigger value="restaurant">Ristoranti</TabsTrigger>
                  <TabsTrigger value="shopping">Shopping</TabsTrigger>
                  <TabsTrigger value="visited">Visitati</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {filteredPlaces.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>Nessun luogo in questa categoria</p>
                      </div>
                    ) : (
                      filteredPlaces.map((place) => (
                        <div key={place.id} className={`border rounded-md p-3 ${place.visited ? "bg-muted/30" : ""}`}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={place.visited}
                                onChange={() => handleToggleVisited(place.id)}
                                className="rounded"
                              />
                              <h3
                                className={`font-medium ${place.visited ? "line-through text-muted-foreground" : ""}`}
                              >
                                {place.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeletePlace(place.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground"
                                onClick={() =>
                                  window.open(
                                    `https://maps.google.com/?q=${encodeURIComponent(place.address)}`,
                                    "_blank",
                                  )
                                }
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                            <span>{placeTypes.find((t) => t.value === place.type)?.label || "Altro"}</span>
                            <span>•</span>
                            <div className="flex items-center">{renderRatingStars(place.rating)}</div>
                          </div>
                          <p className="text-xs text-muted-foreground">{place.address}</p>
                          {place.notes && <p className="text-xs mt-1 italic">{place.notes}</p>}
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <MapPin className="h-4 w-4" />
                  Visualizza mappa
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
