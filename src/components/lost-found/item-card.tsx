import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

interface ItemCardProps {
  id: string
  name: string
  image: string
  location: string
  timePosted: string
  status: "lost" | "found" | "returned"
  description?: string
}

const statusStyles = {
  lost: { bg: "bg-[#DC2626]/10", text: "text-[#DC2626]", label: "Lost" },
  found: { bg: "bg-[#16A34A]/10", text: "text-[#16A34A]", label: "Found" },
  returned: { bg: "bg-[#0077C0]/20", text: "text-[#0077C0]", label: "Returned" },
}

export function ItemCard({ name, image, location, timePosted, status }: ItemCardProps) {
  const statusStyle = statusStyles[status]

  return (
    <Card className="group overflow-hidden rounded-2xl border-none bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <Badge className={`absolute right-3 top-3 rounded-full border-none ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1">{name}</h3>

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{timePosted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
