import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ToolCardProps {
  name: string
  description: string
  icon: LucideIcon
  category: string
  isPopular?: boolean
  isNew?: boolean
  href?: string
}

export function ToolCard({ name, description, icon: Icon, category, isPopular, isNew, href }: ToolCardProps) {
  const ButtonContent = (
    <>
      Open Tool
      <ArrowRight className="ml-2 h-4 w-4" />
    </>
  )

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-none bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        {/* Badges */}
        <div className="absolute right-4 top-4 flex gap-2">
          {isPopular && (
            <Badge className="rounded-full bg-[#FFA146]/20 text-[#FFA146] border-none">
              <Star className="mr-1 h-3 w-3" />
              Popular
            </Badge>
          )}
          {isNew && <Badge className="rounded-full bg-[#27C46B]/20 text-[#27C46B] border-none">New</Badge>}
        </div>

        {/* Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 transition-colors group-hover:bg-primary">
          <Icon className="h-7 w-7 text-[#AAC4F5] group-hover:text-primary-foreground transition-colors" />
        </div>

        {/* Category */}
        <Badge
          variant="secondary"
          className="mb-2 rounded-full bg-secondary text-xs font-medium text-secondary-foreground"
        >
          {category}
        </Badge>

        {/* Content */}
        <h3 className="mb-2 text-lg font-bold text-foreground">{name}</h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Button */}
        {href ? (
          <Link href={href} className="w-full">
            <Button
              variant="ghost"
              className="w-full rounded-xl bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {ButtonContent}
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            className="w-full rounded-xl bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {ButtonContent}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
