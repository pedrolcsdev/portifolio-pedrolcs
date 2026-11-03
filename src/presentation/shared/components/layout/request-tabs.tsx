"use client";

import Link from "next/link";
import { cn } from "cn";
import { copy } from "@/data/interface-copy";
import { portfolioRoutes } from "@/lib/portfolio-routes";
import type { Section } from "@/types/portfolio";

export function RequestTabs({ section }: { section: Section | null }) {
  return (
    <nav
      className="request-navigation request-tabs-strip"
      aria-label={copy.navigation}
    >
      {portfolioRoutes.map((route) => (
        <div
          className={cn(
            "request-tab",
            section === route.section && "is-active",
          )}
          key={route.href}
        >
          <Link
            href={route.href}
            aria-current={section === route.section ? "page" : undefined}
            aria-label={route.label}
          >
            <span className="tab-method">GET</span>
            <span className="tab-route">{route.label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}
