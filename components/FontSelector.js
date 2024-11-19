import {useState} from "react";

export default function FontSelector() {
    const [selectedFont, setSelectedFont] = useState('inter');

    const fonts = [
        { name: 'Inter', value: 'inter', className: 'font-sans' },
        { name: 'Merriweather', value: 'merriweather', className: 'font-serif' },
        { name: 'Roboto Mono', value: 'roboto-mono', className: 'font-mono' },
        { name: 'Playfair Display', value: 'playfair', className: 'font-serif' },
    ];

    const handleFontChange = (fontValue) => {
        setSelectedFont(fontValue);
        document.documentElement.classList.remove(...fonts.map(f => f.className));
        const newFont = fonts.find(f => f.value === fontValue);
        if (newFont) {
            document.documentElement.classList.add(newFont.className);
        }
    };

    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
                Font
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"/>
                </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
                {fonts.map((font) => (
                    <li key={font.value}>
                        <input
                            type="radio"
                            name="font-dropdown"
                            className="btn btn-sm btn-block btn-ghost justify-start"
                            aria-label={font.name}
                            value={font.value}
                            onChange={() => handleFontChange(font.value)}
                            checked={selectedFont === font.value}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
