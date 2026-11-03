"use client";

import { copy } from "@/data/interface-copy";
import type { PortfolioResponse } from "@/types/portfolio";
import { JsonViewer } from "@/presentation/shared/components/json-viewer";
import { NotFoundPreview } from "@/presentation/shared/components/not-found-preview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/shared/components/ui/tabs";

export function ResponsePanel({
  response,
  children,
}: {
  response: PortfolioResponse;
  children: React.ReactNode;
}) {
  return (
    <section
      id="response"
      className="response-panel"
      aria-label={copy.response}
      tabIndex={-1}
    >
      <Tabs defaultValue="preview" className="response-tabs">
        <div className="response-toolbar">
          <TabsList className="response-tab-list" aria-label="Response format">
            <TabsTrigger value="preview">{copy.preview}</TabsTrigger>
            <TabsTrigger value="json">{copy.json}</TabsTrigger>
          </TabsList>
          <div
            className="response-status"
            aria-label={`${copy.simulated}: ${response.status} ${response.statusText}`}
          >
            <span
              className={
                response.status === 200 ? "http-status is-ok" : "http-status"
              }
            >
              <span className="status-dot" />
              {response.status} {response.statusText}
            </span>
          </div>
        </div>
        <TabsContent
          value="preview"
          className="response-content preview-content"
          tabIndex={0}
        >
          {response.kind === "not-found" ? <NotFoundPreview /> : children}
        </TabsContent>
        <TabsContent value="json" className="response-content json-content">
          <JsonViewer data={response.data} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
