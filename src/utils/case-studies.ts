import type { CollectionEntry } from 'astro:content';

type CaseStudyEntry = CollectionEntry<'caseStudies'>;

/**
 * Gets featured case studies
 */
export function getFeaturedCaseStudies(
  caseStudies: CaseStudyEntry[]
): CaseStudyEntry[] {
  return caseStudies.filter(caseStudy => caseStudy.data.featured);
}

/**
 * Gets all case studies sorted by creation date (most recent first)
 */
export function getCaseStudiesByDate(
  caseStudies: CaseStudyEntry[]
): CaseStudyEntry[] {
  return caseStudies.sort(
    (a, b) => b.data.createdDate.getTime() - a.data.createdDate.getTime()
  );
}

/**
 * Gets case studies filtered by tag
 */
export function getCaseStudiesByTag(
  caseStudies: CaseStudyEntry[],
  tag: string
): CaseStudyEntry[] {
  return caseStudies.filter(caseStudy =>
    caseStudy.data.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Filters case studies by featured status
 */
export function filterCaseStudiesByStatus(caseStudies: CaseStudyEntry[]): {
  featured: CaseStudyEntry[];
  all: CaseStudyEntry[];
} {
  const featured = caseStudies.filter(caseStudy => caseStudy.data.featured);
  return { featured, all: caseStudies };
}
