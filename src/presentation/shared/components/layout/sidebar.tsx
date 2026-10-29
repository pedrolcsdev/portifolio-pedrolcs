"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  ChevronRight,
  FolderCode,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import { identity } from "@/data/portfolio";
import { copy } from "@/data/interface-copy";
import { getActiveSection, portfolioRoutes } from "@/lib/portfolio-routes";
import { cn } from "@/lib/utils";

const icons = {
  home: House,
  projects: FolderCode,
  about: UserRound,
  contact: Mail,
};

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const active = getActiveSection(usePathname());

  return (
    <div className="sidebar-content">
      <Link
        href="/"
        className="brand"
        onClick={onNavigate}
        aria-label={`${identity.domain} — Home`}
      >
        <Box size={23} strokeWidth={1.5} aria-hidden="true" />
        <span>{identity.domain}</span>
      </Link>
      <div className="collection-label">
        {copy.collection}
        <span>04</span>
      </div>
      <nav aria-label={copy.navigation} className="navigation">
        {portfolioRoutes.map(({ section, label, href }) => {
          const Icon = icons[section];
          const selected = active === section;
          return (
            <Link
              href={href}
              key={section}
              onClick={onNavigate}
              aria-current={selected ? "page" : undefined}
              className={cn("nav-link", selected && "is-active")}
            >
              <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
              <span className="nav-label">
                {label}
                <span className="nav-path">{href}</span>
              </span>
              {selected ? (
                <ChevronRight
                  size={13}
                  className="nav-arrow"
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-bottom">
        <span className="sidebar-symbol" aria-hidden="true">{`{ }`}</span>
        <p>{identity.role}</p>
        <span>{identity.tagline}</span>
      </div>
    </div>
  );
}
