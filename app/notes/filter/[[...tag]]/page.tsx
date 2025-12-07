// app/notes/filter/[[...tag]]/page.tsx
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

interface RouteParams {
  tag?: string[];
}

interface FilterPageProps {
  // У Next 16 params приходить як Promise
  params: Promise<RouteParams>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  // ✅ Розгортаємо проміс
  const { tag: tagSegments } = await params;

  // /notes/filter/Work -> "Work"
  const rawTag = tagSegments?.[0] ?? "all";

  // бекенд не чекає "all"
  const tag = rawTag === "all" ? undefined : rawTag;

  const { notes } = await fetchNotes({
    page: 1,
    perPage: 10,
    tag,
  });

  // НОВЕ: передаємо базовий шлях для деталей
  return <NoteList notes={notes} detailsBasePath={`/notes/filter/${rawTag}`} />;
}
