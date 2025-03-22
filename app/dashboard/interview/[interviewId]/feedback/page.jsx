"use client";

import { UserAnswer } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { useParams, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function Feedback() {
  const params = useParams();
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [openItems, setOpenItems] = useState({});
  const [overallRating, setOverallRating] = useState("0.0");

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    if (!params?.interviewId) {
      console.error("Error: interviewId is missing in params!");
      return;
    }

    const interviewId = String(params.interviewId);

    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      console.log("Feedback Data:", result);
      setFeedbackList(result);

      // Calculate the overall rating dynamically
      const validRatings = result
        .map((item) => Number(item.rating))
        .filter((rating) => !isNaN(rating) && rating >= 0);

      if (validRatings.length > 0) {
        const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
        const avgRating = (totalRating / validRatings.length).toFixed(1);
        setOverallRating(avgRating);
      } else {
        setOverallRating("0.0");
      }
    } catch (error) {
      console.error("Database error:", error);
      setOverallRating("0.0");
    }
  };

  const toggleItem = (index) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const renderStars = (rating, maxRating = 5) => {
    const validRating = Math.max(0, Math.min(maxRating, Math.round(rating))); // Ensure rating is within bounds
    const stars = "★".repeat(validRating) + "☆".repeat(maxRating - validRating);
    return <span className="text-yellow-500 font-bold">{stars} ({validRating}/{maxRating})</span>;
  };

  return (
    <div className="p-10">
    {
      feedbackList?.length==0?
        <h2 className="font-bold text-xl text-gray-400">No Interview found</h2>
      :
      <>
     
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-blue-900 text-lg my-3">
        Your overall interview rating: <strong>{overallRating}/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below the interview questions with correct answers, your answers, and feedback for improvement.
      </h2>

      {feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <Collapsible 
            key={index} 
            open={!!openItems[index]} 
            onOpenChange={() => toggleItem(index)}
            className="mt-7"
          >
            <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 flex justify-between text-left gap-7 w-full">
              {item.question}
              <ChevronsUpDown className={`h-5 w-5 transition-transform ${openItems[index] ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded flex items-center gap-2">
                  <strong>Rating:</strong> {renderStars(item.rating, 5)}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-100 text-sm text-red-900">
                  <strong>Your Answer: </strong> {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-200 text-sm text-green-900">
                  <strong>Correct Answer: </strong> {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-300 text-sm text-blue-900">
                  <strong>Feedback: </strong> {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-gray-500 mt-5">No feedback available.</p>
      )}
       </>
    }

      <Button className="mt-5 bg-blue-500" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
