export const RESUME_OUTPUT_SCHEMA = `
Return ONLY valid JSON with this structure:

{
  "name": "string",
  "email": "string",
  "phone": "string",
  "linkedin": "string",
  "portfolio": "string",
  "github": "string",
  "npm": "string",
  "location": "string",
  "targetCompany": "string",
  "targetJobTitle": "string",
  "targeting": "string",
  "headline": "string", // its basically the job title
  "summary": "string",
  "skills": [
    {
      "category": "string",
      "items": [
        { "name": "string", "highlight": boolean }
      ]
    }
  ],
  "experience": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "date": "string",
      "bullets": ["string"]
    }
  ],
  "education": [ 
  {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  honors?: string[];
  courses?: string[];
}
  ],

  "npmPackages": ["string"] // it is name of open source (node package manager)  so don't put anything if not found
}
`;
