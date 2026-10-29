import { copy } from "@/data/interface-copy";
import { Sidebar } from "@/presentation/shared/components/layout/sidebar";
import { Header } from "@/presentation/shared/components/layout/header";
import { HttpWorkspace } from "@/presentation/shared/components/http-workspace";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#response" className="skip-link">
        {copy.skipContent}
      </a>
      <div className="app-shell">
        <aside className="desktop-sidebar">
          <Sidebar />
        </aside>
        <div className="workspace">
          <Header />
          <HttpWorkspace>{children}</HttpWorkspace>
        </div>
      </div>
    </>
  );
}
