"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {QuestionSection} from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

function StartInterview() {
    const params = useParams();
    
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const GetInterviewDetails = useCallback(async () => {
        if (!params.interviewId) return;
        
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            
            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    }, [params.interviewId]);

    useEffect(() => {
        GetInterviewDetails();
    }, [GetInterviewDetails]);

    return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <QuestionSection 
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex={activeQuestionIndex} 
            />
            <RecordAnswerSection 
                mockInterviewQuestion={mockInterviewQuestion} 
                activeQuestionIndex={activeQuestionIndex} 
                interviewData = {interviewData}
            />
        </div>
        <div className="flex justify-end gap-6">
            {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}className="bg-blue-700 w-32 ">Prevous Question</Button>}
            {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}className="bg-blue-700 w-32 ">Next Question</Button>}
            {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
            <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}><Button className="bg-blue-700 w-32 ">End Question</Button></Link>}



        </div>

    </div>
    );
}

export default StartInterview;