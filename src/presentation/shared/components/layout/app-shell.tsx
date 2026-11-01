import { copy } from "@/data/interface-copy";
import { HttpWorkspace } from "@/presentation/shared/components/http-workspace";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#response" className="skip-link">
        {copy.skipContent}
      </a>
      <div className="app-shell">
        <HttpWorkspace>{children}</HttpWorkspace>
      </div>
    </>
  );
}
