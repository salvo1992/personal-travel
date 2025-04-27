"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, DollarSign } from "lucide-react"

interface CurrencyConverterProps {
  countryCode: string
}

const currencies = [
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "USD", name: "Dollaro USA", symbol: "$" },
  { code: "GBP", name: "Sterlina", symbol: "£" },
  { code: "JPY", name: "Yen Giapponese", symbol: "¥" },
  { code: "CHF", name: "Franco Svizzero", symbol: "Fr" },
  { code: "CAD", name: "Dollaro Canadese", symbol: "$" },
  { code: "AUD", name: "Dollaro Australiano", symbol: "$" },
  { code: "CNY", name: "Yuan Cinese", symbol: "¥" },
]

export function CurrencyConverter({ countryCode }: CurrencyConverterProps) {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("EUR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [result, setResult] = useState("1.09")
  const [isLoading, setIsLoading] = useState(false)

  // Determina la valuta locale in base al codice paese
  useEffect(() => {
    let localCurrency = "EUR"

    // Mappa semplificata di alcuni paesi alle loro valute
    const countryCurrencyMap: Record<string, string> = {
      US: "USD",
      GB: "GBP",
      JP: "JPY",
      CH: "CHF",
      CA: "CAD",
      AU: "AUD",
      CN: "CNY",
      IT: "EUR",
      FR: "EUR",
      DE: "EUR",
      ES: "EUR",
    }

    if (countryCurrencyMap[countryCode]) {
      localCurrency = countryCurrencyMap[countryCode]
      setToCurrency(localCurrency)
    }
  }, [countryCode])

  const handleConvert = () => {
    setIsLoading(true)

    // Simula una chiamata API per la conversione
    setTimeout(() => {
      // Tassi di cambio fittizi per demo
      const exchangeRates: Record<string, Record<string, number>> = {
        EUR: { USD: 1.09, GBP: 0.85, JPY: 160.21, CHF: 0.96, CAD: 1.47, AUD: 1.63, CNY: 7.83, EUR: 1 },
        USD: { EUR: 0.92, GBP: 0.78, JPY: 147.32, CHF: 0.88, CAD: 1.35, AUD: 1.5, CNY: 7.18, USD: 1 },
        GBP: { EUR: 1.18, USD: 1.28, JPY: 188.48, CHF: 1.13, CAD: 1.73, AUD: 1.92, CNY: 9.21, GBP: 1 },
        JPY: { EUR: 0.0062, USD: 0.0068, GBP: 0.0053, CHF: 0.006, CAD: 0.0092, AUD: 0.0102, CNY: 0.049, JPY: 1 },
        CHF: { EUR: 1.04, USD: 1.13, GBP: 0.88, JPY: 166.88, CAD: 1.53, AUD: 1.7, CNY: 8.16, CHF: 1 },
        CAD: { EUR: 0.68, USD: 0.74, GBP: 0.58, JPY: 109.13, CHF: 0.65, AUD: 1.11, CNY: 5.33, CAD: 1 },
        AUD: { EUR: 0.61, USD: 0.67, GBP: 0.52, JPY: 98.29, CHF: 0.59, CAD: 0.9, CNY: 4.8, AUD: 1 },
        CNY: { EUR: 0.13, USD: 0.14, GBP: 0.11, JPY: 20.46, CHF: 0.12, CAD: 0.19, AUD: 0.21, CNY: 1 },
      }

      const rate = exchangeRates[fromCurrency][toCurrency]
      const convertedAmount = (Number.parseFloat(amount) * rate).toFixed(2)

      setResult(convertedAmount)
      setIsLoading(false)
    }, 800)
  }

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find((c) => c.code === code)
    return currency ? currency.symbol : code
  }

  return (
    <Card className="border-leaf-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-leaf-600" />
          Conversione Valuta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Importo</label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-9" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Da</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Seleziona valuta" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Risultato</label>
              <div className="h-9 border rounded-md flex items-center px-3 bg-muted/50">
                <span>{result}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">A</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Seleziona valuta" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full" onClick={handleConvert} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-leaf-600 border-t-transparent rounded-full"></div>
                Conversione...
              </span>
            ) : (
              `Converti ${getCurrencySymbol(fromCurrency)} → ${getCurrencySymbol(toCurrency)}`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
