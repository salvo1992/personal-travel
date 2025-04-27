import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Globe } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-ocean-600" />
            <span className="text-xl font-bold text-gradient">TravelDreams</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Informativa sui Cookie</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Cosa sono i cookie?</h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito
                web. Questi file contengono informazioni che vengono utilizzate per migliorare la tua esperienza di
                navigazione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Come utilizziamo i cookie</h2>
              <p>Utilizziamo i cookie per diversi scopi, tra cui:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Ricordare le tue preferenze e impostazioni</li>
                <li>Mantenere attiva la tua sessione durante la navigazione</li>
                <li>Raccogliere informazioni su come utilizzi il nostro sito</li>
                <li>Personalizzare i contenuti e le pubblicità in base ai tuoi interessi</li>
                <li>Analizzare il traffico del sito per migliorare le nostre funzionalità</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Tipi di cookie che utilizziamo</h2>

              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Cookie necessari</h3>
                  <p className="text-sm text-muted-foreground">
                    Questi cookie sono essenziali per il funzionamento del sito e non possono essere disattivati.
                    Consentono funzionalità di base come la navigazione e l'accesso alle aree protette del sito.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Cookie di preferenza</h3>
                  <p className="text-sm text-muted-foreground">
                    Questi cookie ci permettono di ricordare le tue preferenze e personalizzare la tua esperienza. Ad
                    esempio, possono ricordare la tua lingua preferita o la regione in cui ti trovi.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Cookie statistici</h3>
                  <p className="text-sm text-muted-foreground">
                    Questi cookie ci aiutano a capire come gli utenti interagiscono con il nostro sito raccogliendo
                    informazioni in forma anonima. Ci aiutano a migliorare il funzionamento del sito.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Cookie di marketing</h3>
                  <p className="text-sm text-muted-foreground">
                    Questi cookie vengono utilizzati per tracciare i visitatori sui siti web. L'intenzione è quella di
                    mostrare annunci pertinenti e coinvolgenti per il singolo utente.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Come gestire i cookie</h2>
              <p>
                Puoi gestire i cookie attraverso le impostazioni del tuo browser. Ogni browser ha procedure diverse per
                gestire le impostazioni dei cookie. Puoi trovare istruzioni specifiche nelle pagine di aiuto del tuo
                browser:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Safari</li>
                <li>Microsoft Edge</li>
                <li>Opera</li>
              </ul>
              <p className="mt-2">
                Tieni presente che la disabilitazione di alcuni cookie potrebbe influire sulla tua esperienza di
                navigazione e limitare alcune funzionalità del nostro sito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Modifiche alla nostra politica sui cookie</h2>
              <p>
                Possiamo aggiornare la nostra politica sui cookie di tanto in tanto. Ti invitiamo a rivedere
                periodicamente questa pagina per eventuali modifiche. Le modifiche entrano in vigore immediatamente dopo
                la pubblicazione sul sito web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contattaci</h2>
              <p>Se hai domande sulla nostra politica sui cookie, non esitare a contattarci.</p>
            </section>
          </div>

          <div className="mt-8">
            <Button asChild>
              <Link href="/">Torna alla home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
