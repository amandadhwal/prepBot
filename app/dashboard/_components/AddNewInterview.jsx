"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
// import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";  
import { MockInterview } from "@/utils/schema";
import { useRouter } from "next/navigation";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const [freeLimitReached, setFreeLimitReached] = useState(false); 
    const router = useRouter();
    const { user } = useUser();


    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        // alert(`Position: ${jobPosition}\nDescription: ${jobDesc}\nExperience: ${jobExperience} years`);

        const inputPrompt = `
        You are an AI interview generator.
        
        Job Position: ${jobPosition}
        Job Description: ${jobDesc}
        Years of Experience: ${jobExperience}
        
        Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers.
        
        IMPORTANT RULES:
        - Return ONLY valid JSON
        - Do NOT include explanation
        - Do NOT include markdown
        - Response must be an array
        
        Format example:
        
        [
          {
            "question": "What is React?",
            "answer": "React is a JavaScript library for building user interfaces."
          },
          {
            "question": "What is Node.js?",
            "answer": "Node.js is a runtime environment that allows JavaScript to run on the server."
          }
        ]
        `;
        try {
            // const result = await chatSession.sendMessage(inputPrompt);
            // console.log("AI Response received:", result);
            // let rawResponse = await result.response.text();

            const res = await fetch("/api/generate-interview", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  prompt: inputPrompt,
                  userEmail: user?.primaryEmailAddress?.emailAddress
                })
              });
              
              const data = await res.json();
              
              if (!data.success) {
                if (data.error.includes("Free limit reached")) {
                  setFreeLimitReached(true); // trigger popup
                  setLoading(false);
                  return; // stop execution
                } else {
                  alert(data.error);
                  setLoading(false);
                  return;
                }
              }
              
              let rawResponse = data.data;
              console.log(rawResponse);
            
            console.log("Raw AI Response:", rawResponse);

          
            rawResponse = rawResponse.replace(/```json|```/g, "").trim();

            let parsedJsonResponse;

            try {
                parsedJsonResponse = JSON.parse(rawResponse);
            } catch (jsonError) {
                console.error("Error parsing AI response:", jsonError);
                alert("Invalid JSON received from AI. Please try again.");
                setLoading(false);
                return;
            }

            setJsonResponse(parsedJsonResponse);

            if (Array.isArray(parsedJsonResponse)) {
                const result = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: JSON.stringify(parsedJsonResponse), 
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
                    createdAt: new Date()
                }).returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", result);

                if (result) {
                    setOpenDialog(false);
                    // push to next page
                    router.push('/dashboard/interview/'+result[0]?.mockId)

                }
            } else {
                console.log("Error: No valid AI response received.");
            }
        } catch (error) {
            console.error("Error in AI request:", error);
            if (error.message && error.message.includes("429")) {
                alert("We're currently receiving high traffic! Please wait a moment and try again.");
            } else {
                alert("Something went wrong. Please check your connection or try a shorter prompt.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div 
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:font-bold cursor-pointer transition-all" 
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center">+ Add New Interview</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-2xl">
                            Tell us more about your Job Interview
                        </DialogTitle>
                    </DialogHeader>

                    <h2 className="text-lg font-semibold mb-2">
                        Add details about your Job Position, Description, and Experience
                    </h2>

                    <DialogDescription>Please fill in the required details.</DialogDescription>

                    <form onSubmit={onSubmit}>
                        <div className="mt-4">
                            <div className="my-3">
                                <label className="text-gray-600">Job Role/Position</label>
                                <Input 
                                    className="mt-1" 
                                    required 
                                    placeholder="Ex. Full Stack Developer"
                                    value={jobPosition}
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>

                            <div className="my-3">
                                <label className="text-gray-600">Job Description/Tech Stack (In short)</label>
                                <Textarea 
                                    className="mt-1" 
                                    placeholder="Ex. React, Angular, Node.js, MySQL, etc." 
                                    required  
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>

                            <div className="my-3">
                                <label className="text-gray-600">Years of Experience</label>
                                <Input 
                                    className="mt-1" 
                                    max="50" 
                                    required 
                                    type="number" 
                                    placeholder="Ex. 5"
                                    value={jobExperience}
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-5 justify-end mt-4">
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <LoaderCircle className="animate-spin mr-2" /> Generating from AI...
                                    </>
                                ) : (
                                    "Start Interview"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            
            {freeLimitReached && (
  <Dialog open={freeLimitReached} onOpenChange={setFreeLimitReached}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="font-bold text-xl">
          Free Limit Reached
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4 text-gray-700">
        You have reached the free limit of 5 interviews free tier. 
        Upgrade your plan to continue creating more interviews.
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={() => setFreeLimitReached(false)}>Close</Button>
      </div>
    </DialogContent>
  </Dialog>
)}
        </div>
    );
}

export default AddNewInterview;
