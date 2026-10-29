"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { copy } from "@/data/interface-copy";
import { Button } from "@/presentation/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/presentation/shared/components/ui/tooltip";

const jsonTokens =
  /("(?:\\.|[^"\\])*"\s*:|"(?:\\.|[^"\\])*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|\b(?:true|false|null)\b)/g;

export function JsonViewer({ data }: { data: unknown }) {
  const source = JSON.stringify(data, null, 2) ?? "null";
  const [clipboard, setClipboard] = useState({ source: "", failed: false });
  const copied = clipboard.source === source && !clipboard.failed;

  async function copyResponse() {
    try {
      await navigator.clipboard.writeText(source);
      setClipboard({ source, failed: false });
    } catch {
      setClipboard({ source, failed: true });
    }
  }

  return (
    <div className="json-viewer">
      <div className="json-toolbar">
        <span>
          JSON <span className="json-encoding">UTF-8</span>
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyResponse}
              aria-label={copied ? copy.copied : copy.copyJson}
            >
              {copied ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? copy.copied : copy.copyJson}
          </TooltipContent>
        </Tooltip>
      </div>
      <span role="status" className="clipboard-feedback">
        {clipboard.source === source && clipboard.failed
          ? copy.copyFailed
          : copied
            ? copy.copied
            : ""}
      </span>
      <pre className="json-code" tabIndex={0} aria-label={copy.jsonLabel}>
        <code>
          {source.split("\n").map((line, index) => (
            <span className="json-line" key={index}>
              <span className="line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span>
                {line.split(jsonTokens).map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    className={
                      token.startsWith('"')
                        ? token.endsWith(":")
                          ? "json-key"
                          : "json-string"
                        : /^(?:-?\d|true|false|null)/.test(token)
                          ? "json-literal"
                          : undefined
                    }
                  >
                    {token}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
