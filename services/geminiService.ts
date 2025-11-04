import { GoogleGenAI } from "@google/genai";
import type { AnalysisResult, ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const parseDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.*);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid data URL format");
    }
    const [, mimeType, data] = match;
    return { mimeType, data };
};

export const analyzePlantLeaf = async (imageDataUrl: string): Promise<AnalysisResult> => {
  try {
    const imagePart = {
      inlineData: parseDataUrl(imageDataUrl),
    };
    
    const textPart = {
      text: `You are an expert botanist and plant pathologist with a strong emphasis on safety. You have access to Google Search to find the most up-to-date information.
Analyze this image of a plant leaf with extreme care.
Your process must be:
1. First, identify the plant species.
2. Second, and most importantly, determine if this plant has any known toxicity or is hazardous to humans or pets (e.g., poisonous, skin irritant).
3. Third, determine if the plant is healthy or has a disease. Use Google Search to find current information about diseases and treatments if necessary.
4. Fourth, provide a confidence score (from 0.0 to 1.0) for your diagnosis.
5. Fifth, if you use Google Search, cite your sources.

Respond ONLY with a JSON object wrapped in a single markdown code block (\`\`\`json ... \`\`\`).
The JSON object must strictly follow this structure:
{
  "isHealthy": boolean,
  "plantName": "string",
  "diseaseName": "string",
  "description": "string",
  "treatment": "string",
  "safetyWarning": "string",
  "confidenceScore": number
}
CRITICAL SAFETY INSTRUCTIONS:
- If the plant is known to be toxic or hazardous, provide a clear, concise warning in the "safetyWarning" field (e.g., "Warning: This plant is toxic if ingested by pets.").
- If the plant is generally considered safe, the value for "safetyWarning" MUST be an empty string ("").
- If the plant is healthy, the value for "diseaseName" and "treatment" MUST be an empty string ("").
- Provide a concise, helpful description. If a disease is present, the description should briefly explain the disease, and the treatment field should contain actionable advice.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        tools: [{googleSearch: {}}],
        // responseMimeType must not be set when using googleSearch. Removed.
      },
    });
    
    const jsonText = response.text;
    
    // The response might be wrapped in a markdown code block, so we need to extract it.
    const jsonMatch = jsonText.match(/```json\n([\s\S]*?)\n```/);
    const parsableText = jsonMatch ? jsonMatch[1] : jsonText;

    let result;
    try {
      result = JSON.parse(parsableText);
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", parsableText);
      throw new Error("AI response was not in a valid JSON format.");
    }
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    const processedResult: AnalysisResult = {
        ...result,
        diseaseName: result.diseaseName === "" ? null : result.diseaseName,
        treatment: result.treatment === "" ? null : result.treatment,
        safetyWarning: result.safetyWarning === "" ? null : result.safetyWarning,
        sources: sources?.filter(chunk => chunk.web),
    };

    if (typeof processedResult.isHealthy !== 'boolean' || typeof processedResult.plantName !== 'string') {
        throw new Error("AI response did not match the expected format.");
    }
    
    return processedResult;

  } catch (error) {
    console.error("Error analyzing plant leaf:", error);
    if (error instanceof SyntaxError || error.message.includes("JSON")) {
        throw new Error("Failed to parse the AI's response. It may not be valid JSON.");
    }
    throw new Error("Failed to analyze leaf image with the AI service.");
  }
};

export const getChatResponse = async (history: ChatMessage[], context: AnalysisResult): Promise<string> => {
    try {
        const contents = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: `You are a helpful and expert botanist assistant. The user has just analyzed a leaf from a ${context.plantName}. 
The diagnosis was: ${context.isHealthy ? 'Healthy' : `Diseased with ${context.diseaseName}`}.
${context.safetyWarning ? `Crucially, there was a safety warning: ${context.safetyWarning}` : ''}
Your role is to answer the user's follow-up questions about this specific plant and its condition. Be encouraging, clear, and provide actionable advice. Prioritize safety in your answers if a warning was present. Do not mention that you are an AI.`,
            }
        });

        return response.text;

    } catch (error) {
        console.error("Error getting chat response:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
};