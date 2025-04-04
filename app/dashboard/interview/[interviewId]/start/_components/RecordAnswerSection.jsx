"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic, Save } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";

// Import useSpeechToText dynamically (only in the browser)
const useSpeechToText = typeof window !== "undefined" ? require("react-hook-speech-to-text").default : () => ({});

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
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

  // Effect to handle speech recognition results
  useEffect(() => {
    if (results?.length > 0) {
      // Show typing animation when new speech is detected
      setIsTyping(true);
      
      // Update the answer with the latest transcript
      const latestResult = results[results.length - 1]?.transcript || "";
      setUserAnswer(prevAns => {
        // Only add space if there's already content
        return prevAns ? `${prevAns} ${latestResult}` : latestResult;
      });
      
      // Stop typing animation after a short delay
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [results]);

  // Auto-submit if recording stops and answer is substantial
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      // Clear previous answer when starting a new recording
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    if (loading || userAnswer.trim().length < 10) return;
    
    setLoading(true);

    try {
      const feedbackPrompt = "Question:" + mockInterviewQuestion[activeQuestionIndex]?.question + 
                            ",User answer:" + userAnswer + 
                            ",Depends on question and user answer for given interview question" + 
                            "please give us rating for answer and feedback as area of improvement if any" + 
                            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
      
      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
       
      // Store user answer and feedback in database
      const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY')
      });

      if(resp) {
        toast('Answer submitted successfully');
        setUserAnswer('');
        setResults([]);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error('Failed to submit answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to manually edit the answer
  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  return (
    <div className="flex justify-center items-center flex-col w-full max-w-3xl mx-auto">
      <div className="flex flex-col bg-black mt-20 mx-4 sm:mx-20 justify-center items-center rounded-lg p-2 relative w-full">
        <Image
          src={"/webCam.png"}
          width={200}
          height={200}
          alt="webcam placeholder"
          className="absolute top-13 z-5"
        />
        <Webcam mirrored={true} style={{ height: 300, width: "100%", zIndex: 10 }} />
      </div>

      <div className="flex gap-4 my-6">
        <Button 
          disabled={loading} 
          variant={isRecording ? "destructive" : "outline"} 
          className="text-blue-900" 
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <div className="flex items-center gap-2 text-white">
              <Mic className="animate-pulse" /> Stop Recording
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Mic /> Record Answer
            </div>
          )}
        </Button>
        
        {userAnswer.length > 10 && !isRecording && (
          <Button 
            onClick={UpdateUserAnswer} 
            disabled={loading} 
            variant="default"
            className="bg-green-600 hover:bg-green-700"
          >
            <div className="flex items-center gap-2">
              <Save size={18} /> 
              {loading ? "Submitting..." : "Submit Answer"}
            </div>
          </Button>
        )}
      </div>

      {/* Dynamic Answer Display */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full border border-gray-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800">Your Answer:</h3>
          {isTyping && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full animate-pulse">
              Transcribing...
            </span>
          )}
        </div>
        
        {userAnswer ? (
          <div className="relative">
            <textarea
              value={userAnswer}
              onChange={handleAnswerChange}
              className="w-full min-h-32 p-3 text-gray-700 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your answer will appear here..."
              disabled={isRecording || loading}
            />
            {isTyping && (
              <div className="absolute bottom-3 right-3 flex gap-1">
                <span className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></span>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500 bg-white rounded border border-dashed border-gray-300">
            {isRecording ? (
              <p>Speak now... your answer will appear here</p>
            ) : (
              <p>Click "Record Answer" to start responding to the question</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecordAnswerSection;