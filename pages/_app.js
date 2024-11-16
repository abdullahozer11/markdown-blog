import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <Component {...pageProps} />
    </div>
  );
}
