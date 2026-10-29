"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { copy } from "@/data/interface-copy";
import { Button } from "@/presentation/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/presentation/shared/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="theme-toggle"
          aria-label={`${copy.lightTheme} / ${copy.darkTheme}`}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <Sun className="hidden dark:block" aria-hidden="true" />
          <Moon className="dark:hidden" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="hidden dark:inline">{copy.lightTheme}</span>
        <span className="dark:hidden">{copy.darkTheme}</span>
      </TooltipContent>
    </Tooltip>
  );
}
