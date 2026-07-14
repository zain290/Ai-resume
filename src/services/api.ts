const API_BASE = '/api'

function getDeviceId(): string {
  let id = localStorage.getItem('rezfix_device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('rezfix_device_id', id)
  }
  return id
}

export interface AnalysisResult {
  score: number
  xyz_improvements: string[]
  matched_keywords: string[]
  missing_keywords: string[]
  overall_summary: string
  remaining?: number
  limit?: number
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `API error: ${res.status}`)
  }
  return res.json()
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  analyzeResume: async (file: File, jobDescription: string): Promise<AnalysisResult> => {
    const formData = new FormData()
    formData.append('resume', file)
    formData.append('jobDescription', jobDescription)
    const res = await fetch(`${API_BASE}/upload-analyze`, {
      method: 'POST',
      headers: { 'X-Device-Id': getDeviceId() },
      body: formData,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }))
      throw new Error(err.error || `Upload failed: ${res.status}`)
    }
    return res.json()
  },
}
