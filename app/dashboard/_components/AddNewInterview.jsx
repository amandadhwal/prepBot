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
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db"; // Adjust the import path as needed
import { MockInterview } from "@/utils/schema"; // If `MockInterview` is a table schema

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        alert(`Position: ${jobPosition}\nDescription: ${jobDesc}\nExperience: ${jobExperience} years`);

        const inputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this information, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with their answers in JSON format. Provide a JSON object with 'question' and 'answer' fields.`;

        try {
            const result = await chatSession.sendMessage(inputPrompt);
            let rawResponse = await result.response.text();

            // Debug: Log raw AI response before processing
            console.log("Raw AI Response:", rawResponse);

            // Remove potential markdown formatting (```json ... ```)
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

            if (parsedJsonResponse) {
                const result = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: JSON.stringify(parsedJsonResponse), // Store as string
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
                    createdAt: new Date()
                }).returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", result);

                if (result) {
                    setOpenDialog(false);
                }
            } else {
                console.log("Error: No valid AI response received.");
            }
        } catch (error) {
            console.error("Error in AI request:", error);
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
                <h2 className="text-lg text-center">+ Add New</h2>
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
        </div>
    );
}

export default AddNewInterview;
