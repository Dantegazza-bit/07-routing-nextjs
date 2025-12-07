"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import css from "./SidebarNotes.module.css";

const FILTERS = [
  { label: "All notes", tag: "all" },
  { label: "Work", tag: "Work" },
  { label: "Personal", tag: "Personal" },
  { label: "Shopping", tag: "Shopping" },
  { label: "Todo", tag: "Todo" },
  { label: "Meeting", tag: "Meeting" },
];

export default function SidebarNotes() {
  const pathname = usePathname();

  // ми на сторінці /notes/filter/...
  const isFilterPage = pathname.startsWith("/notes/filter");

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Sidebar with filters</h2>

      <ul className={css.list}>
        {FILTERS.map(({ label, tag }) => {
          const href = `/notes/filter/${tag}`;
          const isActive = isFilterPage && pathname === href;

          return (
            <li key={tag}>
              <Link
                href={href}
                className={isActive ? css.linkActive : css.link}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
