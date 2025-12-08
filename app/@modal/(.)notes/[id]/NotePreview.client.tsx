// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

interface NotePreviewClientProps {
  params: {
    id: string;
  };
}

export default function NotePreviewClient({ params }: NotePreviewClientProps) {
  const router = useRouter();
  const { id } = params;

  const handleClose = () => {
    // повертаємось на маршрут, з якого відкрили модалку
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading...</p>}

      {(isError || !note) && !isLoading && <p>Failed to load note.</p>}

      {!isLoading && !isError && note && (
        <NotePreview note={note} onClose={handleClose} />
      )}
    </Modal>
  );
}
