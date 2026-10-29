"use client";

import { useState } from "react";
import { Box, Menu } from "lucide-react";
import { identity } from "@/data/portfolio";
import { copy } from "@/data/interface-copy";
import { Sidebar } from "@/presentation/shared/components/layout/sidebar";
import { ThemeToggle } from "@/presentation/shared/components/theme-toggle";
import { Button } from "@/presentation/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/presentation/shared/components/ui/sheet";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="workspace-header">
      <div className="header-leading">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label={copy.openNavigation}
            >
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="mobile-sheet">
            <SheetHeader className="sr-only">
              <SheetTitle>{identity.domain}</SheetTitle>
              <SheetDescription>{copy.collectionDescription}</SheetDescription>
            </SheetHeader>
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>
        <Box size={15} className="header-icon" aria-hidden="true" />
        <span className="desktop-workspace">{copy.workspace}</span>
        <span className="mobile-brand">{identity.domain}</span>
        <span className="header-slash" aria-hidden="true">
          /
        </span>
        <span className="header-collection">{copy.collection}</span>
      </div>
      <div className="header-actions">
        <span className="local-indicator">
          <span />
          {copy.localResponse}
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
