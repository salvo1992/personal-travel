import {
    collection,
    doc,
    query,
    onSnapshot,
    addDoc,
    deleteDoc,
    Timestamp,
  } from "firebase/firestore"
  import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage"
  import { db, storage } from "@/lib/firebase"
  
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
  
  /* === Helpers === */
  const ticketsRef = (tripId: string) =>
    collection(db, "trips", tripId, "tickets")
  
  export const watchTickets = (
    tripId: string,
    cb: (t: FlightTicket[]) => void,
  ) =>
    onSnapshot(query(ticketsRef(tripId)), (snap) =>
      cb(
        snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as FlightTicket),
        })),
      ),
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
  
  export const deleteTicket = async (tripId: string, ticketId: string, imageUrl?: string) => {
    if (imageUrl) {
      try {
        await deleteObject(ref(storage, imageUrl))
      } catch {
        /* silent */
      }
    }
    await deleteDoc(doc(db, "trips", tripId, "tickets", ticketId))
  }
  
  