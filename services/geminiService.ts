import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Sentiment } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

export const analyzeReviews = async (text: string): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    You are an expert sentiment analyst. 
    Analyze the following text, which may contain multiple customer reviews (separated by newlines or just a block of text).
    
    1. Split the text into individual reviews. If the text is a single paragraph talking about one thing, treat it as one review. If it contains bullet points or distinct lines, treat them as separate reviews.
    2. Determine the sentiment for each review (POSITIVE, NEGATIVE, or NEUTRAL).
    3. Provide a very brief summary (one sentence) for each review.
    4. Extract 2-3 keywords for each review.
    5. Identify the top 3 frequent complaints across all negative/neutral reviews.
    6. Identify the top 3 frequent praises across all positive reviews.

    Input Text:
    "${text.slice(0, 30000)}" // Safety truncation
  `;

  // Define the schema for the response
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      reviews: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            originalText: { type: Type.STRING, description: "The original text of the review" },
            sentiment: { type: Type.STRING, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"] },
            summary: { type: Type.STRING, description: "A brief one-sentence summary" },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["originalText", "sentiment", "summary", "keywords"]
        }
      },
      frequentComplaints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of top 3 frequent complaints found in the text"
      },
      frequentPraises: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of top 3 frequent praises found in the text"
      }
    },
    required: ["reviews", "frequentComplaints", "frequentPraises"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for consistent analysis
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from AI model");
    }

    const data = JSON.parse(jsonText);

    // Post-process to match our internal types strictly
    const processedReviews = data.reviews.map((r: any) => ({
        originalText: r.originalText,
        sentiment: r.sentiment as Sentiment,
        summary: r.summary,
        keywords: r.keywords || []
    }));

    const sentimentCounts = processedReviews.reduce((acc: any, curr: any) => {
        const key = curr.sentiment.toLowerCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, { positive: 0, negative: 0, neutral: 0 });

    return {
      totalReviews: processedReviews.length,
      sentimentCounts,
      frequentComplaints: data.frequentComplaints || [],
      frequentPraises: data.frequentPraises || [],
      reviews: processedReviews
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze reviews. Please try again.");
  }
};
