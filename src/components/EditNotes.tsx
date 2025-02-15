
import NoteForm from './NoteForm'
import { NoteData, Tag } from '@/App'
import { useNote } from './NoteLayout'

type EditNotesProps ={
  onSubmit : (id:string,data: NoteData)=> void,
  onAddTag:(tag:Tag)=>void,
  availableTags:Tag[] | null

}


export function EditNotes({onSubmit,onAddTag,availableTags}:EditNotesProps) {

  const note = useNote()

  return (
    <div className='lg:px-16 px-4 min-h-screen dark:bg-gray-900 pt-4'>
     <h1 className='text-2xl mb-4'>Edit Notes</h1>
    <NoteForm title={note.title} body={note.body} tags={note.tags} onSubmit={data=> onSubmit(note.id,data)} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
   
}

