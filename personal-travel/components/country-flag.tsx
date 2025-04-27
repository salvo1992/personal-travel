interface CountryFlagProps {
  countryCode: string
  countryName: string
}

export function CountryFlag({ countryCode, countryName }: CountryFlagProps) {
  return (
    <div className="flex items-center gap-2 border-l pl-4">
      <img
        src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
        width="20"
        height="15"
        alt={countryName}
        className="rounded"
      />
      <span className="font-medium">{countryName}</span>
    </div>
  )
}
