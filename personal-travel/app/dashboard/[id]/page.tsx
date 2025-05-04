"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import { Globe, Settings } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { UserNav } from "@/components/user-nav"
import { LoadingPlane } from "@/components/loading-plane"
import { CurrentTime } from "@/components/current-time"
import { CountryFlag } from "@/components/country-flag"
import { AnimatedTitle } from "@/components/animated-title"
import { CountdownTimer } from "@/components/countdown-timer"
import { TravelTipsModal } from "@/components/travel-tips-modal"
import { WeatherCard } from "@/components/weather-card"
import { CurrencyConverter } from "@/components/currency-converter"
import { NotesCard } from "@/components/notes-card"
import { LuggageCard } from "@/components/luggage-card"
import { BudgetCard } from "@/components/budget-card"
import { CityCard } from "@/components/city-card"
import { SouvenirCard } from "@/components/souvenir-card"
import { PhrasesCard } from "@/components/phrases-card"
import { DocumentsCard } from "@/components/documents-card"
import { ItineraryCard } from "@/components/itinerary-card"
import { getTrip } from "@/lib/storage"
import { getDestination } from "@/lib/destinations"
import { useToast } from "@/components/ui/use-toast"
import { FlightTicketsCard } from "@/components/flight-tickets-card"
import { AffiliateButton } from "@/components/AffiliateButton"
import { MealsCard } from "@/components/meals-card"
import { StaysCard } from "@/components/stays-card"
import { CitiesCard } from "@/components/cities-card"
import { makeTripCrud } from "@/lib/firestore-crud"

