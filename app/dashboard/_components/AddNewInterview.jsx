"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // ✅ Import Button
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");

    const onSubmit = (e) => {
        e.preventDefault(); // ✅ Fixed missing parentheses
        alert(`Position: ${jobPosition}\nDescription: ${jobDesc}\nExperience: ${jobExperience} years`);
    };

    return (
        <div>
            <div 
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:font-bold cursor-pointer transition-all" 
                onClick={() => setOpenDailog(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>

            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-bold text-2xl">Tell us more about your Job Interview</DialogTitle>
                    </DialogHeader>

                    {/* ✅ Moved h2 outside DialogDescription */}
                    <h2 className="text-lg font-semibold mb-2">Add details about your Job Position, Description, and Experience</h2>

                    <DialogDescription>
                        Please fill in the required details.
                    </DialogDescription>

                    <form onSubmit={onSubmit}>
                        <div className="mt-4">
                            <div className="my-3">
                                <label className="text-gray-600">Job Role/Position</label>
                                <Input 
                                    className="mt-1" 
                                    required 
                                    placeholder="Ex. Full Stack Developer"
                                    value={jobPosition}
                                    onChange={(event) => setJobPosition(event.target.value)}
                                />
                            </div>

                            <div className="my-3">
                                <label className="text-gray-600">Job Description/ Tech Stack (In short)</label>
                                <Textarea 
                                    className="mt-1" 
                                    placeholder="Ex. React, Angular, Node.js, MySQL, etc." 
                                    required  
                                    value={jobDesc}
                                    onChange={(event) => setJobDesc(event.target.value)}
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
                                    onChange={(event) => setJobExperience(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-5 justify-end mt-4">
                            <Button type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                            <Button type="submit">Start Interview</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
