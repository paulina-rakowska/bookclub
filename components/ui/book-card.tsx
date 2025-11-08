import { Star, Heart, MessageCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from 'next/image'

interface Author {
  id: string
  firstName: string
  lastName: string
}

interface BookCardProps {
  id: string
  title: string
  author: Author[]
  category: string
  cover: boolean
  description: string
}

export function BookCard({
  id,
  title,
  author,
  category,
  cover,
  description,
}: BookCardProps) {
  // Format authors as "FirstName LastName, FirstName LastName"
  const authors= author.map(a => `${a.firstName} ${a.lastName}`).join(', ');
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link key={id} href={`/book/${id}`} className="relative">
        <div className="p-4 aspect-[3/4] overflow-hidden">
          <Image
                src={cover?  `/images/books/${id}/book-300x432.webp` : "/placeholders/book-placeholder.webp"}
                alt={`${title} cover`}
                width={300}
                height={432}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
        </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {category.map((cat)=> {
              return cat.name;
            })}
          </Badge>

          <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-balance">{title}</h3>

          <p className="text-muted-foreground text-sm">by {authors}</p>


          <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{description}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          View Details
        </Button>
      </CardFooter>
      </Link>
    </Card>
  )
}
