import { buildAffiliateUrl } from "@/lib/affiliate"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function AffiliateButton({
  provider,
  label,
  params,
}: {
  provider: any
  label: string
  params: Record<string, string>
}) {
  const url = buildAffiliateUrl(provider, params)
  return (
    <Button asChild variant="secondary" size="sm">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label} <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    </Button>
  )
}
