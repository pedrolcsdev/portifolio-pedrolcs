"use client";

import { Braces, Monitor } from "lucide-react";
import { copy } from "@/data/interface-copy";
import type { PortfolioResponse } from "@/types/portfolio";
import { JsonViewer } from "@/presentation/shared/components/json-viewer";
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
          <span className="response-title">{copy.response}</span>
          <TabsList className="response-tab-list" aria-label="Response format">
            <TabsTrigger value="preview">
              <Monitor size={13} aria-hidden="true" />
              {copy.preview}
            </TabsTrigger>
            <TabsTrigger value="json">
              <Braces size={13} aria-hidden="true" />
              {copy.json}
            </TabsTrigger>
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
            <span className="simulated-label">{copy.simulated}</span>
          </div>
        </div>
        <TabsContent
          value="preview"
          className="response-content preview-content"
          tabIndex={0}
        >
          {children}
        </TabsContent>
        <TabsContent value="json" className="response-content json-content">
          <JsonViewer data={response.data} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
