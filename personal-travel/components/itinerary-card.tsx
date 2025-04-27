"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Plus, Trash, Clock, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ItineraryCardProps {
  tripId: string
  startDate: string
  endDate?: string
}

interface ItineraryDay {
  id: string
  date: string
  title: string
  activities: ItineraryActivity[]
}

interface ItineraryActivity {
  id: string
  time: string
  title: string
  location: string
  notes: string
}

export function ItineraryCard({ tripId, startDate, endDate }: ItineraryCardProps) {
  const [days, setDays] = useState<ItineraryDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingDay, setIsAddingDay] = useState(false)
  const [isAddingActivity, setIsAddingActivity] = useState<string | null>(null)
  const [newDay, setNewDay] = useState<Omit<ItineraryDay, "id" | "activities">>({
    date: "",
    title: "",
  })
  const [newActivity, setNewActivity] = useState<Omit<ItineraryActivity, "id">>({
    time: "",
    title: "",
    location: "",
    notes: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date>()
  const { toast } = useToast()

  useEffect(() => {
    const fetchItinerary = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi e localStorage
        const savedDays = localStorage.getItem(`itinerary_${tripId}`)

        if (savedDays) {
          setDays(JSON.parse(savedDays))
        } else {
          // Crea un giorno di esempio per il primo giorno del viaggio
          const firstDay = new Date(startDate)
          const mockDays = [
            {
              id: `day-${Date.now()}`,
              date: firstDay.toISOString(),
              title: "Giorno 1 - Arrivo",
              activities: [
                {
                  id: `activity-1`,
                  time: "09:00",
                  title: "Check-in in hotel",
                  location: "Hotel Centrale",
                  notes: "Lasciare i bagagli e riposare un po'",
                },
                {
                  id: `activity-2`,
                  time: "12:00",
                  title: "Pranzo",
                  location: "Ristorante vicino all'hotel",
                  notes: "Provare la cucina locale",
                },
                {
                  id: `activity-3`,
                  time: "14:00",
                  title: "Visita al centro storico",
                  location: "Centro città",
                  notes: "Passeggiata per le vie principali",
                },
                {
                  id: `activity-4`,
                  time: "20:00",
                  title: "Cena",
                  location: "Ristorante tipico",
                  notes: "Prenotazione consigliata",
                },
              ],
            },
          ]

          setDays(mockDays)
          localStorage.setItem(`itinerary_${tripId}`, JSON.stringify(mockDays))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        setIsLoading(false)
      }
    }

    fetchItinerary()
  }, [tripId, startDate])

  const handleAddDay = () => {
    if (!selectedDate) {
      toast({
        title: "Errore",
        description: "Seleziona una data",
        variant: "destructive",
      })
      return
    }

    const day: ItineraryDay = {
      id: `day-${Date.now()}`,
      date: selectedDate.toISOString(),
      title: newDay.title || `Giorno ${days.length + 1} - ${format(selectedDate, "dd MMMM", { locale: it })}`,
      activities: [],
    }

    const updatedDays = [...days, day]
    // Ordina i giorni per data
    updatedDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    setDays(updatedDays)
    localStorage.setItem(`itinerary_${tripId}`, JSON.stringify(updatedDays))

    setNewDay({
      date: "",
      title: "",
    })
    setSelectedDate(undefined)
    setIsAddingDay(false)

    toast({
      title: "Giorno aggiunto",
      description: "Il giorno è stato aggiunto con successo",
    })
  }

  const handleAddActivity = (dayId: string) => {
    if (!newActivity.title || !newActivity.time) {
      toast({
        title: "Errore",
        description: "Inserisci almeno titolo e orario",
        variant: "destructive",
      })
      return
    }

    const activity: ItineraryActivity = {
      id: `activity-${Date.now()}`,
      ...newActivity,
    }

    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        // Aggiungi l'attività e ordina per orario
        const updatedActivities = [...day.activities, activity]
        updatedActivities.sort((a, b) => {
          const timeA = a.time.split(":").map(Number)
          const timeB = b.time.split(":").map(Number)
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1])
        })

        return {
          ...day,
          activities: updatedActivities,
        }
      }
      return day
    })

    setDays(updatedDays)
    localStorage.setItem(`itinerary_${tripId}`, JSON.stringify(updatedDays))

    setNewActivity({
      time: "",
      title: "",
      location: "",
      notes: "",
    })
    setIsAddingActivity(null)

    toast({
      title: "Attività aggiunta",
      description: "L'attività è stata aggiunta con successo",
    })
  }

  const handleDeleteDay = (id: string) => {
    const updatedDays = days.filter((day) => day.id !== id)
    setDays(updatedDays)
    localStorage.setItem(`itinerary_${tripId}`, JSON.stringify(updatedDays))

    toast({
      title: "Giorno eliminato",
      description: "Il giorno è stato eliminato con successo",
    })
  }

  const handleDeleteActivity = (dayId: string, activityId: string) => {
    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter((activity) => activity.id !== activityId),
        }
      }
      return day
    })

    setDays(updatedDays)
    localStorage.setItem(`itinerary_${tripId}`, JSON.stringify(updatedDays))

    toast({
      title: "Attività eliminata",
      description: "L'attività è stata eliminata con successo",
    })
  }

  // Calcola le date disponibili per l'itinerario
  const getDateRange = () => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date(startDate)

    // Se non c'è una data di fine, aggiungi 7 giorni alla data di inizio
    if (!endDate) {
      end.setDate(end.getDate() + 7)
    }

    return { start, end }
  }

  const { start, end } = getDateRange()

  return (
    <Card className="border-leaf-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-leaf-600" />
            <span>Itinerario</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => setIsAddingDay(!isAddingDay)}>
            {isAddingDay ? (
              "Annulla"
            ) : (
              <>
                <Plus className="h-4 w-4" /> Aggiungi giorno
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-leaf-600"></div>
            </div>
          ) : (
            <>
              {isAddingDay && (
                <div className="border rounded-md p-3 space-y-3 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: it }) : "Seleziona una data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => date < start || date > end}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titolo (opzionale)</label>
                    <Input
                      placeholder="Es. Visita ai musei"
                      value={newDay.title}
                      onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddDay}>
                    Aggiungi giorno
                  </Button>
                </div>
              )}

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {days.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Nessun giorno nell'itinerario</p>
                  </div>
                ) : (
                  days.map((day) => (
                    <div key={day.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{day.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(day.date), "EEEE d MMMM yyyy", { locale: it })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1"
                            onClick={() => setIsAddingActivity(isAddingActivity === day.id ? null : day.id)}
                          >
                            {isAddingActivity === day.id ? (
                              "Annulla"
                            ) : (
                              <>
                                <Plus className="h-4 w-4" /> Attività
                              </>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteDay(day.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {isAddingActivity === day.id && (
                        <div className="border rounded-md p-3 space-y-3 mb-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Orario</label>
                              <Input
                                type="time"
                                value={newActivity.time}
                                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Titolo</label>
                              <Input
                                placeholder="Es. Visita al museo"
                                value={newActivity.title}
                                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Luogo</label>
                            <Input
                              placeholder="Es. Museo Nazionale"
                              value={newActivity.location}
                              onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Note</label>
                            <Input
                              placeholder="Es. Prenotare i biglietti online"
                              value={newActivity.notes}
                              onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                            />
                          </div>
                          <Button className="w-full" onClick={() => handleAddActivity(day.id)}>
                            Aggiungi attività
                          </Button>
                        </div>
                      )}

                      <div className="space-y-2">
                        {day.activities.length === 0 ? (
                          <div className="text-center py-2 text-muted-foreground text-sm">
                            <p>Nessuna attività pianificata</p>
                          </div>
                        ) : (
                          day.activities.map((activity) => (
                            <div key={activity.id} className="border-l-2 border-leaf-300 pl-3 py-1 relative">
                              <div className="absolute w-2 h-2 bg-leaf-500 rounded-full -left-[5px] top-2"></div>
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-sm font-medium">{activity.time}</span>
                                    <h4 className="font-medium">{activity.title}</h4>
                                  </div>
                                  {activity.location && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                      <MapPin className="h-3 w-3" />
                                      <span>{activity.location}</span>
                                    </div>
                                  )}
                                  {activity.notes && <p className="text-xs mt-1 italic">{activity.notes}</p>}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleDeleteActivity(day.id, activity.id)}
                                >
                                  <Trash className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Esporta itinerario
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
