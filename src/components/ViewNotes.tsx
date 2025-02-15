
import { useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { getSummary } from "@/api/getSummary";


type ViewNoteProps = {
  onDelete: (id: string) => void
}

const ViewNotes = ({ onDelete }: ViewNoteProps) => {
  const navigate = useNavigate();
  const note = useNote();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);

  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSummary = async(text:string)=>{
   const result = await getSummary(text);
   setSummary(result);
  
  }

  
  const themeClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const buttonBaseClass = "px-6 py-2 rounded-md transition-all duration-200 hover:opacity-90";

  return (
    <div className={`min-h-screen p-8 ${themeClass}`}>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Side */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="bg-orange-400 p-2 rounded" onClick={()=>handleSummary(note.body)}>summarise</button>
            
            <button
              onClick={() => navigate(`/${note.id}/edit`)}
              className={`${buttonBaseClass} ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Edit
            </button>
            
            <button
              onClick={() => onDelete(note.id)}
              className={`${buttonBaseClass} ${
                isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              Delete
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className={`${buttonBaseClass} ${
                isDarkMode 
                  ? 'border border-gray-600 hover:bg-gray-800' 
                  : 'border border-gray-300 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
          </div>
        </div>

        {/* Markdown Content */}
        <div className={`prose max-w-none ${
          isDarkMode ? 'prose-invert' : ''
        }`}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}
          >
            {note.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;