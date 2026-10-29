"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Braces, LockKeyhole } from "lucide-react";
import { identity } from "@/data/portfolio";
import { copy } from "@/data/interface-copy";
import { resolvePortfolioRoute } from "@/lib/portfolio-routes";
import { RequestBar } from "@/presentation/shared/components/request-bar";
import { ResponsePanel } from "@/presentation/shared/components/response-panel";

export function HttpWorkspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [completed, setCompleted] = useState({ pathname: "", count: 0 });
  const response = resolvePortfolioRoute(pathname);
  const sent = completed.pathname === pathname;

  return (
    <main className="http-workspace">
      <RequestBar
        endpoint={response.endpoint}
        onSend={() =>
          setCompleted((previous) => ({ pathname, count: previous.count + 1 }))
        }
      />
      <ResponsePanel response={response}>{children}</ResponsePanel>
      <footer className="workspace-footer">
        <span
          className="request-feedback"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="status-dot" />
          {sent ? `${copy.processed} · #${completed.count}` : copy.ready}
          <span className="mobile-simulation">· {copy.simulated}</span>
          <span className="sr-only">
            {sent ? ` GET https://${identity.domain}${response.endpoint}` : ""}
          </span>
        </span>
        <span className="footer-format">
          <LockKeyhole size={11} aria-hidden="true" />
          {copy.noNetwork}
          <span className="footer-divider" />
          <Braces size={12} aria-hidden="true" />
          {copy.responseType}
        </span>
      </footer>
    </main>
  );
}
