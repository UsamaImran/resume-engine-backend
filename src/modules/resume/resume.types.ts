// ============================================================
//  Resume Types
// ============================================================

export interface SkillItem {
  name: string;
  highlight: boolean;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export interface Paragraph {
  title?: string;
  text: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  github: string;
  npm: string;
  location: string;
  targetCompany: string;
  targetJobTitle: string;
  targeting: string;
  headline: string;
  summary: string;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: string;
  npmPackages?: string[];
}

export interface CoverData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  github: string;
  npm: string;
  location: string;
  targeting: string;
  recipient_name: string;
  company_name: string;
  company_address?: string;
  job_title: string;
  paragraphs: Paragraph[];
}

// ============================================================
//  API Request/Response Types
// ============================================================

// ---- Resume ----

export interface ParseResumeResponse {
  resume: ResumeData;
}

export interface TailorResumeRequest {
  resume: string;
  jobDescription: string;
  preferences?: {
    tone?: "professional" | "enthusiastic" | "formal";
    keywordEmphasis?: string[];
  };
}

export interface TailorResumeResponse {
  tailoredResume: ResumeData;
}

export interface GenerateResumePdfRequest {
  resume: ResumeData;
  template?: "modern" | "classic" | "minimal";
  outputType?: "resume" | "cover_letter";
}

// ---- Cover Letter ----

export interface GenerateCoverLetterRequest {
  resume: ResumeData;
  jobDescription: string;
  preferences?: {
    tone?: "professional" | "enthusiastic" | "formal";
    length?: "short" | "medium" | "long";
    recipient_name?: string;
    company_name?: string;
    company_address?: string;
  };
}

export interface GenerateCoverLetterResponse {
  coverLetter: CoverData;
}

export interface GenerateCoverPdfRequest {
  coverLetter: CoverData;
  template?: "modern" | "classic" | "minimal";
}
