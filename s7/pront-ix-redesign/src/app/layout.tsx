// src/app/layout.tsx
import './globals.css';
import Header from '@/components/common/Header';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'; // Importe le bouton

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="pt-[80px]">
          {children}
        </main>
        <ScrollToTopButton /> {/* Ajoute le bouton ici */}
      </body>
    </html>
  );
}