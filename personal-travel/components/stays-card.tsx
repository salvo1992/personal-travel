"use client"
import { useState, useEffect, FormEvent, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash, Plus } from "lucide-react"
import { makeUserTripCrud } from "@/lib/firestore-crud"
import { useToast } from "@/components/ui/use-toast"
import { AffiliateButton } from "@/components/AffiliateButton"

export interface Stay {
  id?: string
  name: string
  price: number
  address: string
  checkIn: string  // ISO
  checkOut: string // ISO
  description?: string
}

export function StaysCard({ tripId }: { tripId: string }) {
  const api = useMemo(() => makeUserTripCrud<Stay>(tripId, "stays"), [tripId])
  const [stays, setStays] = useState<Stay[]>([])
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => api.watch(setStays), [api])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    await api.add({
      name: fd.get("name") as string,
      price: Number(fd.get("price")),
      address: fd.get("address") as string,
      checkIn: fd.get("checkIn") as string,
      checkOut: fd.get("checkOut") as string,
      description: fd.get("description") as string
    })
    toast({ title: "Alloggio aggiunto" })
    e.currentTarget.reset()
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader><CardTitle>Hotel / Airbnb/ Booking /Alloggio</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {stays.map((s) => (
          <div key={s.id} className="border rounded-lg p-4 grid md:grid-cols-5 gap-4">
            <div><p className="text-sm text-muted-foreground">Nome</p><p className="font-medium">{s.name}</p></div>
            <div><p className="text-sm text-muted-foreground">Check-in</p><p className="font-medium">{new Date(s.checkIn).toLocaleDateString()}</p></div>
            <div><p className="text-sm text-muted-foreground">Check-out</p><p className="font-medium">{new Date(s.checkOut).toLocaleDateString()}</p></div>
            <div><p className="text-sm text-muted-foreground">Prezzo</p><p className="font-medium">€{s.price.toFixed(2)}/notte</p></div>
            <div><p className="text-sm text-muted-foreground">adress</p><p className="font-medium">{s.address}</p></div>
            <div><p className="text-sm text-muted-foreground">Descrizione</p><p className="font-medium">{s.description}</p></div>
            {/* <div><p className="text-sm text-muted-foreground">Data</p><p className="font-medium">{new Date(s.date).toLocaleDateString()}</p></div> */}
            <div className="flex items-center justify-end gap-2">
              <AffiliateButton provider="booking" label="Booking" params={{ destId: s.address }} />
              <AffiliateButton provider="airbnb" label="Airbnb" params={{ city: s.address.split(",").pop()!.trim() }} />
              <Button size="icon" variant="outline" onClick={() => api.del(s.id!)}><Trash className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}

        {open ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Nome struttura" required />
              <Input name="price" type="number" step="0.01" placeholder="Prezzo (€)" required />
              <Input name="address" placeholder="Indirizzo / Città" required />
              <Input name="checkIn" type="date" required />
              <Input name="checkOut" type="date" required />
              <Input name="description" placeholder="Descrizione" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Salva</Button>
              <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Annulla</Button>
            </div>
          </form>
        ) : (
          <Button className="w-full" onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Aggiungi alloggio</Button>
        )}
      </CardContent>
    </Card>
  )
}
