import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <div className="min-h-screen bg-base-neutral transition-colors duration-200">
            <Component {...pageProps} />
        </div>
    );
}
