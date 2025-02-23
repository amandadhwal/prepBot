"use client"
import dynamic from "next/dynamic";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
function StartInterview()
{
    const params = useParams();  // ✅ Get params properly

    const [inteviewData,setInterviewData] =useState();
    const [mockInterviewQuestion,setMockInterviewQuestion] = useState();
    const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[]);

     const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
    };
    return(
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* {   Question */}
                <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                />
            {/* { Video/audio recording} */}
            <RecordAnswerSection/>

        </div>
    )
}
export default StartInterview;