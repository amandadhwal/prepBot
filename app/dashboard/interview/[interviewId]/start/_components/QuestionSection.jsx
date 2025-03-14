"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic, Lightbulb, Volume2 } from "lucide-react";
import { toast } from "sonner";
import classNames from "classnames";

// Import useSpeechToText dynamically (only in the browser)
const useSpeechToText = typeof window !== "undefined" ? require("react-hook-speech-to-text").default : null;

function RecordAnswerSection({ mockInterviewQuestion = [], activeQuestionIndex }) {
  const [userAnswer, setUserAnswer] = useState("");

  const speechToText = useSpeechToText
    ? useSpeechToText({ continuous: true, useLegacyResults: false })
    : null;

  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText } =
    speechToText || {};

  useEffect(() => {
    if (results && results.length > 0) {
      setUserAnswer(results.map((r) => r.transcript).join(" "));
    }
  }, [results]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (!userAnswer || userAnswer.length < 5) {
        toast.error("Error while saving your answer, please record again.");
        return;
      }

      if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
        toast.error("No interview question available.");
        return;
      }

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User answer: ${userAnswer}. Based on the given interview question and user's answer, please provide a rating and feedback in JSON format with 'rating' and 'feedback' fields (3-5 lines).`;

      try {
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (await result.response.text()).replace("```json", "").replace("```", "");
        console.log(mockJsonResp);
      } catch (error) {
        console.error("Error generating feedback:", error);
      }
    } else {
      startSpeechToText();
    }
  };

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

      <Button variant="outline" className="my-10" onClick={SaveUserAnswer}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      <Button className="bg-blue-500" onClick={() => console.log("User Answer:", userAnswer)}>
        Show User Answer
      </Button>
    </div>
  );
}

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  mockInterviewQuestion = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];

  const textToSpeech = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  };

  let currentQuestion = null;

  if (mockInterviewQuestion.length > 0) {
    currentQuestion = mockInterviewQuestion[activeQuestionIndex];
  }

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockInterviewQuestion.map((question, index) => (
          <div key={question.id || `question-${index}`}> 
            <h2
              className={classNames(
                "p-2 rounded-full text-xs md:text-sm text-center cursor-pointer",
                {
                  "bg-blue-500 text-white": activeQuestionIndex === index,
                  "bg-secondary": activeQuestionIndex !== index
                }
              )}
            >
              Question. {index + 1}
            </h2>
          </div>
        ))}
      </div>

      {currentQuestion ? (
        <h2 className="my-8 mx-1 text-md md:text-lg">
          {currentQuestion.question}
          <Volume2 onClick={() => textToSpeech(currentQuestion.question)} className="cursor-pointer mt-2" />
        </h2>
      ) : (
        <h2 className="my-5 text-md md:text-lg text-gray-500">No questions available</h2>
      )}

      <div className="border rounded-lg p-5 bg-yellow-100 mt-10">
        <h2 className="flex gap-2 items-center text-yellow-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-yellow-700 my-2">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
    </div>
  );
}

export { RecordAnswerSection, QuestionSection };