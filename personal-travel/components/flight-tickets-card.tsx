"use client"

import { useState, useEffect, FormEvent } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash, Plus } from "lucide-react"
import {
  addTicket,
  deleteTicket,
  FlightTicket,
  watchTickets,
} from "@/lib/tickets"
import { useToast } from "@/components/ui/use-toast"

type Props = { tripId: string }

export function FlightTicketsCard({ tripId }: Props) {
  const [tickets, setTickets] = useState<FlightTicket[]>([])
  const [openForm, setOpenForm] = useState(false)
  const { toast } = useToast()

  /* === realtime listener === */
  useEffect(() => watchTickets(tripId, setTickets), [tripId])

  /* === submit handler === */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as any
    try {
      await addTicket(
        tripId,
        {
          airline: data.airline as string,
          from: data.from,
          to: data.to,
          date: data.date,
          time: data.time,
          price: parseFloat(data.price),
        },
        data.image as File,
      )
      toast({ title: "Biglietto aggiunto" })
      form.reset()
      setOpenForm(false)
    } catch (err) {
      toast({ title: "Errore", description: String(err), variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biglietti aerei</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* elenco biglietti */}
        {tickets.map((tkt) => (
          <div
            key={tkt.id}
            className="border rounded-lg p-4 grid gap-2 md:grid-cols-5"
          >
            <div>
              <p className="text-sm text-muted-foreground">Volo</p>
              <p className="font-medium">
                {tkt.from} → {tkt.to}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data / ora</p>
              <p className="font-medium">
                {new Date(tkt.date).toLocaleDateString("it-IT")} {tkt.time}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Compagnia</p>
              <p className="font-medium">{tkt.airline}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prezzo</p>
              <p className="font-medium">€{Number(tkt.price).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 justify-end">
              {tkt.imageUrl && (
                <a
                  href={tkt.imageUrl}
                  target="_blank"
                  className="underline text-sm"
                  rel="noopener noreferrer"
                >
                  Foto
                </a>
              )}
              <Button
                size="icon"
                variant="outline"
                onClick={() => deleteTicket(tripId, tkt)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* toggle form */}
        {openForm ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input name="airline" placeholder="Compagnia" required />
              <Input name="price" placeholder="Prezzo (€)" type="number" min="0" step="0.01" required />
              <Input name="from" placeholder="Da" required />
              <Input name="to" placeholder="A" required />
              <Input name="date" type="date" required />
              <Input name="time" type="time" required />
              <Input name="image" type="file" accept="image/*" />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Salva</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpenForm(false)}
              >
                Annulla
              </Button>
            </div>
          </form>
        ) : (
          <Button className="w-full" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4 mr-2" /> Aggiungi biglietto
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
