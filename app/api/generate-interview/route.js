import OpenAI from "openai";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    // const { prompt } = await req.json();
    const { prompt, userEmail } = await req.json();
    if (!userEmail) {
        return Response.json({
          success: false,
          error: "User not authenticated"
        });
      }
    // 🔹 Count interviews created by user
    const interviews = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, userEmail));
    console.log(`User ${userEmail} has created ${interviews.length} interviews.`);
    // 🔹 Limit check
    if (interviews.length >= 5) {
      return Response.json({
        success: false,
        error: "Free limit reached. Only 5 interviews allowed.",
      });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",   // ✅ FIXED MODEL
      messages: [
        {
          role: "system",
          content: "Return interview questions in JSON format only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return Response.json({
      success: true,
      data: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}