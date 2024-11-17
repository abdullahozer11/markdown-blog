# MOBICHARM Blog

A modern, SEO-optimized blog platform built with Next.js, focusing on mobile technology and accessories.

## Features

- 🌓 Dark/Light mode
- 📱 Fully responsive design
- 🔍 SEO optimized
- 📊 Static site generation for better performance
- 📝 Markdown-based content
- 🏷️ Category system
- 👤 Author pages
- 🔗 Social sharing (X/Twitter, LinkedIn)
- 🎨 Tailwind CSS styling

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Management

Add your blog posts as markdown files in `/public/blogs/` with the following frontmatter format:

```markdown
---
title: "Your Blog Title"
description: "SEO-friendly description of your blog post"
author: "Author Name"
date: "2024-11-17"
lastModified: "2024-11-18"
categories: ["Technology", "Mobile"]
---

Your blog content here...
```

## Project Structure

```
├── components/          # React components
├── contexts/           # Context providers (theme)
├── pages/              # Next.js pages
├── public/             # Static files
│   └── blogs/         # Markdown blog posts
├── styles/            # Global styles
└── utils/             # Utility functions
```

# Generate sitemap
npm run build
```

## Social Sharing

Implemented social sharing for:
- X (formerly Twitter)
- LinkedIn

Share URLs format:
- X: `https://twitter.com/intent/tweet?url={url}&text={title}&hashtags={tags}`
- LinkedIn: `https://www.linkedin.com/shareArticle?url={url}`

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=mobicharm.com
```

## Customization

### Theme

Update theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    // Your custom colors
  }
}
```

### Logo

Place your logos in `/public/`:
- `logo.png` - Light theme
- `logo.white.png` - Dark theme

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
