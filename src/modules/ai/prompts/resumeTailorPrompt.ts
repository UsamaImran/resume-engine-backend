export function buildResumeTailorPrompt(
  rawText: string,
  jobDescription: string,
  preferences?: { tone?: string },
): string {
  return `You are a resume tailoring expert. Your task is to tailor the following resume text to match the given job description.

## CRITICAL RULES (MUST FOLLOW):
1. DO NOT remove ANY work experience, education, or skills that exist in the original resume.
2. DO NOT add skills or experience that are NOT in the original resume.
3. DO NOT fabricate any information.
4. PRESERVE all companies, roles, dates, and bullet points.
5. REPHRASE and RESTRUCTURE existing content to highlight relevance to the job.
6. EMPHASIZE keywords from the job description naturally within existing bullet points.
7. Reorder experiences to put the most relevant ones first (but keep ALL of them).
8. Return ONLY valid JSON with the complete data.

## Original Resume Text:
${rawText}

## Job Description:
${jobDescription}

${preferences?.tone ? `\n## Tone: ${preferences.tone}` : ""}

## Output Format:
Return a JSON object matching this exact structure with ALL data preserved:

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
  "summary": "string (tailored to highlight relevant experience)",
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
      "bullets": ["string (tailored bullets with keywords)"]
    }
    // ← ALL experiences from the original resume MUST be included
  ],
  "education": "string",
  "npmPackages": ["string"]
}

Return ONLY the JSON object, no markdown, no explanation.`;
}
