"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Plus, Trash, Volume2, Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PhrasesCardProps {
  tripId: string
  countryCode: string
  destination: string
}

interface Phrase {
  id: string
  phrase: string
  translation: string
  category: string
}

const categories = [
  { value: "basic", label: "Base" },
  { value: "emergency", label: "Emergenza" },
  { value: "food", label: "Cibo" },
  { value: "shopping", label: "Shopping" },
  { value: "transportation", label: "Trasporti" },
  { value: "custom", label: "Personalizzate" },
]

export function PhrasesCard({ tripId, countryCode, destination }: PhrasesCardProps) {
  const [phrases, setPhrases] = useState<Phrase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingPhrase, setIsAddingPhrase] = useState(false)
  const [activeCategory, setActiveCategory] = useState("basic")
  const [newPhrase, setNewPhrase] = useState<Omit<Phrase, "id">>({
    phrase: "",
    translation: "",
    category: "custom",
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchPhrases = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi e localStorage
        const savedPhrases = localStorage.getItem(`phrases_${tripId}`)

        if (savedPhrases) {
          setPhrases(JSON.parse(savedPhrases))
        } else {
          // Dati di esempio basati sul paese
          let mockPhrases: Phrase[] = []

          if (countryCode === "IT") {
            mockPhrases = [
              { id: "phrase-1", phrase: "Buongiorno", translation: "Buon giorno", category: "basic" },
              { id: "phrase-2", phrase: "Grazie", translation: "Grazie", category: "basic" },
              { id: "phrase-3", phrase: "Per favore", translation: "Per favore", category: "basic" },
              { id: "phrase-4", phrase: "Scusi", translation: "Scusi", category: "basic" },
              { id: "phrase-5", phrase: "Quanto costa?", translation: "Quanto costa?", category: "shopping" },
              { id: "phrase-6", phrase: "Dov'è il bagno?", translation: "Dov'è il bagno?", category: "basic" },
              { id: "phrase-7", phrase: "Aiuto!", translation: "Aiuto!", category: "emergency" },
              { id: "phrase-8", phrase: "Vorrei ordinare...", translation: "Vorrei ordinare...", category: "food" },
              {
                id: "phrase-9",
                phrase: "Dov'è la stazione?",
                translation: "Dov'è la stazione?",
                category: "transportation",
              },
            ]
          } else if (countryCode === "FR") {
            mockPhrases = [
              { id: "phrase-1", phrase: "Bonjour", translation: "Buongiorno", category: "basic" },
              { id: "phrase-2", phrase: "Merci", translation: "Grazie", category: "basic" },
              { id: "phrase-3", phrase: "S'il vous plaît", translation: "Per favore", category: "basic" },
              { id: "phrase-4", phrase: "Excusez-moi", translation: "Scusi", category: "basic" },
              { id: "phrase-5", phrase: "Combien ça coûte?", translation: "Quanto costa?", category: "shopping" },
            ]
          } else if (countryCode === "ES") {
            mockPhrases = [
              { id: "phrase-1", phrase: "Hola", translation: "Ciao", category: "basic" },
              { id: "phrase-2", phrase: "Gracias", translation: "Grazie", category: "basic" },
              { id: "phrase-3", phrase: "Por favor", translation: "Per favore", category: "basic" },
              { id: "phrase-4", phrase: "Perdón", translation: "Scusi", category: "basic" },
              { id: "phrase-5", phrase: "¿Cuánto cuesta?", translation: "Quanto costa?", category: "shopping" },
            ]
          } else if (countryCode === "GB" || countryCode === "US") {
            mockPhrases = [
              { id: "phrase-1", phrase: "Hello", translation: "Ciao", category: "basic" },
              { id: "phrase-2", phrase: "Thank you", translation: "Grazie", category: "basic" },
              { id: "phrase-3", phrase: "Please", translation: "Per favore", category: "basic" },
              { id: "phrase-4", phrase: "Excuse me", translation: "Scusi", category: "basic" },
              { id: "phrase-5", phrase: "How much is it?", translation: "Quanto costa?", category: "shopping" },
            ]
          } else {
            // Frasi generiche per altri paesi
            mockPhrases = [
              { id: "phrase-1", phrase: "Hello / Good day", translation: "Ciao / Buongiorno", category: "basic" },
              { id: "phrase-2", phrase: "Thank you", translation: "Grazie", category: "basic" },
              { id: "phrase-3", phrase: "Please", translation: "Per favore", category: "basic" },
              { id: "phrase-4", phrase: "Excuse me", translation: "Scusi", category: "basic" },
              { id: "phrase-5", phrase: "How much is it?", translation: "Quanto costa?", category: "shopping" },
            ]
          }

          setPhrases(mockPhrases)
          localStorage.setItem(`phrases_${tripId}`, JSON.stringify(mockPhrases))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching phrases:", error)
        setIsLoading(false)
      }
    }

    fetchPhrases()
  }, [tripId, countryCode])

  const handleAddPhrase = () => {
    if (!newPhrase.phrase || !newPhrase.translation) {
      toast({
        title: "Errore",
        description: "Inserisci sia la frase che la traduzione",
        variant: "destructive",
      })
      return
    }

    const phrase: Phrase = {
      id: `phrase-${Date.now()}`,
      ...newPhrase,
    }

    const updatedPhrases = [...phrases, phrase]
    setPhrases(updatedPhrases)
    localStorage.setItem(`phrases_${tripId}`, JSON.stringify(updatedPhrases))

    setNewPhrase({
      phrase: "",
      translation: "",
      category: "custom",
    })
    setIsAddingPhrase(false)

    toast({
      title: "Frase aggiunta",
      description: "La frase è stata aggiunta con successo",
    })
  }

  const handleDeletePhrase = (id: string) => {
    const updatedPhrases = phrases.filter((phrase) => phrase.id !== id)
    setPhrases(updatedPhrases)
    localStorage.setItem(`phrases_${tripId}`, JSON.stringify(updatedPhrases))

    toast({
      title: "Frase eliminata",
      description: "La frase è stata eliminata con successo",
    })
  }

  const handleCopyPhrase = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiato",
      description: "Frase copiata negli appunti",
    })
  }

  const handleSpeakPhrase = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      // Imposta la lingua in base al codice paese
      if (countryCode === "IT") utterance.lang = "it-IT"
      else if (countryCode === "FR") utterance.lang = "fr-FR"
      else if (countryCode === "ES") utterance.lang = "es-ES"
      else if (countryCode === "GB") utterance.lang = "en-GB"
      else if (countryCode === "US") utterance.lang = "en-US"
      else utterance.lang = "en-US" // Default

      window.speechSynthesis.speak(utterance)
    } else {
      toast({
        title: "Non supportato",
        description: "La sintesi vocale non è supportata dal tuo browser",
        variant: "destructive",
      })
    }
  }

  const filteredPhrases = phrases.filter((phrase) =>
    activeCategory === "all" ? true : phrase.category === activeCategory,
  )

  return (
    <Card className="border-sky-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-sky-600" />
            <span>Frasi utili</span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => setIsAddingPhrase(!isAddingPhrase)}>
            {isAddingPhrase ? (
              "Annulla"
            ) : (
              <>
                <Plus className="h-4 w-4" /> Aggiungi frase
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
            </div>
          ) : (
            <>
              {isAddingPhrase && (
                <div className="border rounded-md p-3 space-y-3 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frase in {destination}</label>
                    <Input
                      placeholder="Es. Grazie"
                      value={newPhrase.phrase}
                      onChange={(e) => setNewPhrase({ ...newPhrase, phrase: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Traduzione in italiano</label>
                    <Input
                      placeholder="Es. Grazie"
                      value={newPhrase.translation}
                      onChange={(e) => setNewPhrase({ ...newPhrase, translation: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoria</label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newPhrase.category}
                      onChange={(e) => setNewPhrase({ ...newPhrase, category: e.target.value })}
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button className="w-full" onClick={handleAddPhrase}>
                    Aggiungi frase
                  </Button>
                </div>
              )}

              <div className="flex overflow-x-auto pb-2 mb-2">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  size="sm"
                  className="mr-2 whitespace-nowrap"
                  onClick={() => setActiveCategory("all")}
                >
                  Tutte
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={activeCategory === category.value ? "default" : "outline"}
                    size="sm"
                    className="mr-2 whitespace-nowrap"
                    onClick={() => setActiveCategory(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {filteredPhrases.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Nessuna frase in questa categoria</p>
                  </div>
                ) : (
                  filteredPhrases.map((phrase) => (
                    <div key={phrase.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {categories.find((c) => c.value === phrase.category)?.label || "Altro"}
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground"
                            onClick={() => handleSpeakPhrase(phrase.phrase)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground"
                            onClick={() => handleCopyPhrase(phrase.phrase)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {phrase.category === "custom" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeletePhrase(phrase.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="font-medium">{phrase.phrase}</p>
                      <p className="text-sm text-muted-foreground">{phrase.translation}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
