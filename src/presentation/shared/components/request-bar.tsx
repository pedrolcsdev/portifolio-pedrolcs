"use client";

import { Send } from "lucide-react";
import { identity } from "@/data/portfolio";
import { copy } from "@/data/interface-copy";
import { Button } from "@/presentation/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/shared/components/ui/tabs";

export function RequestBar({
  endpoint,
  onSend,
}: {
  endpoint: string;
  onSend: () => void;
}) {
  return (
    <section className="request-section" aria-label="HTTP request">
      <form
        className="request-bar"
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
      >
        <span className="request-method">GET</span>
        <label className="url-field">
          <span className="sr-only">{copy.requestUrl}</span>
          <input
            value={`https://${identity.domain}${endpoint}`}
            readOnly
            spellCheck={false}
          />
        </label>
        <Button type="submit" className="send-button" aria-label={copy.send}>
          <Send size={15} aria-hidden="true" />
          <span>{copy.send}</span>
        </Button>
      </form>
      <Tabs defaultValue="overview" className="request-tabs">
        <TabsList className="request-tab-list" aria-label="Request information">
          <TabsTrigger value="overview">{copy.overview}</TabsTrigger>
          <TabsTrigger value="headers">
            {copy.headers}
            <span className="tab-count">1</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="request-info">
          <span className="small-dot" />
          {copy.requestDescription}
        </TabsContent>
        <TabsContent value="headers" className="request-info">
          <dl className="header-pair">
            <dt>Accept</dt>
            <dd>application/json</dd>
          </dl>
        </TabsContent>
      </Tabs>
    </section>
  );
}
