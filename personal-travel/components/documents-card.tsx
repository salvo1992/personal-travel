"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Trash, FileUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DocumentsCardProps {
  tripId: string
  countryCode: string
}

interface Document {
  id: string
  name: string
  type: string
  required: boolean
  checked: boolean
  notes: string
}

const documentTypes = [
  { value: "identity", label: "Documento d'identità" },
  { value: "travel", label: "Documento di viaggio" },
  { value: "health", label: "Documento sanitario" },
  { value: "insurance", label: "Assicurazione" },
  { value: "other", label: "Altro" },
]

export function DocumentsCard({ tripId, countryCode }: DocumentsCardProps) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingDocument, setIsAddingDocument] = useState(false)
  const [newDocument, setNewDocument] = useState<Omit<Document, "id">>({
    name: "",
    type: "identity",
    required: false,
    checked: false,
    notes: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi e localStorage
        const savedDocuments = localStorage.getItem(`documents_${tripId}`)

        if (savedDocuments) {
          setDocuments(JSON.parse(savedDocuments))
        } else {
          // Dati di esempio basati sul paese
          const mockDocuments: Document[] = [
            {
              id: "doc-1",
              name: "Carta d'identità",
              type: "identity",
              required: true,
              checked: false,
              notes: "Assicurati che sia valida",
            },
            {
              id: "doc-2",
              name: "Tessera sanitaria",
              type: "health",
              required: true,
              checked: false,
              notes: "",
            },
          ]

          // Aggiungi documenti specifici in base al paese
          if (countryCode !== "IT") {
            mockDocuments.push({
              id: "doc-3",
              name: "Passaporto",
              type: "travel",
              required: true,
              checked: false,
              notes: "Verifica la validità residua (almeno 6 mesi)",
            })
          }

          if (countryCode !== "IT" && !["GB", "FR", "DE", "ES"].includes(countryCode)) {
            mockDocuments.push({
              id: "doc-4",
              name: "Visto",
              type: "travel",
              required: true,
              checked: false,
              notes: "Verifica se è necessario per la tua nazionalità",
            })
          }

          mockDocuments.push({
            id: "doc-5",
            name: "Assicurazione viaggio",
            type: "insurance",
            required: false,
            checked: false,
            notes: "Consigliata per viaggi all'estero",
          })

          setDocuments(mockDocuments)
          localStorage.setItem(`documents_${tripId}`, JSON.stringify(mockDocuments))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching documents:", error)
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [tripId, countryCode])

  const handleAddDocument = () => {
    if (!newDocument.name) {
      toast({
        title: "Errore",
        description: "Inserisci almeno il nome del documento",
        variant: "destructive",
      })
      return
    }

    const document: Document = {
      id: `doc-${Date.now()}`,
      ...newDocument,
    }

    const updatedDocuments = [...documents, document]
    setDocuments(updatedDocuments)
    localStorage.setItem(`documents_${tripId}`, JSON.stringify(updatedDocuments))

    setNewDocument({
      name: "",
      type: "identity",
      required: false,
      checked: false,
      notes: "",
    })
    setIsAddingDocument(false)

    toast({
      title: "Documento aggiunto",
      description: "Il documento è stato aggiunto con successo",
    })
  }

  const handleDeleteDocument = (id: string) => {
    const updatedDocuments = documents.filter((document) => document.id !== id)
    setDocuments(updatedDocuments)
    localStorage.setItem(`documents_${tripId}`, JSON.stringify(updatedDocuments))

    toast({
      title: "Documento eliminato",
      description: "Il documento è stato eliminato con successo",
    })
  }

  const handleToggleChecked = (id: string) => {
    const updatedDocuments = documents.map((document) => {
      if (document.id === id) {
        return { ...document, checked: !document.checked }
      }
      return document
    })

    setDocuments(updatedDocuments)
    localStorage.setItem(`documents_${tripId}`, JSON.stringify(updatedDocuments))
  }

  const getRequiredCount = () => {
    return documents.filter((doc) => doc.required).length
  }

  const getCheckedCount = () => {
    return documents.filter((doc) => doc.checked).length
  }

  return (
    <Card className="border-sun-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-sun-600" />
            <span>Documenti</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1"
            onClick={() => setIsAddingDocument(!isAddingDocument)}
          >
            {isAddingDocument ? (
              "Annulla"
            ) : (
              <>
                <Plus className="h-4 w-4" /> Aggiungi documento
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sun-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Totale</p>
                  <p className="text-xl font-semibold">{documents.length}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Obbligatori</p>
                  <p className="text-xl font-semibold">{getRequiredCount()}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Pronti</p>
                  <p className="text-xl font-semibold">{getCheckedCount()}</p>
                </div>
              </div>

              {isAddingDocument && (
                <div className="border rounded-md p-3 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input
                      placeholder="Es. Passaporto"
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo</label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newDocument.type}
                      onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                    >
                      {documentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="required"
                      checked={newDocument.required}
                      onChange={(e) => setNewDocument({ ...newDocument, required: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="required" className="text-sm font-medium">
                      Obbligatorio
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Note</label>
                    <Input
                      placeholder="Es. Verifica la validità"
                      value={newDocument.notes}
                      onChange={(e) => setNewDocument({ ...newDocument, notes: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddDocument}>
                    Aggiungi documento
                  </Button>
                </div>
              )}

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {documents.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Nessun documento nella lista</p>
                  </div>
                ) : (
                  documents.map((document) => (
                    <div key={document.id} className={`border rounded-md p-3 ${document.checked ? "bg-muted/30" : ""}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={document.checked}
                            onChange={() => handleToggleChecked(document.id)}
                            className="rounded"
                          />
                          <h3 className={`font-medium ${document.checked ? "line-through text-muted-foreground" : ""}`}>
                            {document.name}
                          </h3>
                          {document.required && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                              Obbligatorio
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteDocument(document.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{documentTypes.find((t) => t.value === document.type)?.label || "Altro"}</span>
                      </div>
                      {document.notes && <p className="text-xs mt-1 italic">{document.notes}</p>}
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <FileUp className="h-4 w-4" />
                  Carica documenti
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
