
import { GoogleGenAI, Type } from "@google/genai";
import { FactCheckResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const verifyNews = async (text: string): Promise<FactCheckResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Hãy đóng vai một chuyên gia kiểm chứng tin tức tại Việt Nam. 
      Nhiệm vụ của bạn là phân tích đoạn văn bản hoặc tin tức sau đây: "${text}"
      
      Hãy xác định xem đây là tin giả (Fake News) hay tin chính thống dựa trên kiến thức hiện tại của bạn và sử dụng công cụ tìm kiếm nếu cần thiết.
      
      Trả về kết quả ở định dạng JSON với các trường:
      - isAuthentic: boolean (true nếu là tin thật, false nếu là tin giả hoặc nghi ngờ)
      - reliabilityScore: number (0-100)
      - analysis: string (Phân tích chi tiết bằng tiếng Việt, giải thích tại sao tin này thật hoặc giả)
      - sources: mảng các đối tượng { title: string, url: string } liệt kê các nguồn tin uy tín (như Dân Trí, Tuổi Trẻ, VnExpress, Cổng thông tin Chính phủ) để kiểm chứng.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isAuthentic: { type: Type.BOOLEAN },
          reliabilityScore: { type: Type.NUMBER },
          analysis: { type: Type.STRING },
          sources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING }
              },
              required: ["title", "url"]
            }
          }
        },
        required: ["isAuthentic", "reliabilityScore", "analysis", "sources"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Không thể phân tích tin tức lúc này.");
  }
};

export const summarizeNews = async (title: string, content: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Tóm tắt ngắn gọn tin tức sau trong khoảng 2-3 câu ngắn gọn và súc tích bằng tiếng Việt:\n\nTiêu đề: ${title}\nNội dung: ${content}`,
  });
  return response.text || "Không có tóm tắt.";
};
