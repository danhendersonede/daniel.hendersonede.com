/**
 * Site Configuration
 *
 * Central configuration for Daniel Henderson-Ede's website.
 * Contains site metadata, navigation, and social links.
 */

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  nav: Array<{
    label: string;
    href: string;
    featured: boolean;
    navOrder?: number;
  }>;
}

export const siteConfig: SiteConfig = {
  // Site metadata
  name: 'Daniel Henderson-Ede',
  title: 'Daniel Henderson-Ede - Accessibility & Design Systems',
  description:
    'Daniel Henderson-Ede is a design systems accessibility advocate focusing on inclusive design, WCAG compliance, and building accessible user experiences.',

  // Site URL
  url: 'https://daniel.hendersonede.com',

  // Author information
  author: 'Daniel Henderson-Ede',

  // Social media links
  social: {
    linkedin: 'danielhendersonede',
    email: 'hello@daniel.hendersonede.com',
  },

  // Main navigation menu
  nav: [
    { label: 'Work', href: '/work', featured: true, navOrder: 1 },
    { label: 'Speaking', href: '/speaking', featured: true, navOrder: 2 },
    { label: 'Resources', href: '/resources', featured: true, navOrder: 3 },
    { label: 'About', href: '/about', featured: false, navOrder: 4 },
    { label: 'Articles', href: '/articles', featured: false },
    { label: 'Tools', href: '/tools', featured: false },
  ],
};
