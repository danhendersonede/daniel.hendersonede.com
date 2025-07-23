export interface Resource {
  title: string;
  description: string;
  ogImageURL: string;
  featured: boolean;
  tags: string[];
  createdDate: Date;
  subPage?: boolean;
  coverImageLightURL?: string;
  coverImageDarkURL?: string;
  updatedDate?: Date;
  draft?: boolean;
  author?: string; // Assuming author is a string reference to a team member
}
