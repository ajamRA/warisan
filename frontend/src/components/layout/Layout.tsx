import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ThemeProvider } from 'next-themes';

export default function Layout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}