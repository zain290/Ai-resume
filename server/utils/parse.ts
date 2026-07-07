import fs from 'fs'
import { PDFParse } from 'pdf-parse'
import mammoth from 'mammoth'

export async function extractText(filePath: string, mimetype: string): Promise<string> {
  const buffer = fs.readFileSync(filePath)

  if (mimetype === 'application/pdf') {
    const data = await PDFParse(buffer)
    return data.text
  }

  if (
    mimetype === 'application/msword' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  throw new Error(`Unsupported file type: ${mimetype}`)
}
