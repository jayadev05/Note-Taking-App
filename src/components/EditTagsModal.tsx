import { Tag } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type EditTagsModalProps = {
  tags: Tag[];
  onUpdate: (id: string, label: string) => void;
  onDelete: (id: string) => void;
};

export function EditTagsModal({ tags, onUpdate, onDelete }: EditTagsModalProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent, tagId: string) => {
    e.preventDefault();  // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling
    onDelete(tagId);
  };

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>, tagId: string) => {
    onUpdate(tagId, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);  // Close dialog only on save
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black dark:text-white">Edit Tags</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader >
          <DialogTitle >Edit Tags</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {tags.map(tag => (
            <div key={tag.id} className="flex items-center gap-2">
              <Input
                type="text"
                defaultValue={tag.label}
                className="flex-1"
                onChange={(e) => handleUpdate(e, tag.id)}
              />
              <Button
                type="button"
                variant="ghost"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                onClick={(e) => handleDelete(e, tag.id)}
              >
                ×
              </Button>
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}