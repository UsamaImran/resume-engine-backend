export function buildResumeTailorPrompt(
  rawText: string,
  jobDescription: string,
  preferences?: { tone?: string },
): string {
  return `
## Resume
${rawText}

## Job Description
${jobDescription}

${preferences?.tone ? `## Tone: ${preferences.tone}` : ""}
`;
}
