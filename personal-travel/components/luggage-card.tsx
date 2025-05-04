"use client"
import { makeTripCrud } from "@/lib/firestore-crud"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, Plus, Trash, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LuggageCardProps {
  tripId: string
  travelers: number
}

interface LuggageItem {
  id: string
  name: string
  checked: boolean
}

interface Luggage {
  id: string
  name: string
  owner: string
  items: LuggageItem[]
}

export function LuggageCard({ tripId, travelers }: LuggageCardProps) {
  const [luggages, setLuggages] = useState<Luggage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingLuggage, setIsAddingLuggage] = useState(false)
  const [newLuggageName, setNewLuggageName] = useState("")
  const [newLuggageOwner, setNewLuggageOwner] = useState("Io")
  const [selectedLuggage, setSelectedLuggage] = useState<Luggage | null>(null)
  const [newItemName, setNewItemName] = useState("")

  // Genera lista di viaggiatori
  const travelersOptions = ["Io"]
  for (let i = 1; i < travelers; i++) {
    travelersOptions.push(`Viaggiatore ${i + 1}`)
  }

  useEffect(() => {
    const fetchLuggages = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi
        setTimeout(() => {
          const mockLuggages = [
            {
              id: "luggage-1",
              name: "Valigia grande",
              owner: "Io",
              items: [
                { id: "item-1", name: "Magliette", checked: true },
                { id: "item-2", name: "Pantaloni", checked: false },
                { id: "item-3", name: "Scarpe", checked: false },
              ],
            },
          ]
          setLuggages(mockLuggages)
          setIsLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching luggages:", error)
        setIsLoading(false)
      }
    }

    fetchLuggages()
  }, [tripId])

  const handleAddLuggage = () => {
    if (!newLuggageName.trim()) return

    const newLuggage: Luggage = {
      id: `luggage-${Date.now()}`,
      name: newLuggageName,
      owner: newLuggageOwner,
      items: [],
    }

    setLuggages([...luggages, newLuggage])
    setNewLuggageName("")
    setNewLuggageOwner("Io")
    setIsAddingLuggage(false)
  }

  const handleAddItem = () => {
    if (!newItemName.trim() || !selectedLuggage) return

    const newItem: LuggageItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      checked: false,
    }

    const updatedLuggages = luggages.map((luggage) => {
      if (luggage.id === selectedLuggage.id) {
        return {
          ...luggage,
          items: [...luggage.items, newItem],
        }
      }
      return luggage
    })

    setLuggages(updatedLuggages)
    setNewItemName("")
  }

  const handleToggleItem = (luggageId: string, itemId: string) => {
    const updatedLuggages = luggages.map((luggage) => {
      if (luggage.id === luggageId) {
        return {
          ...luggage,
          items: luggage.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, checked: !item.checked }
            }
            return item
          }),
        }
      }
      return luggage
    })

    setLuggages(updatedLuggages)
  }

  const handleDeleteItem = (luggageId: string, itemId: string) => {
    const updatedLuggages = luggages.map((luggage) => {
      if (luggage.id === luggageId) {
        return {
          ...luggage,
          items: luggage.items.filter((item) => item.id !== itemId),
        }
      }
      return luggage
    })

    setLuggages(updatedLuggages)
  }

  const handleDeleteLuggage = (luggageId: string) => {
    setLuggages(luggages.filter((luggage) => luggage.id !== luggageId))
  }

  const { watch, add, del } = makeTripCrud<Luggage>(tripId, "luggage", true)

  return (
    <Card className="border-tree-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-tree-600" />
          Bagagli
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tree-600"></div>
            </div>
          ) : (
            <>
              {luggages.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Nessun bagaglio. Aggiungi il tuo primo bagaglio.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {luggages.map((luggage) => (
                    <div key={luggage.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-tree-600" />
                          <span className="font-medium">{luggage.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{luggage.owner}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleDeleteLuggage(luggage.id)}
                          >
                            <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-1 mt-2">
                        {luggage.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={item.id}
                                checked={item.checked}
                                onCheckedChange={() => handleToggleItem(luggage.id, item.id)}
                              />
                              <label
                                htmlFor={item.id}
                                className={`text-sm ${item.checked ? "line-through text-muted-foreground" : ""}`}
                              >
                                {item.name}
                              </label>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleDeleteItem(luggage.id, item.id)}
                            >
                              <Trash className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Input
                          placeholder="Aggiungi un oggetto..."
                          value={selectedLuggage?.id === luggage.id ? newItemName : ""}
                          onChange={(e) => {
                            setSelectedLuggage(luggage)
                            setNewItemName(e.target.value)
                          }}
                          className="h-8 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddItem()
                            }
                          }}
                        />
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-tree-600 hover:bg-tree-700"
                          onClick={handleAddItem}
                          disabled={!newItemName.trim() || selectedLuggage?.id !== luggage.id}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isAddingLuggage ? (
                <div className="space-y-3 border rounded-md p-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome bagaglio</label>
                    <Input
                      placeholder="Es. Valigia grande"
                      value={newLuggageName}
                      onChange={(e) => setNewLuggageName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Proprietario</label>
                    <Select value={newLuggageOwner} onValueChange={setNewLuggageOwner}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona proprietario" />
                      </SelectTrigger>
                      <SelectContent>
                        {travelersOptions.map((traveler) => (
                          <SelectItem key={traveler} value={traveler}>
                            {traveler}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setIsAddingLuggage(false)}>
                      Annulla
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddLuggage}
                      className="bg-tree-600 hover:bg-tree-700"
                      disabled={!newLuggageName.trim()}
                    >
                      Aggiungi
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddingLuggage(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Aggiungi bagaglio
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
