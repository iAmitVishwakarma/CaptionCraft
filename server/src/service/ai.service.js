const { GoogleGenAI } = require("@google/genai");

async function generateCaption(base64ImageFile) {
  console.log(
    "AI service called with image data length:",
    base64ImageFile?.length || 0
  );
  try {
    const ai = new GoogleGenAI({});
    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Generate 2 distinct captions for this image." },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            Caption1: { type: "string" },
            Caption2: { type: "string" },
          },
        },
        systemInstruction: `
          Create 2 visually appealing and descriptive captions for this image.
          Guidelines for each caption:
            - Keep it short and elegant (max 10 words)
            - Add emojis that match the mood or theme
            - Include relevant hashtags to boost discoverability
          
          Return a JSON object with keys "Caption1" and "Caption2".
        `,
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption from AI service.");
  }
}

module.exports = generateCaption;
