// src/service/ai.service.js
const { GoogleGenerativeAI } = require("@google/genai");

// Make sure to set the GOOGLE_API_KEY environment variable on your Render dashboard.
// Without this, the application will not be able to authenticate with the AI service.
const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateCaption(base64ImageFile) {
  try {
    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Caption this image." },
    ];

    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        systemInstruction: `
          Create a visually appealing and descriptive caption for this image.
          Guidelines:
          - Keep it short and elegant (max 10 words)
          - Add emojis that match the mood or theme
          - Include relevant hashtags to boost discoverability
        `,
      },
    });

    const response = await model.generateContent({ contents });

    return response.response.text();
  } catch (error) {
    console.error("Error generating caption:", error);
    // You can throw the error or return a specific message
    throw new Error("Failed to generate caption from AI service.");
  }
}

module.exports = generateCaption;
