import type { Note } from "@/App"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

interface NoteCardProps {
  key:string
  id: string
  data: Note
}

export default function NoteCard({ id, data }: NoteCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/${id}`)}
      className="cursor-pointer h-full transition-colors hover:border-primary bg-white dark:bg-gray-800"
    >
      <CardHeader>
        <CardTitle className="line-clamp-1 text-gray-900 dark:text-white">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{data.body}</p>
      </CardContent>
      {data.tags.length > 0 && (
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {tag.label}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

