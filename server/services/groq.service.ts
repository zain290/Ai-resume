import Groq from 'groq-sdk'
import dotenv from 'dotenv'

dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

interface AIResult {
  score: number
  xyz_improvements: string[]
  matched_keywords: string[]
  missing_keywords: string[]
  overall_summary: string
}

const SYSTEM_PROMPT = `You are an expert Google Tech Recruiter (Senior Hiring Manager). Analyze the provided resume text against the provided job description.

1. Grade the resume out of 100 based on formatting, impact, and keyword matching.
2. Check strictly for the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]". Identify weak bullet points that fail this rule.
3. Extract matched and missing critical keywords from the job description.
4. Provide actionable feedback on how to improve.

Return ONLY a JSON object with this exact schema:
{ "score": number, "xyz_improvements": string[], "matched_keywords": string[], "missing_keywords": string[], "overall_summary": string }`

export async function analyzeResume(
  resumeText: string,
  jobDescription: string,
): Promise<AIResult> {
  const userMessage = `RESUME TEXT:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  })

  const content = completion.choices[0]?.message?.content || '{}'
  const result = JSON.parse(content) as AIResult

  return {
    score: result.score ?? 0,
    xyz_improvements: result.xyz_improvements ?? [],
    matched_keywords: result.matched_keywords ?? [],
    missing_keywords: result.missing_keywords ?? [],
    overall_summary: result.overall_summary ?? 'No analysis available.',
  }
}

export async function chatWithAI(messages: { role: string; content: string }[]): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: messages as any,
    temperature: 0.5,
    max_completion_tokens: 1024,
  })

  const text = completion.choices[0]?.message?.content?.trim() || ''
  if (!text) throw new Error('Empty response from AI')
  return text
}
