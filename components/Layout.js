// components/Layout.js
import Header from './Header';

export default function Layout({children}) {
    return (
        <div className="container mx-auto px-4 max-w-screen-xl">
            <Header/>
            <main>
                {children}
            </main>
        </div>
    );
}
