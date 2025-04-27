"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Plus, Trash, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface SouvenirCardProps {
  tripId: string
}

interface Souvenir {
  id: string
  name: string
  for: string
  price: number
  purchased: boolean
}

export function SouvenirCard({ tripId }: SouvenirCardProps) {
  const [souvenirs, setSouvenirs] = useState<Souvenir[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingSouvenir, setIsAddingSouvenir] = useState(false)
  const [newSouvenir, setNewSouvenir] = useState<Omit<Souvenir, "id">>({
    name: "",
    for: "",
    price: 0,
    purchased: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchSouvenirs = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi e localStorage
        const savedSouvenirs = localStorage.getItem(`souvenirs_${tripId}`)

        if (savedSouvenirs) {
          setSouvenirs(JSON.parse(savedSouvenirs))
        } else {
          // Dati di esempio
          const mockSouvenirs = [
            {
              id: "souv-1",
              name: "Magnete del Colosseo",
              for: "Casa",
              price: 5,
              purchased: false,
            },
            {
              id: "souv-2",
              name: "T-shirt Roma",
              for: "Marco",
              price: 15,
              purchased: false,
            },
            {
              id: "souv-3",
              name: "Bottiglia di vino locale",
              for: "Papà",
              price: 20,
              purchased: true,
            },
          ]
          setSouvenirs(mockSouvenirs)
          localStorage.setItem(`souvenirs_${tripId}`, JSON.stringify(mockSouvenirs))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching souvenirs:", error)
        setIsLoading(false)
      }
    }

    fetchSouvenirs()
  }, [tripId])

  const handleAddSouvenir = () => {
    if (!newSouvenir.name) {
      toast({
        title: "Errore",
        description: "Inserisci almeno il nome del souvenir",
        variant: "destructive",
      })
      return
    }

    const souvenir: Souvenir = {
      id: `souv-${Date.now()}`,
      ...newSouvenir,
    }

    const updatedSouvenirs = [...souvenirs, souvenir]
    setSouvenirs(updatedSouvenirs)
    localStorage.setItem(`souvenirs_${tripId}`, JSON.stringify(updatedSouvenirs))

    setNewSouvenir({
      name: "",
      for: "",
      price: 0,
      purchased: false,
    })
    setIsAddingSouvenir(false)

    toast({
      title: "Souvenir aggiunto",
      description: "Il souvenir è stato aggiunto con successo",
    })
  }

  const handleDeleteSouvenir = (id: string) => {
    const updatedSouvenirs = souvenirs.filter((souvenir) => souvenir.id !== id)
    setSouvenirs(updatedSouvenirs)
    localStorage.setItem(`souvenirs_${tripId}`, JSON.stringify(updatedSouvenirs))

    toast({
      title: "Souvenir eliminato",
      description: "Il souvenir è stato eliminato con successo",
    })
  }

  const handleTogglePurchased = (id: string) => {
    const updatedSouvenirs = souvenirs.map((souvenir) => {
      if (souvenir.id === id) {
        return { ...souvenir, purchased: !souvenir.purchased }
      }
      return souvenir
    })

    setSouvenirs(updatedSouvenirs)
    localStorage.setItem(`souvenirs_${tripId}`, JSON.stringify(updatedSouvenirs))
  }

  const getTotalCost = () => {
    return souvenirs.reduce((total, souvenir) => total + souvenir.price, 0)
  }

  const getPurchasedCount = () => {
    return souvenirs.filter((souvenir) => souvenir.purchased).length
  }

  return (
    <Card className="border-sand-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-sand-600" />
            <span>Souvenir</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={() => setIsAddingSouvenir(!isAddingSouvenir)}
          >
            {isAddingSouvenir ? (
              "Annulla"
            ) : (
              <>
                <Plus className="h-4 w-4" /> Aggiungi souvenir
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sand-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Totale</p>
                  <p className="text-xl font-semibold">{souvenirs.length}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Acquistati</p>
                  <p className="text-xl font-semibold">{getPurchasedCount()}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Costo totale</p>
                  <p className="text-xl font-semibold">€{getTotalCost().toFixed(2)}</p>
                </div>
              </div>

              {isAddingSouvenir && (
                <div className="border rounded-md p-3 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input
                      placeholder="Es. Magnete del Colosseo"
                      value={newSouvenir.name}
                      onChange={(e) => setNewSouvenir({ ...newSouvenir, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Per chi</label>
                    <Input
                      placeholder="Es. Mamma, Amici, Casa"
                      value={newSouvenir.for}
                      onChange={(e) => setNewSouvenir({ ...newSouvenir, for: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prezzo stimato (€)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newSouvenir.price || ""}
                      onChange={(e) => setNewSouvenir({ ...newSouvenir, price: Number(e.target.value) })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddSouvenir}>
                    Aggiungi souvenir
                  </Button>
                </div>
              )}

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {souvenirs.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Nessun souvenir nella lista</p>
                  </div>
                ) : (
                  souvenirs.map((souvenir) => (
                    <div
                      key={souvenir.id}
                      className={`border rounded-md p-3 ${souvenir.purchased ? "bg-muted/30" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTogglePurchased(souvenir.id)}
                            className={`h-5 w-5 rounded-full flex items-center justify-center ${
                              souvenir.purchased
                                ? "bg-green-500 text-white"
                                : "border border-muted-foreground text-transparent"
                            }`}
                          >
                            {souvenir.purchased && <Check className="h-3 w-3" />}
                          </button>
                          <h3
                            className={`font-medium ${souvenir.purchased ? "line-through text-muted-foreground" : ""}`}
                          >
                            {souvenir.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">€{souvenir.price.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteSouvenir(souvenir.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {souvenir.for && <p className="text-xs text-muted-foreground">Per: {souvenir.for}</p>}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
