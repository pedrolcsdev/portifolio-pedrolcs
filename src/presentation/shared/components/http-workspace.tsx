"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { copy } from "@/data/interface-copy";
import {
  resolvePortfolioEndpoint,
  resolvePortfolioRoute,
} from "@/lib/portfolio-routes";
import { Header } from "@/presentation/shared/components/layout/header";
import { RequestTabs } from "@/presentation/shared/components/layout/request-tabs";
import { RequestBar } from "@/presentation/shared/components/request-bar";
import { ResponsePanel } from "@/presentation/shared/components/response-panel";

export function HttpWorkspace({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [completed, setCompleted] = useState({
    pathname: "",
    count: 0,
    endpoint: "",
  });
  const [requestError, setRequestError] = useState<{
    pathname: string;
    response: ReturnType<typeof resolvePortfolioRoute>;
  } | null>(null);
  const routeResponse = resolvePortfolioRoute(pathname);
  const response =
    requestError?.pathname === pathname ? requestError.response : routeResponse;

  function sendRequest(resource: string) {
    const { pathname: targetPath, response: targetResponse } =
      resolvePortfolioEndpoint(resource);
    setCompleted((previous) => ({
      pathname,
      count: previous.count + 1,
      endpoint: targetResponse.endpoint,
    }));

    if (targetResponse.status === 200) {
      setRequestError(null);
      if (targetPath !== pathname) router.push(targetPath);
      return;
    }

    setRequestError({
      pathname,
      response: { ...targetResponse, section: routeResponse.section },
    });
  }

  return (
    <>
      <Header>
        <RequestTabs section={response.section} />
      </Header>
      <main className="http-workspace">
        <RequestBar
          key={pathname}
          endpoint={response.endpoint}
          onSend={sendRequest}
        />
        <ResponsePanel response={response}>{children}</ResponsePanel>
        <span
          className="request-feedback sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {completed.pathname === pathname
            ? `${copy.processed} · #${completed.count} · GET ${completed.endpoint}`
            : ""}
        </span>
      </main>
    </>
  );
}
