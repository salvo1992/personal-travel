import { Timestamp } from "firebase/firestore"
import { makeUserTripCrud } from "@/lib/firestore-crud"

export interface FlightTicket {
  id?: string
  airline: string
  from: string
  to: string
  date: string        // ISO
  time: string        // HH:mm
  price: number       // €
  imageUrl?: string
  createdAt?: Timestamp
}

// ============ CRUD wrapper per Tickets ============
export const watchTickets = (tripId: string, cb: (tickets: FlightTicket[]) => void) =>
  makeUserTripCrud<FlightTicket>(tripId, "tickets", true).watch(cb)

export const addTicket = (
  tripId: string,
  data: Omit<FlightTicket, "id" | "imageUrl" | "createdAt">,
  file?: File
) =>
  makeUserTripCrud<FlightTicket>(tripId, "tickets", true).add(data, file)

export const deleteTicket = (
  tripId: string,
  ticketId: string,
  imageUrl?: string
) =>
  makeUserTripCrud<FlightTicket>(tripId, "tickets", true).del(ticketId, imageUrl)

  