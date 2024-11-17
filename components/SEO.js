// components/SEO.js
import Head from 'next/head';

export default function SEO({
    title,
    description,
    ogImage,
    article = false,
    author,
    publishedTime,
    modifiedTime,
    tags,
    canonicalUrl
}) {
    const siteTitle = 'MOBICHARM';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = 'Explore the latest insights about mobile technology, phone cases, and tech accessories.';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}

            {/* Article specific metadata */}
            {article && (
                <>
                    {author && <meta property="article:author" content={author} />}
                    {publishedTime && <meta property="article:published_time" content={publishedTime} />}
                    {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
                    {tags && tags.map(tag => (
                        <meta property="article:tag" content={tag} key={tag} />
                    ))}
                </>
            )}
        </Head>
    );
}
