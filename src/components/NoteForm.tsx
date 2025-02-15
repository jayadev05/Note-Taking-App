
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "@/App";
import CreatableSelect from 'react-select/creatable';
import { v4 } from "uuid";


type NoteFormProps ={
 onSubmit: (data:NoteData)=>void
 onAddTag:(tag:Tag)=>void,
 availableTags:Tag[] | null
} & Partial <NoteData>

function NoteForm({onSubmit,onAddTag,availableTags,body='',title='',tags=[]} : NoteFormProps) {

  const navigate = useNavigate();

  const[selectedTags,setSelectedTags] = useState<Tag[]>(tags)

  const titleRef  = useRef<HTMLInputElement | null>(null)
  const textareaRef  = useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit =(e:FormEvent)=>{
    e.preventDefault();

    onSubmit({
      title:titleRef.current!.value,
      body:textareaRef.current!.value ,
      tags :selectedTags
    })
    
    navigate('/')

  }

  

  return (
    <form onSubmit={handleSubmit} className="w-full">

      {/* row 1 */}

      <div className="flex w-full gap-4 items-center mb-4 ">

        <div className="form-group w-full space-y-2  ">
          <label htmlFor="title">Title :</label>
          <input
            name="title"
            id="title"
            type="text"
            ref={titleRef}
            defaultValue={title}
            required
            className="text-black dark:bg-gray-800 dark:text-white ps-2 border border-gray-700 w-full h-9 rounded-md "
          />
        </div>

        <div className="form-group w-full space-y-2 ">
          <label htmlFor="tags">Tags :</label>
          <CreatableSelect 
          isMulti 

          options={availableTags?.map((tag)=> ({
            label:tag.label,
            value:tag.id
          }))}

          className="react-select-container "
          classNamePrefix="react-select"
          placeholder="Select tags..."

          value={selectedTags.map((tags)=>({
            label:tags.label,
            value:tags.id 
          }))}

          onCreateOption={label=> {
            const newTag = {id:v4(),label}
            onAddTag(newTag)
            setSelectedTags ( prev => ([...prev,newTag]))
          }}

        onChange={(tags)=>{
          setSelectedTags(tags.map((tag)=>({
            label:tag.label,
            id:tag.value
          })))

        } }
          
          
          />
          
        </div>
      </div>

      {/* row 2 */}

      <div className="form-group w-full space-y-2 ">
        <label htmlFor="body">Body :</label>
        <textarea
          name="body"
          id="body"
          ref={textareaRef}
          required
          rows={20}
          defaultValue={body}
          className="text-black dark:bg-gray-800 dark:text-white ps-2 w-full rounded-lg "
        />
      </div>

      {/* row 3 */}

      <div className="flex justify-between space-y-4 items-center">
        <Button onClick={()=>navigate('/')} className=" underline text-white bg-transparent hover:bg-transparent hover:decoration-blue-500 ">Cancel</Button>
        <Button  className="bg-blue-500 text-white">Save</Button>
      </div>


    </form>
  );
}

export default NoteForm;
