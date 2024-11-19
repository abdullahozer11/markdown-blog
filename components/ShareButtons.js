import { useEffect, useState } from 'react';

export default function ShareButtons({ title, url, tags = [] }) {
    const [currentUrl, setCurrentUrl] = useState(url);
    const [showCopied, setShowCopied] = useState(false);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const hashTags = tags.map(tag => tag.replace(/\s+/g, '')).join(',');
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedTags = encodeURIComponent(hashTags);

    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedTags}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;

    const handleShare = (platform, shareUrl) => {
        window.open(shareUrl, `share-${platform}`, 'width=600,height=400,scrollbars=yes');
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2 py-4">
            <span className="text-sm opacity-70">Share this article:</span>

            <div className="join">
                {/* Twitter/X Share Button */}
                <button
                    onClick={() => handleShare('twitter', twitterUrl)}
                    className="btn btn-sm join-item"
                    aria-label="Share on X (Twitter)"
                >
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="hidden sm:inline">Share on X</span>
                </button>

                {/* LinkedIn Share Button */}
                <button
                    onClick={() => handleShare('linkedin', linkedinUrl)}
                    className="btn btn-sm join-item btn-primary"
                    aria-label="Share on LinkedIn"
                >
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="hidden sm:inline">Share on LinkedIn</span>
                </button>

                {/* Copy Link Button */}
                <button
                    onClick={handleCopyLink}
                    className="btn btn-sm join-item btn-neutral"
                    aria-label="Copy link"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                    </svg>
                    <span className="hidden sm:inline">
                        {showCopied ? 'Copied!' : 'Copy link'}
                    </span>
                </button>

                {/* Optional: Native Share Button for mobile */}
                {navigator.share && (
                    <button
                        onClick={async () => {
                            try {
                                await navigator.share({
                                    title,
                                    text: title,
                                    url: currentUrl,
                                });
                            } catch (err) {
                                console.error('Error sharing:', err);
                            }
                        }}
                        className="btn btn-sm join-item sm:hidden"
                        aria-label="Share"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                        </svg>
                        <span className="hidden sm:inline">Share</span>
                    </button>
                )}
            </div>

            {/* Toast for copy confirmation */}
            {showCopied && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Link copied to clipboard!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
