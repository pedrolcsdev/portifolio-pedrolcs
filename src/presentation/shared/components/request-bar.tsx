"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { identity } from "@/data/portfolio";
import { copy } from "@/data/interface-copy";
import { Button } from "@/presentation/shared/components/ui/button";

export function RequestBar({
  endpoint,
  onSend,
}: {
  endpoint: string;
  onSend: (resource: string) => void;
}) {
  const prefix = `https://${identity.domain}/api/`;
  const [resource, setResource] = useState(endpoint.replace(/^\/api\//, ""));

  return (
    <section className="request-section" aria-label="HTTP request">
      <form
        className="request-bar"
        onSubmit={(event) => {
          event.preventDefault();
          onSend(resource);
        }}
      >
        <span className="request-method">GET</span>
        <label className="url-field">
          <span className="sr-only">{copy.requestUrl}</span>
          <input
            value={`${prefix}${resource}`}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (value.startsWith(prefix)) setResource(value.slice(prefix.length));
            }}
            onSelect={(event) => {
              const input = event.currentTarget;
              const start = input.selectionStart ?? 0;
              const end = input.selectionEnd ?? start;
              if (start < prefix.length) {
                input.setSelectionRange(prefix.length, Math.max(prefix.length, end));
              }
            }}
            onKeyDown={(event) => {
              const input = event.currentTarget;
              if (
                event.key === "Backspace" &&
                input.selectionStart === prefix.length &&
                input.selectionEnd === prefix.length
              ) {
                event.preventDefault();
              }
            }}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label={copy.requestUrl}
          />
        </label>
        <Button type="submit" className="send-button" aria-label={copy.send}>
          <Send size={19} strokeWidth={1.6} aria-hidden="true" />
          <span>{copy.send}</span>
        </Button>
      </form>
    </section>
  );
}
