import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WorldMap } from "@/components/world-map"
import { CookieBanner } from "@/components/cookie-banner"
import { Footer } from "@/components/footer"
import { Globe, MapPin, Plane, Settings } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-ocean-600" />
            <span className="text-xl font-bold text-gradient">TravelDreams</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Impostazioni</span>
              </Button>
            </Link>
            <UserNav />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 nature-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white animated-title">
                    Pianifica il tuo viaggio dei sogni
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl">
                    Crea itinerari personalizzati, organizza i tuoi documenti, gestisci il budget e scopri curiosità
                    sulle tue destinazioni preferite.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-ocean-600 hover:bg-gray-100">
                      Inizia ora
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/20 focus:bg-white/20"
                    >
                      Scopri di più
                    </Button>
                  </Link>
                </div>
              </div>
              <WorldMap />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-ocean-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Caratteristiche principali
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Tutto ciò di cui hai bisogno per pianificare il viaggio perfetto in un'unica applicazione.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-ocean-100 p-3">
                  <MapPin className="h-6 w-6 text-ocean-600" />
                </div>
                <h3 className="text-xl font-bold">Destinazioni</h3>
                <p className="text-center text-muted-foreground">
                  Esplora destinazioni in tutto il mondo e trova informazioni utili su ogni luogo.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-leaf-100 p-3">
                  <Plane className="h-6 w-6 text-leaf-600" />
                </div>
                <h3 className="text-xl font-bold">Itinerari</h3>
                <p className="text-center text-muted-foreground">
                  Crea itinerari dettagliati giorno per giorno e organizza tutte le tue attività.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-sand-100 p-3">
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
                    className="h-6 w-6 text-sand-600"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Profilo Personale</h3>
                <p className="text-center text-muted-foreground">
                  Salva i tuoi viaggi, preferenze e documenti nel tuo profilo personale.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-tree-100 p-3">
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
                    className="h-6 w-6 text-tree-600"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Budget</h3>
                <p className="text-center text-muted-foreground">
                  Gestisci il tuo budget di viaggio e tieni traccia di tutte le spese.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-sky-100 p-3">
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
                    className="h-6 w-6 text-sky-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Sicurezza</h3>
                <p className="text-center text-muted-foreground">
                  Informazioni sulla sicurezza e consigli utili per ogni destinazione.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-white">
                <div className="rounded-full bg-sun-100 p-3">
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
                    className="h-6 w-6 text-sun-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Informazioni Utili</h3>
                <p className="text-center text-muted-foreground">
                  Frasi utili, curiosità e consigli pratici per ogni destinazione.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pronto a partire?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Inizia a pianificare il tuo prossimo viaggio oggi stesso.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="bg-ocean-600 hover:bg-ocean-700">
                    Registrati ora
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Accedi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
