import { db, storage } from "@/lib/firebase"
import {
  addDoc, collection, deleteDoc, doc,
  onSnapshot, query, Timestamp
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

/* factory per CRUD sotto /trips/{tripId}/{subcol} */
export const makeTripCrud = <T>(
  tripId: string,
  sub: string,
  hasFile = false,
) => {
  const subRef = collection(db, "trips", tripId, sub)

  const watch = (cb: (r: (T & { id: string })[]) => void) =>
    onSnapshot(query(subRef), (snap) =>
      cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }))),
    )

  const add = async (data: Omit<T, "id" | "imageUrl" | "createdAt">, file?: File) => {
    let imageUrl
    if (hasFile && file) {
      const path = `${sub}/${tripId}/${Date.now()}-${file.name}`
      const sRef = ref(storage, path)
      await uploadBytes(sRef, file)
      imageUrl = await getDownloadURL(sRef)
    }
    return await addDoc(subRef, {
      ...data,
      imageUrl: imageUrl || null,
      createdAt: Timestamp.now(),
    })
  }

  const del = async (docId: string, imageUrl?: string) => {
    if (hasFile && imageUrl) {
      try { await deleteObject(ref(storage, imageUrl)) } catch {}
    }
    await deleteDoc(doc(db, "trips", tripId, sub, docId))
  }

  return { watch, add, del }
}
