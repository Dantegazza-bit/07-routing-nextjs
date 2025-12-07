// app/notes/filter/layout.tsx
import type { ReactNode } from "react";
import LayoutNotes from "@/components/LayoutNotes/LayoutNotes";

interface FilterLayoutProps {
  children: ReactNode;
  modal: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({
  children,
  modal,
  sidebar,
}: FilterLayoutProps) {
  return (
    <LayoutNotes sidebar={sidebar} modal={modal}>
      {children}
    </LayoutNotes>
  );
}
