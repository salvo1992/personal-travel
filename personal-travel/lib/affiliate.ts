export const buildAffiliateUrl = (
    provider: "booking" | "airbnb" | "ryanair" | "skyscanner" | "thefork",
    params: Record<string, string>,
  ) => {
    const affId = process.env[`NEXT_PUBLIC_AFF_${provider.toUpperCase()}`]! ?? (() => { 
      throw new Error(`Affiliate ID for provider ${provider} is not defined in environment variables.`); 
    })();
    switch (provider) {
      case "booking":
        return `https://www.booking.com/index.html?aid=${affId}&dest_id=${params.destId}`
      case "airbnb":
        return `https://www.airbnb.it/s/${params.city}/homes?c=.pi0.pk${affId}`
      case "ryanair":
        return `https://www.ryanair.com/flights/${params.from}/${params.to}?afid=${affId}`
      case "skyscanner":
        return `https://partner.skyscanner.it/r.php?tracking=${affId}&destination=${params.city}`
      case "thefork":
        return `https://www.thefork.it/restaurants/${params.city}?cc=${affId}`
      default:
        return "#"
    }
  }
  