"use client"
import { useState, useEffect, FormEvent, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash, Plus } from "lucide-react"
import { makeTripCrud } from "@/lib/firestore-crud"
import { useToast } from "@/components/ui/use-toast"
import { AffiliateButton } from "@/components/AffiliateButton"

export interface Meal {
  id?: string
  name: string
  price: number
  address: string
  date: string   // ISO
}

export function MealsCard({ tripId }: { tripId: string }) {
  const api = useMemo(() => makeTripCrud<Meal>(tripId, "meals"), [tripId])
  const [meals, setMeals] = useState<Meal[]>([])
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => api.watch(setMeals), [api])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    await api.add({
      name: fd.get("name") as string,
      price: Number(fd.get("price")),
      address: fd.get("address") as string,
      date: fd.get("date") as string,
    })
    toast({ title: "Ristorante aggiunto" })
    e.currentTarget.reset()
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader><CardTitle>Si mangia</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {meals.map((m) => (
          <div key={m.id} className="border rounded-lg p-4 grid md:grid-cols-4 gap-4">
            <div><p className="text-sm text-muted-foreground">Nome</p><p className="font-medium">{m.name}</p></div>
            <div><p className="text-sm text-muted-foreground">Prezzo</p><p className="font-medium">€{m.price.toFixed(2)}</p></div>
            <div><p className="text-sm text-muted-foreground">Data</p><p className="font-medium">{new Date(m.date).toLocaleDateString()}</p></div>
            <div className="flex items-center justify-end gap-2">
              <AffiliateButton provider="thefork" label="Prenota" params={{ city: m.address.split(",").pop()!.trim() }} />
              <Button size="icon" variant="outline" onClick={() => api.del(m.id!)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {open ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Nome ristorante" required />
              <Input name="price" type="number" step="0.01" placeholder="Prezzo medio (€)" required />
              <Input name="address" placeholder="Indirizzo / Città" required />
              <Input name="date" type="date" required />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Salva</Button>
              <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Annulla</Button>
            </div>
          </form>
        ) : (
          <Button className="w-full" onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Aggiungi ristorante</Button>
        )}
      </CardContent>
    </Card>
  )
}
