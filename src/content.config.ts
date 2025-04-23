import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// 1. Define your collection(s)
const work = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/work/" }),
    schema: ({ image }) => z.object({
        pageTitle: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        featured: z.boolean(),
        createdDate: z.coerce.date(),
        coverImageURL: image(),
    }),
});

const upcomingSpeakingEvents = defineCollection({
    loader: file("src/content/speaking/upcoming.json"),
    schema: z.object({
        id: z.string(),
        eventName: z.string(),
        description: z.string(),
        date: z.string(),
        time: z.string(),
        location: z.string(),
        cost: z.string(),
        linkType: z.enum(["info", "register"]),
        URL: z.string(),
    }),
});

const pastSpeakingEvents = defineCollection({
    loader: file("src/content/speaking/previous.json"),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        type: z.enum(["podcast", "livestream", "conference"]),
        description: z.string(),
        link: z.string().url(),
        linkText: z.string()
    }),
});

const articles = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles/" }),
    schema: ({ image }) => z.object({
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
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tools/" }),
    schema: ({image}) => z.object({
      toolName: z.string(),
      description: z.string(),
      coverImageURL: image(),
      lastUpdated: z.coerce.date(),
      url: z.string().url().optional(), // For redirects
      featured: z.boolean().optional(),
    }),
  });

// const resourceSchema = ({ image }: { image: any }) => z.object({
//     title: z.string(),
//     description: z.string(),
//     ogImageURL: z.string(),
//     featured: z.boolean(),
//     tags: z.array(z.string()),
//     createdDate: z.coerce.date(),
//     coverImageLightURL: image(),
//     coverImageDarkURL: image(),
//     coverImageAltText: z.string(),
//     subPage: z.boolean().optional(),
//     updatedDate: z.coerce.date().optional(),
//     draft: z.boolean().optional(),
//     author: reference('team').optional()
// });


//Export a single `collections` object to register your collection(s)
export const collections = { work, upcomingSpeakingEvents, pastSpeakingEvents, articles, tools };