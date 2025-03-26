"use client";

import { useState } from "react";
import Header from "@/app/_components/header";

type GameFinalResultsProps = {
  score: number;
  maxScore: number;
};

export default function GameFinalResultsProps(props: GameFinalResultsProps) {
  const shareUrl = typeof window !== undefined ? window.location.href : "";
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      console.log("Copied to clipboard!");
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const getGrade = (score: number) => {
    switch (score) {
      case 0:
        return "You are really bad at this!";
      case 1:
        return "You are bad at this!";
      case 2:
        return "You are okay at this!";
      case 3:
        return "You are good at this!";
      case 4:
        return "You are really good at this!";
      case 5:
        return "You are amazing at this!";
      default:
        return "I don't know!";
    }
  };

  const buttonStyle = "p-2 mx-1 bg-black rounded";
  const buttonStyleCopied = "p-2 mx-1 bg-green-500 rounded";

  return (
    <div className="grow flex flex-col items-center justify-center h-full">
      <Header text="Game over!" />
      <p className="text-center mb-2">Verdict: {getGrade(props.score)}</p>
      <p className="text-center mb-2">
        Score: {props.score}/{props.maxScore}
      </p>
      <p className="text-center mb-2">Challenge your friends!</p>
      <div className="flex items-center justify-between">
        <input
          className="m-2 p-2 rounded-md"
          type="text"
          value={shareUrl}
          readOnly
        />
        <button
          className={isCopied ? buttonStyleCopied : buttonStyle}
          onClick={copyToClipboard}
        >
          📋
        </button>
      </div>
    </div>
  );
}
