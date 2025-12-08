// app/@modal/(.)notes/[id]/page.tsx
import NotePreviewClient from "./NotePreview.client";

export default function ModalNotePage() {
  // Просто рендеримо клієнтський компонент.
  // Він сам дістає id з URL через useParams.
  return <NotePreviewClient />;
}
