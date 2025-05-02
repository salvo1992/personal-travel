// lib/tickets.ts
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    Timestamp,
  } from "firebase/firestore"
  import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
  import { db, storage } from "@/lib/firebase"
  
  export interface FlightTicket {
    id?: string            // Firestore id
    airline: string
    from: string
    to: string
    date: string           // ISO string
    time: string           // "10:30"
    price: number          // € in centesimi o float
    imageUrl?: string
    createdAt?: Timestamp
  }
  
  /* === CRUD === */
  
  export const ticketsRef = (tripId: string) =>
    collection(db, "trips", tripId, "tickets")
  
  export const watchTickets = (tripId: string, cb: (t: FlightTicket[]) => void) =>
    onSnapshot(query(ticketsRef(tripId)), (snap) =>
      cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as FlightTicket) }))),
    )
  
  export const addTicket = async (
    tripId: string,
    data: Omit<FlightTicket, "id" | "imageUrl" | "createdAt">,
    file?: File,
  ) => {
    let imageUrl
    if (file) {
      const path = `tickets/${tripId}/${Date.now()}-${file.name}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      imageUrl = await getDownloadURL(storageRef)
    }
    return await addDoc(ticketsRef(tripId), {
      ...data,
      imageUrl: imageUrl || null,
      createdAt: Timestamp.now(),
    })
  }
  
  export const deleteTicket = async (tripId: string, ticket: FlightTicket) => {
    // cancella immagine
    if (ticket.imageUrl) {
      try {
        await deleteObject(ref(storage, ticket.imageUrl))
      } catch (e) {
        console.warn("Impossibile eliminare immagine:", e)
      }
    }
    await deleteDoc(doc(db, "trips", tripId, "tickets", ticket.id!))
  }
  