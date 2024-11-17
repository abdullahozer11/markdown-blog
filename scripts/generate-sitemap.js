//// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

function generateSitemap() {
    // Get all blog posts
    const blogsDirectory = path.join(process.cwd(), 'public/blogs');
    const files = fs.readdirSync(blogsDirectory);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <!-- Home page -->
        <url>
            <loc>${SITE_URL}</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        
        ${files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const fileContents = fs.readFileSync(
                path.join(blogsDirectory, file),
                'utf8'
            );
            const {data} = matter(fileContents);
            const url = `${SITE_URL}/blogs/${file.replace('.md', '')}`;
            return `
                    <url>
                        <loc>${url}</loc>
                        <lastmod>${data.lastModified || data.date}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `;
        })
        .join('')}
    </urlset>`;

    fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
