// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note, Error>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id, // не робимо запит, поки id немає
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
