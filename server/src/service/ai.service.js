const { GoogleGenAI } = require("@google/genai");

async function generateCaption(base64ImageFile) {
console.log("AI service called with image data length:", base64ImageFile?.length || 0);
  try {
    const ai = new GoogleGenAI({});
    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Caption this image." },
    ];
         const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
         systemInstruction: `
         Create a visually appealing and descriptive caption for this image.
          Guidelines:
            - Keep it short and elegant (max 10 words)
            - Add emojis that match the mood or theme
            - Include relevant hashtags to boost discoverability
         `,}
      });

  return response.text;
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption from AI service.");
  }
}

module.exports = generateCaption;
