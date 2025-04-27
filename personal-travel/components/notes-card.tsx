"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FilePlus, FileText, Trash } from "lucide-react"

interface NotesCardProps {
  tripId: string
}

interface Note {
  id: string
  content: string
  createdAt: string
}

export function NotesCard({ tripId }: NotesCardProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi
        setTimeout(() => {
          const mockNotes = [
            {
              id: "note-1",
              content: "Ricordati di portare l'adattatore per le prese elettriche.",
              createdAt: new Date().toISOString(),
            },
            {
              id: "note-2",
              content: "Controllare orari dei musei prima di partire.",
              createdAt: new Date().toISOString(),
            },
          ]
          setNotes(mockNotes)
          setIsLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching notes:", error)
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [tripId])

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    const note = {
      id: `note-${Date.now()}`,
      content: newNote,
      createdAt: new Date().toISOString(),
    }

    try {
      // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
      // Per ora simuliamo il salvataggio
      setNotes([...notes, note])
      setNewNote("")
      setIsAddingNote(false)
    } catch (error) {
      console.error("Error adding note:", error)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    try {
      // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
      // Per ora simuliamo l'eliminazione
      setNotes(notes.filter((note) => note.id !== noteId))
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  return (
    <Card className="border-sand-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-sand-600" />
          Note
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sand-600"></div>
            </div>
          ) : (
            <>
              {notes.length === 0 && !isAddingNote ? (
                <div className="text-center py-4 text-muted-foreground">
                  <p>Nessuna nota. Aggiungi la tua prima nota.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {notes.map((note) => (
                    <div key={note.id} className="border rounded-md p-3 text-sm relative group">
                      <p className="pr-6">{note.content}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {isAddingNote ? (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Scrivi una nota..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setIsAddingNote(false)}>
                      Annulla
                    </Button>
                    <Button size="sm" onClick={handleAddNote} className="bg-sand-600 hover:bg-sand-700">
                      Salva
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddingNote(true)}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  Aggiungi nota
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
