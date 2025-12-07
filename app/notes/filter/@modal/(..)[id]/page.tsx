// app/notes/filter/@modal/(..)[id]/page.tsx
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface ModalNotePageProps {
  // У Next 16 params приходить як Promise
  params: Promise<{ id: string }>;
}

export default async function ModalNotePage({ params }: ModalNotePageProps) {
  // РОЗГОРТАЄМО проміс, щоб отримати нормальний id
  const { id } = await params;

  return (
    <Modal>
      <NotePreview id={id} />
    </Modal>
  );
}
