// components/LayoutNotes/LayoutNotes.tsx
"use client";

import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface LayoutNotesProps {
  children: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}

// ⚠️ ВАЖЛИВО: саме default export
export default function LayoutNotes({
  children,
  sidebar,
  modal,
}: LayoutNotesProps) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
      {modal}
    </div>
  );
}
