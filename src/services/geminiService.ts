import { EvaluationRequest, EvaluationResult } from '../types';

// Use the currently supported Gemini model
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const evaluateAnswer = async (request: EvaluationRequest): Promise<EvaluationResult> => {
  const apiKey = "AIzaSyBqN9hRjfX8lPhARFr6n8MoolSUqcl6WHc"

  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const systemContext = request.useAdvancedRubric
    ? `You are an expert academic evaluator with advanced rubric criteria. Analyze the student's answer against the ideal answer using accuracy, depth, clarity, structure, and critical thinking.`
    : `You are a helpful teacher evaluating student answers. Compare the student's answer with the ideal answer and provide constructive feedback.`;

  const evaluationPrompt = `
${systemContext}

Evaluate the student's answer compared to the ideal answer.

STRICT INSTRUCTION: Respond ONLY with RAW JSON. No code blocks. No extra commentary.

---

Question: ${request.question}

Ideal Answer: ${request.idealAnswer}

Student Answer: ${request.studentAnswer}

Respond strictly in this JSON format:

{
  "score": 0-10,
  "feedback": "short 2-3 sentence feedback",
  "mistakes": ["mistake 1", "mistake 2", "mistake 3"],
  "strengths": ["strength 1", "strength 2", "strength 3"]
}
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: evaluationPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Gemini API error: ${errorMessage}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!rawText) {
      throw new Error('Gemini returned no content.');
    }

    // Extract JSON object from response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Gemini Evaluation Failed: No valid JSON found in Gemini API response.');
    }

    let result;
    try {
      result = JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error('Gemini Evaluation Failed: JSON parsing failed.');
    }

    return {
      score: Math.round(result.score * 10) / 10,
      feedback: result.feedback || 'No feedback provided.',
      mistakes: Array.isArray(result.mistakes) ? result.mistakes.filter(m => m && m.trim()) : [],
      strengths: Array.isArray(result.strengths) ? result.strengths.filter(s => s && s.trim()) : [],
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        throw new Error('Invalid Gemini API key. Please check your .env file.');
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Try again later.');
      }
      if (error.message.includes('BLOCKED')) {
        throw new Error('Gemini blocked the content. Rephrase your input.');
      }
      throw new Error(error.message);
    }
    throw new Error('Unknown error occurred while evaluating answer.');
  }
};
