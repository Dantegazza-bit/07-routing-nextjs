// components/NotePreview/NotePreview.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    // повертаємось на маршрут, з якого відкрили модалку
    router.back();
  };

  if (isLoading) {
    return (
      <div className={css.wrapper}>
        <p className={css.message}>Loading...</p>
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className={css.wrapper}>
        <p className={css.message}>Failed to load note</p>
        <button type="button" className={css.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <button
        type="button"
        className={css.closeButton}
        onClick={handleClose}
        aria-label="Close"
      >
        ×
      </button>

      <h2 className={css.title}>{note.title}</h2>

      <div className={css.meta}>
        <span className={css.tag}>{note.tag}</span>
        <span className={css.date}>
          {new Date(note.createdAt).toLocaleString()}
        </span>
      </div>

      <p className={css.content}>{note.content}</p>
    </div>
  );
}
