import { db, storage } from "@/lib/firebase"
import { getAuth } from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  getDocs,
  serverTimestamp
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// ===================== CRUD NESTED per /users/{userId}/trips/{tripId}/{subcol} =====================
export const makeUserTripCrud = <T>(
  tripId: string,
  sub: string,
  hasFile = false
) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (!currentUser) throw new Error("User not authenticated")

  const basePath = `users/${currentUser.uid}/trips/${tripId}/${sub}`
  const subRef = collection(db, basePath)

  const watch = (cb: (r: (T & { id: string })[]) => void) =>
    onSnapshot(query(subRef), (snap) =>
      cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) })))
    )

  const add = async (data: Omit<T, "id" | "imageUrl" | "createdAt">, file?: File) => {
    let imageUrl
    if (hasFile && file) {
      const path = `${basePath}/${Date.now()}-${file.name}`
      const sRef = ref(storage, path)
      await uploadBytes(sRef, file)
      imageUrl = await getDownloadURL(sRef)
    }

    return await addDoc(subRef, {
      ...data,
      imageUrl: imageUrl || null,
      createdAt: serverTimestamp(),
      userId: currentUser.uid
    })
  }

  const del = async (docId: string, imageUrl?: string) => {
    if (hasFile && imageUrl) {
      try { await deleteObject(ref(storage, imageUrl)) } catch {}
    }
    await deleteDoc(doc(db, basePath, docId))
  }

  const update = async (docId: string, data: Partial<T>) => {
    await updateDoc(doc(db, basePath, docId), {
      ...data,
      updatedAt: serverTimestamp()
    })
  }

  const get = async (docId: string) => {
    const snapshot = await getDoc(doc(db, basePath, docId))
    return snapshot.exists() ? { id: snapshot.id, ...(snapshot.data() as T) } : null
  }

  return { watch, add, del, update, get }
}

// ===================== CRUD PRINCIPALE per /users/{userId}/trips =====================
export const userTripsCrud = () => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  if (!currentUser) throw new Error("User not authenticated")

  const tripsRef = collection(db, `users/${currentUser.uid}/trips`)

  const watch = (cb: (r: any[]) => void) =>
    onSnapshot(tripsRef, (snap) =>
      cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })))
    )

  const add = async (data: {
  title: string;
  startDate: string;
  endDate: string;
  travelers?: { uid: string }[]; // <- lista opzionale di viaggiatori
}) => {
  const docRef = await addDoc(tripsRef, {
    title: data.title,
    startDate: data.startDate,
    endDate: data.endDate,
    createdAt: serverTimestamp(),
    ownerId: currentUser.uid
  })

  // aggiungiamo i viaggiatori alla tabella sharedTrips
  if (data.travelers && Array.isArray(data.travelers)) {
    const tripId = docRef.id
    await Promise.all(
      data.travelers.map(async (t) => {
        if (t.uid && t.uid !== currentUser.uid) {
          await shareTripWithUser(tripId, t.uid)
        }
      })
    )
  }

  return docRef
}

  const del = async (tripId: string) => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/trips`, tripId))
  }

  const update = async (tripId: string, data: Partial<any>) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/trips`, tripId), data)
  }

  const get = async (tripId: string) => {
    const snapshot = await getDoc(doc(db, `users/${currentUser.uid}/trips`, tripId))
    return snapshot.exists() ? { id: snapshot.id, ...(snapshot.data() as any) } : null
  }

  return { watch, add, del, update, get }
}

// ===================== TRIP CONDIVISI: /sharedTrips =====================
export const getSharedTripIds = async (userId: string) => {
  const q = query(collection(db, "sharedTrips"), where("userId", "==", userId))
  const docs = await getDocs(q)
  return docs.docs.map(d => d.data().tripId as string)
}

export const shareTripWithUser = async (tripId: string, sharedUserId: string) => {
  return await setDoc(doc(db, "sharedTrips", `${tripId}_${sharedUserId}`), {
    tripId,
    userId: sharedUserId,
    sharedAt: serverTimestamp()
  })
}

export const removeTripSharing = async (tripId: string, sharedUserId: string) => {
  return await deleteDoc(doc(db, "sharedTrips", `${tripId}_${sharedUserId}`))
}



