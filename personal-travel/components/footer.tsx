import Link from "next/link"
import { Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="https://ilvikingodelweb.com" className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-ocean-600" />
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Il Vikingo del Web</p>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Termini
          </Link>
          <Link href="/cookies" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Cookie
          </Link>
        </div>
      </div>
    </footer>
  )
}
