"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";

// Import useSpeechToText dynamically (only in the browser)
const useSpeechToText = typeof window !== "undefined" ? require("react-hook-speech-to-text").default : () => ({});

function RecordAnswerSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer, setUserAnswer] = useState("");
  const {user} = useUser();
  const [loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText
    ? useSpeechToText({
        continuous: true,
        useLegacyResults: false,
      })
    : {};

    useEffect(()=>{
      results?.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  },[results])
  // useEffect(() => {
  //   if (results) {
  //     setUserAnswer(results.map((r) => r.transcript).join(" "));
  //   }
  // }, [results]);

  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10)
    {
      UpdateUserAnswer();
    }
  },[userAnswer])

  const StartStopRecording=async()=>{
    if(isRecording)
    {
      stopSpeechToText()

      // if(userAnswer?.length<5)
      // { 
      //   setLoading(false);
      //   console.log(userAnswer.length);
      //   toast('error while saving your error plz record again')
      //   return ;
      // }
      //   // feedbackPrompt
      // const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+",User answer:"+userAnswer+",Depends on question and user answer for given interview question"+"please give us rating for answer and feedback as area of improvement if any"+"in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      // const result=await chatSession.sendMessage(feedbackPrompt);
      // const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');

      // console.log(mockJsonResp);
      // const JsonFeedbackResp = JSON.parse(mockJsonResp);
       
      // // here we store user answer and feedback in database(UserAnswer)
      // const resp= await db.insert(UserAnswer)
      // .values({
      //   mockIdRef: interviewData?.mockId,
      //   question:mockInterviewQuestion[activeQuestionIndex]?.question,
      //   correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
      //   userAns:userAnswer,
      //   feedback:JsonFeedbackResp?.feedback,
      //   rating:JsonFeedbackResp?.rating,
      //   userEmail:user?.primaryEmailAddress?.emailAddress,
      //   createdAt:moment().format('DD-MM-YYYY')
      // })

      // if(resp)
      // {
      //   toast('User Answer recorded successfully')
      // }
      // setUserAnswer('');
      //  setLoading(false);
    }else
    {
      startSpeechToText()
    }
  }

  const UpdateUserAnswer=async()=>{
      // feedbackPrompt
      setLoading(true);

      const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+",User answer:"+userAnswer+",Depends on question and user answer for given interview question"+"please give us rating for answer and feedback as area of improvement if any"+"in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result=await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');

      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
       
      // here we store user answer and feedback in database(UserAnswer)
      const resp= await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-YYYY')
      })

      if(resp)
      {
        toast('User Answer recorded successfully')
        setUserAnswer('');
        setResults([]);
      }
      // setUserAnswer('');
      setResults([]);
       setLoading(false);

  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col bg-black mt-20 mx-20 justify-center items-center rounded-lg p-2 relative">
        <Image
          src={"/webCam.png"}
          width={200}
          height={200}
          alt="uploading img"
          className="absolute top-13 z-5"
        />
        <Webcam mirrored={true} style={{ height: 300, width: "100%", zIndex: 10 }} />
      </div>

      <Button disabled={loading} variant="outline" className="my-10 text-blue-900 " onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      { <Button className="bg-blue-500" onClick={() => console.log("User Answer:", userAnswer)}>
        Show User Answer
      </Button> }
    </div>
  );
}

export default RecordAnswerSection;
