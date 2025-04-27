"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Plus, Trash, PieChart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface BudgetCardProps {
  tripId: string
}

interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
}

const categories = [
  { value: "accommodation", label: "Alloggio" },
  { value: "food", label: "Cibo e bevande" },
  { value: "transportation", label: "Trasporti" },
  { value: "activities", label: "Attività e attrazioni" },
  { value: "shopping", label: "Shopping" },
  { value: "other", label: "Altro" },
]

export function BudgetCard({ tripId }: BudgetCardProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id" | "date">>({
    category: "other",
    description: "",
    amount: 0,
  })
  const [budget, setBudget] = useState<number>(0)
  const [isEditingBudget, setIsEditingBudget] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true)
      try {
        // In un'implementazione reale, qui ci sarebbe una chiamata a Firebase
        // Per ora simuliamo con dati fittizi e localStorage
        const savedExpenses = localStorage.getItem(`expenses_${tripId}`)
        const savedBudget = localStorage.getItem(`budget_${tripId}`)

        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses))
        } else {
          // Dati di esempio
          const mockExpenses = [
            {
              id: "exp-1",
              category: "accommodation",
              description: "Hotel Centrale",
              amount: 120,
              date: new Date().toISOString(),
            },
            {
              id: "exp-2",
              category: "food",
              description: "Ristorante Da Luigi",
              amount: 45,
              date: new Date().toISOString(),
            },
          ]
          setExpenses(mockExpenses)
          localStorage.setItem(`expenses_${tripId}`, JSON.stringify(mockExpenses))
        }

        if (savedBudget) {
          setBudget(Number(savedBudget))
        } else {
          setBudget(1000)
          localStorage.setItem(`budget_${tripId}`, "1000")
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching expenses:", error)
        setIsLoading(false)
      }
    }

    fetchExpenses()
  }, [tripId])

  const handleAddExpense = () => {
    if (!newExpense.description || newExpense.amount <= 0) {
      toast({
        title: "Errore",
        description: "Inserisci una descrizione e un importo valido",
        variant: "destructive",
      })
      return
    }

    const expense: Expense = {
      id: `exp-${Date.now()}`,
      ...newExpense,
      date: new Date().toISOString(),
    }

    const updatedExpenses = [...expenses, expense]
    setExpenses(updatedExpenses)
    localStorage.setItem(`expenses_${tripId}`, JSON.stringify(updatedExpenses))

    setNewExpense({
      category: "other",
      description: "",
      amount: 0,
    })
    setIsAddingExpense(false)

    toast({
      title: "Spesa aggiunta",
      description: "La spesa è stata aggiunta con successo",
    })
  }

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem(`expenses_${tripId}`, JSON.stringify(updatedExpenses))

    toast({
      title: "Spesa eliminata",
      description: "La spesa è stata eliminata con successo",
    })
  }

  const handleUpdateBudget = () => {
    localStorage.setItem(`budget_${tripId}`, budget.toString())
    setIsEditingBudget(false)

    toast({
      title: "Budget aggiornato",
      description: "Il budget è stato aggiornato con successo",
    })
  }

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  const getRemainingBudget = () => {
    return budget - getTotalExpenses()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "accommodation":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M3 7v11m0-7h18m0-7v11m-5-11v3m-1-3v3m-1-3v3m-1-3v3m-5 4v3m-1-3v3m-1-3v3m-1-3v3" />
          </svg>
        )
      case "food":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M7 10h10" />
            <path d="M7 14h10" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        )
      case "transportation":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect x="5" y="2" width="14" height="16" rx="2" />
            <path d="M5 10h14" />
            <path d="M10 14h4" />
            <path d="M7 18h10" />
          </svg>
        )
      case "activities":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m16 12-4 4-4-4" />
            <path d="m16 8-4-4-4 4" />
          </svg>
        )
      case "shopping":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        )
    }
  }

  const getCategoryName = (categoryValue: string) => {
    const category = categories.find((cat) => cat.value === categoryValue)
    return category ? category.label : "Altro"
  }

  return (
    <Card className="border-tree-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-tree-600" />
            <span>Budget e Spese</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={() => setIsEditingBudget(!isEditingBudget)}
          >
            {isEditingBudget ? "Annulla" : "Modifica budget"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tree-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Budget totale</p>
                  {isEditingBudget ? (
                    <div className="mt-1 space-y-2">
                      <Input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="h-8 text-center"
                      />
                      <Button size="sm" className="w-full" onClick={handleUpdateBudget}>
                        Salva
                      </Button>
                    </div>
                  ) : (
                    <p className="text-xl font-semibold">€{budget.toFixed(2)}</p>
                  )}
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Spese totali</p>
                  <p className="text-xl font-semibold">€{getTotalExpenses().toFixed(2)}</p>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <p className="text-sm text-muted-foreground">Rimanente</p>
                  <p
                    className={`text-xl font-semibold ${
                      getRemainingBudget() < 0 ? "text-destructive" : "text-green-600"
                    }`}
                  >
                    €{getRemainingBudget().toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Spese recenti</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setIsAddingExpense(!isAddingExpense)}
                >
                  {isAddingExpense ? (
                    "Annulla"
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Aggiungi spesa
                    </>
                  )}
                </Button>
              </div>

              {isAddingExpense && (
                <div className="border rounded-md p-3 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categoria</label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descrizione</label>
                    <Input
                      placeholder="Es. Cena al ristorante"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Importo (€)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount || ""}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleAddExpense}>
                    Aggiungi spesa
                  </Button>
                </div>
              )}

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {expenses.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Nessuna spesa registrata</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div key={expense.id} className="border rounded-md p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">{getCategoryIcon(expense.category)}</div>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{getCategoryName(expense.category)}</span>
                            <span>•</span>
                            <span>{new Date(expense.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">€{expense.amount.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <PieChart className="h-4 w-4" />
                  Visualizza statistiche
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
