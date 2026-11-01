import { Box } from "lucide-react";
import { identity } from "@/data/portfolio";
import { ThemeToggle } from "@/presentation/shared/components/theme-toggle";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="workspace-header">
      <div className="window-controls" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="brand">
        <Box size={29} strokeWidth={1.5} aria-hidden="true" />
        <span>{identity.domain}</span>
      </div>
      {children}
      <ThemeToggle />
    </header>
  );
}
