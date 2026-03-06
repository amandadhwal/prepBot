// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");
  
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
//   const genAI = new GoogleGenerativeAI(apiKey);
//   console.log("Gemini AI initialized successfully",genAI);
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//     export const chatSession = model.startChat({
//       generationConfig,
//     });
  
  
  
// //   run();