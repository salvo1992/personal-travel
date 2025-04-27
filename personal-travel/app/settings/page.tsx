"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footer } from "@/components/footer"
import { Globe, ArrowLeft } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [language, setLanguage] = useState("it")
  const [currency, setCurrency] = useState("EUR")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [emailUpdates, setEmailUpdates] = useState(true)

  const handleSaveProfile = () => {
    toast({
      title: "Profilo aggiornato",
      description: "Le modifiche al tuo profilo sono state salvate con successo.",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferenze aggiornate",
      description: "Le tue preferenze sono state aggiornate con successo.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-ocean-600" />
              <span className="text-xl font-bold text-gradient">TravelDreams</span>
            </Link>
          </div>
          <Link href={user ? "/destinations" : "/"}>
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Torna indietro</span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Impostazioni</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profilo</TabsTrigger>
              <TabsTrigger value="preferences">Preferenze</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profilo</CardTitle>
                  <CardDescription>
                    Gestisci le informazioni del tuo profilo che verranno mostrate agli altri utenti.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" defaultValue={user ? user.name.split(" ")[0] : ""} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="surname">Cognome</Label>
                        <Input id="surname" defaultValue={user ? user.name.split(" ")[1] || "" : ""} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user ? user.email : ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" placeholder="Racconta qualcosa di te..." />
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} className="bg-ocean-600 hover:bg-ocean-700">
                    Salva modifiche
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferenze</CardTitle>
                  <CardDescription>
                    Personalizza la tua esperienza con le preferenze di lingua, valuta e notifiche.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Lingua</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Seleziona lingua" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">Italiano</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Valuta</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Seleziona valuta" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="GBP">British Pound (£)</SelectItem>
                            <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                            <SelectItem value="CHF">Swiss Franc (Fr)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">Notifiche</Label>
                          <p className="text-sm text-muted-foreground">
                            Ricevi notifiche sui tuoi viaggi e aggiornamenti.
                          </p>
                        </div>
                        <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="darkMode">Modalità scura</Label>
                          <p className="text-sm text-muted-foreground">
                            Attiva la modalità scura per ridurre l'affaticamento degli occhi.
                          </p>
                        </div>
                        <Switch id="darkMode" checked={darkMode} onCheckedChange={setDarkMode} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailUpdates">Aggiornamenti via email</Label>
                          <p className="text-sm text-muted-foreground">
                            Ricevi email con offerte e suggerimenti di viaggio.
                          </p>
                        </div>
                        <Switch id="emailUpdates" checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSavePreferences} className="bg-ocean-600 hover:bg-ocean-700">
                    Salva preferenze
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Gestisci le impostazioni del tuo account, inclusa la password e le opzioni di sicurezza.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Password attuale</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nuova password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Conferma password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="bg-ocean-600 hover:bg-ocean-700">Aggiorna password</Button>
                  <div className="pt-4 border-t mt-6">
                    <h3 className="text-lg font-medium mb-4">Elimina account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Una volta eliminato il tuo account, tutti i tuoi dati verranno rimossi permanentemente. Questa
                      azione non può essere annullata.
                    </p>
                    <Button variant="destructive">Elimina account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
