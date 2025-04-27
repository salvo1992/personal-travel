import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Globe } from "lucide-react"

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-6">Informativa sulla Privacy</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Introduzione</h2>
              <p>
                La presente Informativa sulla Privacy descrive come raccogliamo, utilizziamo e condividiamo i tuoi dati
                personali quando utilizzi il nostro sito web e i nostri servizi. Rispettiamo la tua privacy e ci
                impegniamo a proteggere i tuoi dati personali in conformità con le leggi applicabili sulla protezione
                dei dati.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Dati che raccogliamo</h2>
              <p>Possiamo raccogliere diversi tipi di informazioni, tra cui:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Informazioni di identificazione personale (nome, indirizzo email, numero di telefono)</li>
                <li>Informazioni di pagamento</li>
                <li>Informazioni sul dispositivo e sulla connessione</li>
                <li>Dati di utilizzo e navigazione</li>
                <li>Preferenze e interessi</li>
                <li>Feedback e recensioni</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Come utilizziamo i tuoi dati</h2>
              <p>Utilizziamo i tuoi dati personali per:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fornirti i nostri servizi e gestire il tuo account</li>
                <li>Elaborare i tuoi pagamenti</li>
                <li>Comunicare con te riguardo al tuo account o ai nostri servizi</li>
                <li>Personalizzare la tua esperienza sul nostro sito</li>
                <li>Migliorare i nostri servizi e sviluppare nuove funzionalità</li>
                <li>Prevenire frodi e garantire la sicurezza del nostro sito</li>
                <li>Rispettare i nostri obblighi legali</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Condivisione dei dati</h2>
              <p>Possiamo condividere i tuoi dati personali con:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fornitori di servizi che ci aiutano a gestire il nostro business</li>
                <li>Partner commerciali con cui collaboriamo per offrirti servizi specifici</li>
                <li>Autorità pubbliche quando richiesto dalla legge</li>
                <li>Terze parti in caso di fusione, acquisizione o vendita di asset</li>
              </ul>
              <p className="mt-2">Non vendiamo i tuoi dati personali a terze parti.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">I tuoi diritti</h2>
              <p>In base alle leggi sulla protezione dei dati, hai diritto a:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Accedere ai tuoi dati personali</li>
                <li>Rettificare i tuoi dati personali se sono inesatti</li>
                <li>Cancellare i tuoi dati personali in determinate circostanze</li>
                <li>Limitare o opporti al trattamento dei tuoi dati personali</li>
                <li>Ricevere i tuoi dati in un formato strutturato (portabilità dei dati)</li>
                <li>Revocare il consenso in qualsiasi momento</li>
                <li>Presentare un reclamo a un'autorità di controllo</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Sicurezza dei dati</h2>
              <p>
                Adottiamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati personali
                da perdita, uso improprio, accesso non autorizzato, divulgazione, alterazione o distruzione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Modifiche alla nostra Informativa sulla Privacy</h2>
              <p>
                Possiamo aggiornare la nostra Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali
                modifiche pubblicando la nuova Informativa sulla Privacy su questa pagina e, se le modifiche sono
                significative, ti invieremo una notifica.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Contattaci</h2>
              <p>
                Se hai domande sulla nostra Informativa sulla Privacy o sul trattamento dei tuoi dati personali, non
                esitare a contattarci.
              </p>
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