export default function DashboardPage() {
  const params = useParams()
  const { id } = params
  const [trip, setTrip] = useState<any>(null)
  const [destination, setDestination] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  useEffect(() => {
    // Carica i dati del viaggio
    const fetchTrip = async () => {
      setIsLoading(true)

      try {
        // Recupera il viaggio dal localStorage
        const tripData = getTrip(id as string)

        if (!tripData) {
          toast({
            title: "Viaggio non trovato",
            description: "Il viaggio richiesto non è stato trovato",
            variant: "destructive",
          })
          router.push("/destinations")
          return
        }

        setTrip(tripData)

        // Recupera i dettagli della destinazione
        const destinationData = getDestination(tripData.destinationId)
        setDestination(destinationData)

        setIsLoading(false)
      } catch (error) {
        console.error("Errore nel caricamento del viaggio:", error)
        toast({
          title: "Errore",
          description: "Si è verificato un errore nel caricamento del viaggio",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchTrip()
  }, [id, router, toast])

  if (!user || isLoading || !trip) {
    return <LoadingPlane />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-ocean-600" />
            <span className="text-xl font-bold text-gradient">TravelDreams</span>
          </Link>
          <div className="flex items-center gap-4">
            <CurrentTime />
            <CountryFlag countryCode={trip.countryCode} countryName={trip.destination} />
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
        </div>
      </header>

      <main className="flex-1">
        <div className="h-64 bg-ocean-600 relative overflow-hidden">
          {trip.imageUrl ? (
            <img
              src={trip.imageUrl || "/placeholder.svg"}
              alt={trip.destination}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedTitle title={trip.destination} />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={`https://flagcdn.com/w40/${trip.countryCode.toLowerCase()}.png`}
                width="40"
                height="30"
                alt={trip.destination}
                className="rounded"
              />
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">{trip.destination}</h2>
                <p className="text-muted-foreground">
                  {new Date(trip.startDate).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {trip.endDate && (
                    <>
                      {" "}
                      -{" "}
                      {new Date(trip.endDate).toLocaleDateString("it-IT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </>
                  )}
                </p>
              </div>
            </div>
            <CountdownTimer targetDate={new Date(trip.startDate)} />
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="bagagli">Bagagli</TabsTrigger>
              <TabsTrigger value="biglietti">Biglietti</TabsTrigger>
              <TabsTrigger value="mangia">Si mangia</TabsTrigger>
              <TabsTrigger value="hotel">Hotel</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="city">City</TabsTrigger>
              <TabsTrigger value="souvenir">Souvenir</TabsTrigger>
              <TabsTrigger value="curiosita">Curiosità</TabsTrigger>
              <TabsTrigger value="documenti">Documenti</TabsTrigger>
              <TabsTrigger value="itinerario">Itinerario</TabsTrigger>
              <TabsTrigger value="frasi">Frasi utili</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card Fuso Orario e Meteo */}
                <WeatherCard city={trip.destination} countryCode={trip.countryCode} />

                {/* Card Conversione Valuta */}
                <CurrencyConverter countryCode={trip.countryCode} />

                {/* Card Note */}
                <NotesCard tripId={trip.id.toString()} />

                {/* Card Bagagli */}
                <LuggageCard tripId={trip.id.toString()} travelers={trip.travelers} />

                {/* Card Curiosità */}
                <Card className="border-sky-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
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
                        className="h-5 w-5 text-sky-600"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Curiosità
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {destination && destination.facts ? (
                        destination.facts.slice(0, 4).map((fact: string, index: number) => <p key={index}>• {fact}</p>)
                      ) : (
                        <>
                          <p>• Il Colosseo poteva ospitare fino a 80.000 spettatori.</p>
                          <p>• La Fontana di Trevi raccoglie circa 3.000 euro al giorno in monete.</p>
                          <p>• Roma ha più di 900 chiese.</p>
                          <p>• Il Pantheon ha il più grande cupola in cemento non rinforzato del mondo.</p>
                        </>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Scopri di più
                    </Button>
                  </CardContent>
                </Card>

                {/* Card Documenti */}
                <DocumentsCard tripId={trip.id.toString()} countryCode={trip.countryCode} />
              </div>
            </TabsContent>

            <TabsContent value="bagagli">
              <Card>
                <CardHeader>
                  <CardTitle>Bagagli</CardTitle>
                </CardHeader>
                <CardContent>
                  <LuggageCard tripId={trip.id.toString()} travelers={trip.travelers} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="biglietti">
            <FlightTicketsCard tripId={trip.id} />
          
            </TabsContent>

            <TabsContent value="mangia">
              <Card>
                
                 
                <MealsCard tripId={trip.id} />
                
              </Card>
             </TabsContent>

            <TabsContent value="hotel">
              <Card>
             
               
                
              <StaysCard tripId={trip.id} />
                
              </Card>
            </TabsContent>

            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Budget e Spese</CardTitle>
                </CardHeader>
                <CardContent>
                  <BudgetCard tripId={trip.id.toString()} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="city">
  <CitiesCard tripId={trip.id.toString()} />
</TabsContent>

            <TabsContent value="souvenir">
              <Card>
                <CardHeader>
                  <CardTitle>Souvenir</CardTitle>
                </CardHeader>
                <CardContent>
                  <SouvenirCard tripId={trip.id.toString()} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curiosita">
              <Card>
                <CardHeader>
                  <CardTitle>Curiosità</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {destination && destination.facts ? (
                      destination.facts.map((fact: string, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <p>• {fact}</p>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="border rounded-lg p-4">
                          <p>• Il Colosseo poteva ospitare fino a 80.000 spettatori.</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p>• La Fontana di Trevi raccoglie circa 3.000 euro al giorno in monete.</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p>• Roma ha più di 900 chiese.</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p>• Il Pantheon ha il più grande cupola in cemento non rinforzato del mondo.</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <p>• La Città del Vaticano è il paese più piccolo del mondo.</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documenti">
              <Card>
                <CardHeader>
                  <CardTitle>Documenti</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentsCard tripId={trip.id.toString()} countryCode={trip.countryCode} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itinerario">
              <Card>
                <CardHeader>
                  <CardTitle>Itinerario</CardTitle>
                </CardHeader>
                <CardContent>
                  <ItineraryCard tripId={trip.id.toString()} startDate={trip.startDate} endDate={trip.endDate} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="frasi">
              <Card>
                <CardHeader>
                  <CardTitle>Frasi utili</CardTitle>
                </CardHeader>
                <CardContent>
                  <PhrasesCard
                    tripId={trip.id.toString()}
                    countryCode={trip.countryCode}
                    destination={trip.destination}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <TravelTipsModal />
    </div>
  )
}
