"use client";
import { MockInterview } from "@/utils/schema";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Import useParams()
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview() {
    const params = useParams(); //Unwrap params properly
    const interviewId = params.interviewId; //  Now it's safe to use

    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails();
        }
    }, [interviewId]); // ✅ Depend on interviewId

    // Fetch interview details by mockId
    const GetInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));

        setInterviewData(result[0]);
    };

    return (
        <div className="my-10 ">
            <h2 className="font-bold text-2xl">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           
            <div className="flex flex-col my-7 gap-5 ">
                <div className="flex flex-col p-5 rounded-lg border gap-5">
                    <h2 className="text-lg">
                        <strong>Job Role/Job Position:</strong> {interviewData?.jobPosition}
                    </h2>
                    <h2 className="text-lg">
                        <strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc}
                    </h2>
                    <h2 className="text-lg">
                        <strong>Years of Experience:</strong> {interviewData?.jobExperience}
                    </h2>
                </div>

                <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                   <h2 className="flex gap-2 my-3 item-center text-yellow-500"> <Lightbulb/><strong>Information</strong></h2>
                   <h2 className="mt-3 text-yellow-500" >{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>



            </div>

            <div>
                {webCamEnabled ? (
                    <Webcam
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 300
                        }}
                    />
                ) : (
                    <>
                        <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                        <Button variant="ghost" className="w-full bg-gray-300" onClick={() => setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
                    </>
                )}
            </div>

            </div>
            
            <div className="flex justify-end items-end">
    <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button className="bg-blue-700 w-32">Start Interview</Button>
    </Link>
</div>

           

            
        </div>
    );
}

export default Interview;
