import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Globe } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-6">Termini e Condizioni</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Introduzione</h2>
              <p>
                Benvenuto su TravelDreams. I presenti Termini e Condizioni regolano l'utilizzo del nostro sito web e dei
                servizi offerti. Utilizzando il nostro sito, accetti di essere vincolato da questi termini. Se non
                accetti questi termini, ti preghiamo di non utilizzare il nostro sito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Definizioni</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>"Noi", "nostro", "ci" si riferisce a TravelDreams.</li>
                <li>"Tu", "tuo" si riferisce all'utente del nostro sito.</li>
                <li>"Sito" si riferisce al sito web TravelDreams e a tutti i suoi contenuti.</li>
                <li>"Servizi" si riferisce a tutti i servizi offerti attraverso il nostro sito.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Utilizzo del sito</h2>
              <p>L'utilizzo del nostro sito è soggetto alle seguenti condizioni:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Devi avere almeno 18 anni o l'età legale nel tuo paese per utilizzare il nostro sito.</li>
                <li>Sei responsabile di mantenere la riservatezza delle tue credenziali di accesso.</li>
                <li>Non puoi utilizzare il nostro sito per scopi illegali o non autorizzati.</li>
                <li>Non puoi trasmettere virus o codice dannoso attraverso il nostro sito.</li>
                <li>Non puoi tentare di accedere a dati o aree riservate del nostro sito senza autorizzazione.</li>
              </ul>
              <p className="mt-2">
                Ci riserviamo il diritto di limitare o sospendere l'accesso al nostro sito a qualsiasi utente che violi
                questi termini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Account utente</h2>
              <p>
                Quando crei un account sul nostro sito, devi fornire informazioni accurate, complete e aggiornate. Sei
                responsabile di tutte le attività che si verificano sotto il tuo account. Devi informarci immediatamente
                di qualsiasi uso non autorizzato del tuo account o di qualsiasi altra violazione della sicurezza.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Proprietà intellettuale</h2>
              <p>
                Tutti i contenuti presenti sul nostro sito, inclusi testi, grafica, logo, immagini, audio, video e
                software, sono di nostra proprietà o dei nostri licenziatari e sono protetti dalle leggi sul copyright e
                sulla proprietà intellettuale. Non puoi riprodurre, distribuire, modificare, creare opere derivate,
                pubblicare, vendere o sfruttare in alcun modo i contenuti del nostro sito senza il nostro esplicito
                consenso scritto.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Limitazione di responsabilità</h2>
              <p>
                Il nostro sito e i suoi contenuti sono forniti "così come sono" e "come disponibili". Non garantiamo che
                il nostro sito sarà sempre disponibile, ininterrotto, tempestivo, sicuro o privo di errori. Non siamo
                responsabili per eventuali perdite o danni derivanti dall'utilizzo o dall'impossibilità di utilizzare il
                nostro sito o i suoi contenuti.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Indennizzo</h2>
              <p>
                Accetti di indennizzare, difendere e tenere indenni noi, i nostri affiliati, funzionari, agenti, partner
                e dipendenti da qualsiasi reclamo, responsabilità, danno, perdita e spesa, incluse ragionevoli spese
                legali, derivanti da o in qualsiasi modo connessi al tuo utilizzo del nostro sito, alla violazione di
                questi Termini o alla violazione di qualsiasi diritto di terzi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Modifiche ai termini</h2>
              <p>
                Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche entreranno in
                vigore immediatamente dopo la pubblicazione sul nostro sito. È tua responsabilità rivedere regolarmente
                questi Termini. L'uso continuato del nostro sito dopo la pubblicazione delle modifiche costituisce
                l'accettazione di t nostro sito dopo la pubblicazione delle modifiche costituisce l'accettazione di tali
                modifiche. Ti invitiamo a consultare regolarmente questa pagina per rimanere aggiornato sui nostri
                Termini e Condizioni.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Legge applicabile</h2>
              <p>
                Questi Termini sono regolati e interpretati in conformità con le leggi italiane, senza riguardo ai suoi
                principi di conflitto di leggi. Qualsiasi controversia derivante da o relativa a questi Termini sarà
                soggetta alla giurisdizione esclusiva dei tribunali italiani.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contattaci</h2>
              <p>Se hai domande sui nostri Termini e Condizioni, non esitare a contattarci.</p>
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
