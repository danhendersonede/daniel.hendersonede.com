import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Define your collection(s)
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/pages/case-studies/' }),
  schema: ({ image }) =>
    z.object({
      pageTitle: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      featured: z.boolean(),
      createdDate: z.coerce.date(),
      coverImageURL: image(),
      valueProposition: z.string(),
    }),
});

const speakingEvents = defineCollection({
  loader: glob({
    pattern: '**/*.{json,md,mdx}',
    base: './src/content/speaking/',
  }),
  schema: () =>
    z.object({
      // Core required fields
      id: z.string(),
      title: z.string(),
      event: z.string(),
      date: z.coerce.date(),
      format: z.enum(['in-person', 'virtual', 'hybrid']),
      location: z.string(),
      type: z.enum(['keynote', 'talk', 'workshop', 'panel', 'podcast']),

      // Contextual fields
      status: z
        .enum(['upcoming', 'completed', 'cancelled'])
        .default('upcoming'),
      link: z.string().url().optional(),
      linkType: z
        .enum(['recording', 'info', 'registration', 'podcast'])
        .optional(),
      topics: z.array(z.string()).default([]),
      cost: z.string().optional(),
      time: z.string().optional(),
      featured: z.boolean().default(false),

      // Optional analytics
      metrics: z
        .object({
          attendees: z.number().optional(),
          rating: z.number().min(1).max(5).optional(),
          views: z.number().optional(),
          shares: z.number().optional(),
          downloads: z.number().optional(),
        })
        .optional(),

      // Optional content
      description: z.string().optional(),
      testimonial: z
        .object({
          quote: z.string(),
          author: z.string(),
          role: z.string().optional(),
        })
        .optional(),
    }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles/' }),
  schema: ({ image }) =>
    z.object({
      pageTitle: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      publicationName: z.string().optional(),
      url: z.string().url().optional(), // For redirects
      coverImageURL: image(),
    }),
});

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tools/' }),
  schema: ({ image }) =>
    z.object({
      toolName: z.string(),
      description: z.string(),
      coverImageURL: image(),
      lastUpdated: z.coerce.date(),
      url: z.string().url().optional(), // For redirects
      featured: z.boolean().optional(),
    }),
});

//Export a single `collections` object to register your collection(s)
export const collections = {
  caseStudies,
  speakingEvents,
  articles,
  tools,
};
