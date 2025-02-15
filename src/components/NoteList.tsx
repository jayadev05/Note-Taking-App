"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMemo, useState } from "react"
import { Note, Tag } from "@/App"
import ReactSelect from "react-select/creatable"
import NoteCard from "./NoteCard"
import DarkThemeToggle from "@/utils/DarkThemeToggle"
import { EditTagsModal } from "./EditTagsModal"
import { PlusCircle, Search, TagIcon, Sparkles } from 'lucide-react'
import { motion, useScroll, useTransform } from "framer-motion"

type NoteListProps = {
  availableTags: Tag[] | null
  notes: Note[] | null
  updateTag: (id: string, label: string) => void
  deleteTag: (id: string) => void
}

function NoteList({ availableTags, notes, updateTag, deleteTag }: NoteListProps) {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const { scrollY } = useScroll()
  
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95])

  const filteredNotes = useMemo(() => {
    return notes?.filter(
      (note) =>
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
    )
  }, [notes, selectedTags, title])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 selection:bg-primary/20 selection:text-primary">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10 dark:via-gray-950 dark:to-gray-950" />
      
      {/* Noise Texture */}
      <div className="fixed inset-0 bg-noise opacity-[0.015] dark:opacity-[0.025]" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      {/* Gradient Orbs */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full blur-[128px] dark:blur-[196px]" />
      <div className="fixed bottom-0 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-[128px] dark:blur-[196px]" />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Header Section */}
          <motion.div 
            style={{ opacity: headerOpacity, scale: headerScale }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 sticky top-0 z-50 pt-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/50 to-primary flex items-center justify-center shadow-xl shadow-primary/20"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/50">
                  Notes
                </h1>
                <p className="text-muted-foreground mt-1">
                  {filteredNotes?.length || 0} notes available
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <DarkThemeToggle className="h-10 w-10 hover:scale-110 transition-transform me-10" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/new")}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-white dark:text-black flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-shadow duration-300"
                  size="lg"
                >
                  <PlusCircle className="h-5 w-5" />
                  Create Note
                </Button>
              </motion.div>
              <EditTagsModal
                tags={availableTags ?? []}
                onUpdate={updateTag}
                onDelete={deleteTag}
              />
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-transparent rounded-3xl" />
            <div className="relative grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search by Title
                </label>
                <Input
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Search notes..."
                  className="w-full bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <TagIcon className="h-4 w-4" />
                  Filter by Tags
                </label>
                <ReactSelect
                  isMulti
                  options={availableTags?.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select tags..."
                  value={selectedTags.map((tags) => ({
                    label: tags.label,
                    value: tags.id,
                  }))}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => ({
                        label: tag.label,
                        id: tag.value,
                      }))
                    )
                  }}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: 'var(--primary)',
                      primary75: 'var(--primary-foreground)',
                      primary50: 'var(--primary-foreground)',
                      primary25: 'var(--primary-foreground)',
                    },
                  })}
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: 'var(--background)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? 'var(--primary)'
                        : 'transparent',
                      color: state.isFocused
                        ? 'var(--primary-foreground)'
                        : 'var(--foreground)',
                    }),
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Notes Grid */}
          {filteredNotes && filteredNotes.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr"
            >
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  variants={item}
                  className="group relative"
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      rotateX: 2,
                      rotateY: 5,
                      translateY: -8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition duration-500" />
                    <div className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-2xl p-1">
                      <NoteCard key={note.id} id={note.id} data={note} />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No notes found. Create your first note!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteList
