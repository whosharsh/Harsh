
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const prompt = `
Analyze the provided image of a plant leaf and determine its health status. 
Respond with a JSON object that strictly adheres to the provided schema.

- If the leaf is healthy, set 'isHealthy' to true, 'disease' to "Healthy", confidence to a high value (e.g., 98), and provide a brief description and general care tips.
- If the leaf is diseased, set 'isHealthy' to false, identify the specific 'disease', estimate your 'confidence' percentage (0-100), provide a 'description' of the disease, and suggest 'treatment' options.
- Ensure the JSON is valid and properly formatted.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    isHealthy: {
      type: Type.BOOLEAN,
      description: "True if the plant is healthy, false otherwise."
    },
    disease: {
      type: Type.STRING,
      description: "Name of the disease, or 'Healthy' if not diseased."
    },
    confidence: {
      type: Type.NUMBER,
      description: "The confidence score of the prediction, from 0 to 100."
    },
    description: {
      type: Type.STRING,
      description: "A brief description of the condition or disease."
    },
    treatment: {
      type: Type.STRING,
      description: "Suggested treatment or care tips for the plant."
    },
  },
  required: ["isHealthy", "disease", "confidence", "description", "treatment"]
};

export const analyzePlantLeaf = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Validate that the result has the expected structure
    if (typeof result.isHealthy !== 'boolean' || typeof result.disease !== 'string' || typeof result.confidence !== 'number') {
        throw new Error("Invalid response structure from API.");
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing plant leaf:", error);
    throw new Error("Failed to get analysis from AI service.");
  }
};
