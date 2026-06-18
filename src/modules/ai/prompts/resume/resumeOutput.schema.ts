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
  "headline": "string",
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
  "education": "string",
  "npmPackages": ["string"]
}
`;
