
import NoteForm from './NoteForm'
import { NoteData, Tag } from '@/App'

type NewNotesProps ={
  onSubmit : (data: NoteData)=> void,
  onAddTag:(tag:Tag)=>void,
  availableTags:Tag[] | null

}


function NewNotes({onSubmit,onAddTag,availableTags}:NewNotesProps) {
  return (
    <div className='w-full lg:px-16 px-4 py-4 dark:bg-gray-900 min-h-screen'>
     <h1 className='text-2xl mb-4'>New Notes</h1>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
   
}

export default NewNotes