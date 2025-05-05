import { Building } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  href?: string
}

export function Logo({ href = "/" }: LogoProps) {
  const logo = (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded bg-[#6b61d2]">
        <Building className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold text-white">ROOM.ME</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{logo}</Link>
  }

  return logo
}
