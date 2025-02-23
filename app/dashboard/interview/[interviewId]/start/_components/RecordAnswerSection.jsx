"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

// Import useSpeechToText dynamically (only in the browser)
const useSpeechToText = typeof window !== "undefined" ? require("react-hook-speech-to-text").default : () => ({});

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText
    ? useSpeechToText({
        continuous: true,
        useLegacyResults: false,
      })
    : {};

  useEffect(() => {
    if (results) {
      setUserAnswer(results.map((r) => r.transcript).join(" "));
    }
  }, [results]);

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

      <Button variant="outline" className="my-10" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
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

export default RecordAnswerSection;
