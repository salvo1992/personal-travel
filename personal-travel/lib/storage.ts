// Funzioni per gestire il localStorage

// Salva un viaggio
export const saveTrip = (trip: any) => {
  try {
    // Ottieni i viaggi esistenti
    const trips = getTrips()

    // Aggiungi o aggiorna il viaggio
    const existingIndex = trips.findIndex((t) => t.id === trip.id)

    if (existingIndex >= 0) {
      trips[existingIndex] = { ...trips[existingIndex], ...trip, updatedAt: new Date().toISOString() }
    } else {
      trips.push({ ...trip, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }

    // Salva nel localStorage
    localStorage.setItem("trips", JSON.stringify(trips))

    return trip
  } catch (error) {
    console.error("Errore nel salvataggio del viaggio:", error)
    return null
  }
}

// Ottieni tutti i viaggi
export const getTrips = () => {
  try {
    const tripsJson = localStorage.getItem("trips")
    return tripsJson ? JSON.parse(tripsJson) : []
  } catch (error) {
    console.error("Errore nel recupero dei viaggi:", error)
    return []
  }
}

// Ottieni un viaggio specifico
export const getTrip = (id: string) => {
  try {
    const trips = getTrips()
    return trips.find((trip: any) => trip.id === id) || null
  } catch (error) {
    console.error("Errore nel recupero del viaggio:", error)
    return null
  }
}

// Elimina un viaggio
export const deleteTrip = (id: string) => {
  try {
    const trips = getTrips()
    const filteredTrips = trips.filter((trip: any) => trip.id !== id)
    localStorage.setItem("trips", JSON.stringify(filteredTrips))
    return true
  } catch (error) {
    console.error("Errore nell'eliminazione del viaggio:", error)
    return false
  }
}

// Salva una nota
export const saveNote = (tripId: string, note: any) => {
  try {
    // Ottieni le note esistenti
    const notes = getNotes(tripId)

    // Aggiungi o aggiorna la nota
    const existingIndex = notes.findIndex((n: any) => n.id === note.id)

    if (existingIndex >= 0) {
      notes[existingIndex] = { ...notes[existingIndex], ...note, updatedAt: new Date().toISOString() }
    } else {
      notes.push({ ...note, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }

    // Salva nel localStorage
    localStorage.setItem(`notes_${tripId}`, JSON.stringify(notes))

    return note
  } catch (error) {
    console.error("Errore nel salvataggio della nota:", error)
    return null
  }
}

// Ottieni tutte le note di un viaggio
export const getNotes = (tripId: string) => {
  try {
    const notesJson = localStorage.getItem(`notes_${tripId}`)
    return notesJson ? JSON.parse(notesJson) : []
  } catch (error) {
    console.error("Errore nel recupero delle note:", error)
    return []
  }
}

// Elimina una nota
export const deleteNote = (tripId: string, noteId: string) => {
  try {
    const notes = getNotes(tripId)
    const filteredNotes = notes.filter((note: any) => note.id !== noteId)
    localStorage.setItem(`notes_${tripId}`, JSON.stringify(filteredNotes))
    return true
  } catch (error) {
    console.error("Errore nell'eliminazione della nota:", error)
    return false
  }
}

// Salva un bagaglio
export const saveLuggage = (tripId: string, luggage: any) => {
  try {
    // Ottieni i bagagli esistenti
    const luggages = getLuggages(tripId)

    // Aggiungi o aggiorna il bagaglio
    const existingIndex = luggages.findIndex((l: any) => l.id === luggage.id)

    if (existingIndex >= 0) {
      luggages[existingIndex] = { ...luggages[existingIndex], ...luggage, updatedAt: new Date().toISOString() }
    } else {
      luggages.push({ ...luggage, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }

    // Salva nel localStorage
    localStorage.setItem(`luggages_${tripId}`, JSON.stringify(luggages))

    return luggage
  } catch (error) {
    console.error("Errore nel salvataggio del bagaglio:", error)
    return null
  }
}

// Ottieni tutti i bagagli di un viaggio
export const getLuggages = (tripId: string) => {
  try {
    const luggagesJson = localStorage.getItem(`luggages_${tripId}`)
    return luggagesJson ? JSON.parse(luggagesJson) : []
  } catch (error) {
    console.error("Errore nel recupero dei bagagli:", error)
    return []
  }
}

// Elimina un bagaglio
export const deleteLuggage = (tripId: string, luggageId: string) => {
  try {
    const luggages = getLuggages(tripId)
    const filteredLuggages = luggages.filter((luggage: any) => luggage.id !== luggageId)
    localStorage.setItem(`luggages_${tripId}`, JSON.stringify(filteredLuggages))
    return true
  } catch (error) {
    console.error("Errore nell'eliminazione del bagaglio:", error)
    return false
  }
}

// Salva un documento
export const saveDocument = (tripId: string, document: any) => {
  try {
    // Ottieni i documenti esistenti
    const documents = getDocuments(tripId)

    // Aggiungi o aggiorna il documento
    const existingIndex = documents.findIndex((d: any) => d.id === document.id)

    if (existingIndex >= 0) {
      documents[existingIndex] = { ...documents[existingIndex], ...document, updatedAt: new Date().toISOString() }
    } else {
      documents.push({ ...document, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    }

    // Salva nel localStorage
    localStorage.setItem(`documents_${tripId}`, JSON.stringify(documents))

    return document
  } catch (error) {
    console.error("Errore nel salvataggio del documento:", error)
    return null
  }
}

// Ottieni tutti i documenti di un viaggio
export const getDocuments = (tripId: string) => {
  try {
    const documentsJson = localStorage.getItem(`documents_${tripId}`)
    return documentsJson ? JSON.parse(documentsJson) : []
  } catch (error) {
    console.error("Errore nel recupero dei documenti:", error)
    return []
  }
}

// Elimina un documento
export const deleteDocument = (tripId: string, documentId: string) => {
  try {
    const documents = getDocuments(tripId)
    const filteredDocuments = documents.filter((document: any) => document.id !== documentId)
    localStorage.setItem(`documents_${tripId}`, JSON.stringify(filteredDocuments))
    return true
  } catch (error) {
    console.error("Errore nell'eliminazione del documento:", error)
    return false
  }
}
