import { Navigate, Route, Routes } from "react-router-dom"

import ViewNotes from "./components/ViewNotes"
import NewNotes from "./components/NewNotes"
import UseLocalStorage from "./hooks/UseLocalStorage"
import { useMemo } from "react"
import { v4 } from "uuid"
import NoteList from "./components/NoteList"
import { NoteLayout } from "./components/NoteLayout"
import { EditNotes } from "./components/EditNotes"
import { Toaster, toast } from 'react-hot-toast';



export type Note = NoteData & {
  id:string
}

export type RawNote = RawNoteData & {
  id:string
}

export type  NoteData={
  title:string,
  body:string,
  tags:Tag[]
}
export type  RawNoteData={
  title:string,
  body:string,
  tagIds:string[]
}

export type Tag = {
  id:string,
  label:string

}

function App() {

  const [notes,setNotes]= UseLocalStorage<RawNote[]> ("Notes",[])
  const [tags,setTags]= UseLocalStorage<Tag[]> ("Tags",[])

  const noteWithTags = useMemo(() => {
    return (notes ?? []).map(note => ({
      ...note,
      tags: tags?.filter(tag => note.tagIds.includes(tag.id)) ?? [],
    }));
  }, [notes, tags]);
  
  

  const onCreateNote=({tags,...data}:NoteData)=>{
    setNotes((prevNotes)=> (
      [...(prevNotes || []),{...data,id:v4(), tagIds: tags.map(tag=> tag.id)}]
     ));
     toast.success("Note created sucessfully🗒️")
  }

  const onUpdateNote=(id:string,{tags,...data}:NoteData)=>{
    
    setNotes((prevNotes)=>{
      if (!prevNotes) return prevNotes;

      return prevNotes?.map((note)=>{
        if(note.id===id){
          return {...note,...data,tagIds:tags.map(tag=> tag.id)}
        }
          return note
      })
    })

    toast.success("Note Updated sucessfully🗒️");

  }

  const onDelete=(id:string)=>{
    setNotes(prevNotes=>{
      if(!prevNotes) return prevNotes
      return prevNotes?.filter((note)=> note.id!==id)
    })

    toast.success("Note deleted sucessfully 🗒️")
  
  }

  const addTag =(tag:Tag)=>{
    setTags( (prev) => ([...(prev || []),tag]))
    toast.success("Tag created sucessfully🗒️")
  }

  const updateTag =(id:string,label:string)=>{
    setTags(prevTags=>{
      if(!prevTags) return prevTags;

      return prevTags.map(tag=> {
        if(tag.id===id){
          return {...tag,label}
        }
        return tag
      })
    })
    toast.success("Tag updated sucessfully🗒️")
  }

  const deleteTag =(id:string)=>{
  setTags(prevTags=>{
    if(!prevTags) return prevTags;
    return prevTags.filter(tag=> tag.id!==id)
  })
} 
  
 return ( 
  <div className="min-h-screen flex flex-col ">
   
     <Toaster/>

     <Routes>

{/* home page */}
<Route path='/' element={<NoteList availableTags={tags} notes={noteWithTags} updateTag={updateTag} deleteTag={deleteTag}/>}></Route>
<Route path='/new' element={<NewNotes onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}     />}></Route>

{/* wildcard page */}
<Route path='*' element={<Navigate to={'/'}/>}></Route>  

{/* view and edit page */}
<Route path='/:id' element={<NoteLayout notes={noteWithTags}/>}>
  <Route index element={<ViewNotes onDelete={onDelete}/>}></Route>
  <Route path='edit' element={<EditNotes onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags}/>}></Route>
</Route>

</Routes>
  </div>

 )
  
}


export default App
