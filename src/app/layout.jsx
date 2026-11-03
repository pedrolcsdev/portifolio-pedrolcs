import "./globals.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";

export const metadata = {
  title: "Pedro Lucas | Portfólio",
  description: "Portfólio de Pedro Lucas, desenvolvedor backend."
};

export const viewport = {
  themeColor: "#0c0d10",
  colorScheme: "dark",
  viewportFit: "cover"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
