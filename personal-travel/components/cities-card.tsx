"use client"
import { useEffect, useMemo, useState, FormEvent } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash } from "lucide-react"
import { makeUserTripCrud } from "@/lib/firestore-crud"
import { CityCard } from "@/components/city-card"
import { useToast } from "@/components/ui/use-toast"

interface TripCity {
  id?: string
  name: string
}

export function CitiesCard({ tripId }: { tripId: string }) {
  const api = useMemo(() => makeUserTripCrud<TripCity>(tripId, "cities"), [tripId])
  const [cities, setCities] = useState<TripCity[]>([])
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // realtime listener
  useEffect(() => api.watch(setCities), [api])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = (fd.get("name") as string).trim()
    if (!name) return
    await api.add({ name })
    toast({ title: "Città aggiunta" })
    e.currentTarget.reset()
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Città e luoghi da visitare</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* elenco città già inserite */}
        {cities.map((c) => (
          <div key={c.id} className="space-y-4">
            {/* city header + delete */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <Button
                size="icon"
                variant="outline"
                onClick={() => api.del(c.id!)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            {/* CityCard ricicla il componente esistente */}
            <CityCard tripId={tripId} destination={c.name} />
          </div>
        ))}

        {/* form toggle */}
        {open ? (
          <form onSubmit={onSubmit} className="flex gap-2">
            <Input name="name" placeholder="Aggiungi nuova città" className="flex-1" required />
            <Button type="submit">Salva</Button>
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Annulla
            </Button>
          </form>
        ) : (
          <Button className="w-full" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Aggiungi città
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
