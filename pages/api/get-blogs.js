// pages/api/get-blogs.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
    try {
        const blogsDirectory = path.join(process.cwd(), 'public/blogs');
        const files = fs.readdirSync(blogsDirectory);
        const blogs = [];
        const categories = new Map();

        // Process each markdown file
        files.forEach(filename => {
            if (!filename.endsWith('.md')) return;
            
            const filePath = path.join(blogsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data: metadata, content } = matter(fileContents);
            const id = filename.replace('.md', '');

            // Get preview from content (first paragraph after any metadata)
            const preview = content.split('\n\n')[0].trim();

            // Process categories
            const blogCategories = metadata.categories || [];
            blogCategories.forEach(category => {
                if (!categories.has(category)) {
                    categories.set(category, []);
                }
                categories.get(category).push(id);
            });

            // Format the blog data
            blogs.push({
                id,
                title: metadata.title || formatTitle(id), // Use metadata title or format filename
                date: metadata.date || new Date().toISOString(),
                preview,
                author: metadata.author || 'Anonymous',
                categories: blogCategories,
                readingTime: calculateReadingTime(content),
                // Add any other metadata you want to include
            });
        });

        // Sort blogs by date (most recent first)
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Format the response
        const response = {
            blogs,
            categories: Object.fromEntries(categories)
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error reading blog files:', error);
        res.status(500).json({ error: 'Error reading blog files' });
    }
}

// Helper function to format kebab-case to Title Case
function formatTitle(kebabStr) {
    return kebabStr
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Helper function to calculate reading time
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
