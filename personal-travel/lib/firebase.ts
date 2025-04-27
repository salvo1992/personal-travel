// Questo file sarà utilizzato per l'integrazione con Firebase
// Per ora è un placeholder che simula le funzionalità di Firebase

// Simulazione del database
const database: Record<string, any> = {
  users: {},
  trips: {},
  notes: {},
  luggage: {},
  documents: {},
  cities: {},
  hotels: {},
  restaurants: {},
  tickets: {},
  souvenirs: {},
  budget: {},
  itineraries: {},
}

// Funzione per salvare dati
export const saveData = (collection: string, id: string, data: any) => {
  if (!database[collection]) {
    database[collection] = {}
  }

  database[collection][id] = {
    ...data,
    updatedAt: new Date().toISOString(),
  }

  return Promise.resolve({ id, ...data })
}

// Funzione per ottenere dati
export const getData = (collection: string, id?: string) => {
  if (id) {
    return Promise.resolve(database[collection][id] || null)
  }

  return Promise.resolve(
    Object.entries(database[collection] || {}).map(([id, data]) => ({
      id,
      ...data,
    })),
  )
}

// Funzione per eliminare dati
export const deleteData = (collection: string, id: string) => {
  if (database[collection] && database[collection][id]) {
    delete database[collection][id]
  }

  return Promise.resolve(true)
}

// Funzione per autenticare utente
export const authenticateUser = (email: string, password: string) => {
  // Per ora accetta solo admin/pasword
  if (email === "admin" && password === "pasword") {
    return Promise.resolve({
      id: "admin-user",
      name: "Admin",
      email: "admin@example.com",
    })
  }

  return Promise.reject(new Error("Invalid credentials"))
}

// Funzione per registrare utente
export const registerUser = (name: string, email: string, password: string) => {
  const userId = `user-${Date.now()}`

  database.users[userId] = {
    id: userId,
    name,
    email,
    createdAt: new Date().toISOString(),
  }

  return Promise.resolve({
    id: userId,
    name,
    email,
  })
}
