import { ReactNode } from "react";

export interface WindowModalProps {
  open: boolean;
  className: string;
  children: ReactNode;
  title: string;
  description: string;
  onClose(): void;
}
