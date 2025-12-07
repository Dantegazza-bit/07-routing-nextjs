// components/Modal/Modal.tsx
"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back(); // повертаємось на попередню сторінку
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  // SSR-запобіжник
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
