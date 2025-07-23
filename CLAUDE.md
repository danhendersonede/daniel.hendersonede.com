# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Development server with network access
npm run dev-host

# Build for production (runs type check first)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- --help
```

## Project Architecture

This is an **Astro-based personal website** for Daniel Henderson-Ede, focusing on accessibility, design systems, and inclusive design. The site serves as a portfolio showcasing work, articles, tools, and speaking engagements.

### Core Technology Stack

- **Framework**: Astro 5.7+ with TypeScript
- **UI Libraries**: React 19+ (for interactive components)
- **Content**: MDX for rich content with components
- **Styling**: CSS custom properties with design tokens
- **Deployment**: Netlify adapter
- **Build Tools**: Astro CLI with TypeScript checking

### Architecture Overview

**Content Management Strategy**:
The site uses Astro's content collections with file system-based content management. All content is structured using defined schemas and loaded via glob patterns or specific files.

**Content Collections** (defined in `src/content.config.ts`):

- `work` - Portfolio case studies loaded from `src/pages/work/*.mdx`
- `articles` - Blog posts from `src/content/articles/*.md`
- `tools` - Accessibility tools from `src/content/tools/*.md`
- `upcomingSpeakingEvents` - JSON data for speaking schedule
- `pastSpeakingEvents` - JSON data for speaking history

**Layout System**:

- `base.astro` - Core HTML structure with navigation and footer
- `base-head.astro` - SEO meta tags and page head configuration
- `article.astro` - Template for article content
- `work.astro` - Template for work case studies
- `legal.astro` - Template for legal pages

**Component Architecture**:
Components are organized functionally in `src/components/`:

- Navigation: `navbar.astro`, `navbar-menu-items.astro`
- Content: `Hero.astro`, `featured-links.astro`, `recent-articles.astro`
- Interactive: `reveal-email.jsx` (React component for progressive enhancement)
- Utility: `ProfilePicture.astro`, `CTALink.astro`, `tag.astro`

**Styling System**:
CSS architecture based on design tokens and custom properties:

- `src/styles/tokens/` - Design system tokens (core, dark mode, semantic)
- `src/styles/global.css` - Global styles and typography
- Component-specific styles are co-located with components
- Design system uses CSS custom properties for theme consistency

**Path Aliases** (configured in `tsconfig.json`):

- `@assets/*` - Asset files and images
- `@components/*` - Reusable components
- `@config/*` - Configuration files
- `@layouts/*` - Layout templates
- `@tokens/*` - CSS design tokens
- `@utils/*` - Utility functions

### Key Configuration Files

**Astro Configuration** (`astro.config.mjs`):

- Site URL: `https://daniel.hendersonede.com`
- Integrations: MDX, Sitemap, React
- Redirects: `/article` → `/articles`, `/tool` → `/tools`
- Netlify adapter with CDN disabled

**Content Strategy**:

- Work case studies are stored as MDX files in `src/pages/work/` for direct routing
- Articles and tools use content collections for better organization
- Speaking events managed via JSON files for easy updates
- All content includes structured metadata (titles, descriptions, dates, tags)

**Navigation Structure** (defined in `src/config/root-page-config.ts`):
Primary navigation includes Work, Speaking, Resources, and About sections. Articles and Tools are secondary sections accessible via dedicated pages.

### Development Patterns

**Content Creation**:

- Work case studies: Create `.mdx` files in `src/pages/work/` with required frontmatter
- Articles: Add `.md` files to `src/content/articles/` following the articles schema
- Tools: Add `.md` files to `src/content/tools/` following the tools schema

**Component Development**:

- Use `.astro` files for static components and layouts
- Use `.jsx` for interactive React components requiring client-side functionality
- Follow existing patterns for props interfaces and component composition

**Styling Guidelines**:

- Use design tokens from `@tokens/*` for consistent theming
- Implement responsive design with CSS custom properties
- Follow existing naming conventions for CSS classes and custom properties
- Dark mode support is built into the design token system

**Asset Management**:

- Images organized by type in `src/assets/` with subdirectories for logos, icons, resources
- Work and article cover images stored alongside content in respective resource folders
- Profile and brand assets centralized in `src/assets/` root

This architecture prioritizes content authoring efficiency, design system consistency, and accessibility while maintaining performance through Astro's static generation capabilities.
