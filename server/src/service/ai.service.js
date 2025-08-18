const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function generateCaption(base64ImageFile) {
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
  `,
}
});
return response.text;
}


module.exports = generateCaption
