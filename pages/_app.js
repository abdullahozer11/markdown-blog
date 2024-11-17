import "@/styles/globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
