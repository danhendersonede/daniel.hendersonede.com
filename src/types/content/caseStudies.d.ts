/**
 * Case study data structure matching the content collection schema
 * Raw data from Astro collection with image objects
 */
export interface CaseStudyData {
  pageTitle: string;
  description: string;
  tags: string[];
  featured: boolean;
  createdDate: Date;
  coverImageURL: {
    src: string;
    width: number;
    height: number;
    format: string;
  };
  valueProposition: string;
}

/**
 * Complete case study with Astro collection metadata
 * Matches the structure returned by getCollection()
 */
export interface CaseStudy {
  id: string;
  body?: string;
  collection: 'caseStudies';
  data: CaseStudyData;
  rendered?: {
    metadata?: {
      imagePaths: string[];
      frontmatter: Record<string, unknown>;
    };
  };
}
