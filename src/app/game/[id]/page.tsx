"use client";

import { useState, useEffect } from "react";
import GameRoundScreen from "./_components/round-screen";
import GameResultScreen from "./_components/result-screen";
import GameFinalResults from "./_components/final-results";
import { loadGame } from "@/app/actions";
import { redirect } from "next/navigation";

export default function Game({ params }: { params: { id: string } }) {
  const gameId = params.id;

  const [languageSamples, setLanguageSamples] = useState<LanguageSample[]>([]);
  const [currentLanguageSample, setCurrentLanguageSample] =
    useState<LanguageSample>();
  const [languageChosen, setLanguageChosen] = useState("");
  const [roundNumber, setRoundNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [isRound, setIsRound] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const maxScore = 5;

  useEffect(() => {
    loadGame(gameId).then((data) => {
      if (data) {
        setLanguageSamples(data);
        setIsLoading(false);
        setCurrentLanguageSample(data[0]);
      } else {
        redirect("/not-found");
      }
    });
  }, [gameId]);

  const handleOnClickRound = (chosenLanguage: string) => {
    if (
      chosenLanguage.toLowerCase() ===
      languageSamples[roundNumber].language.toLowerCase()
    ) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
    setIsRound(false);
    setLanguageChosen(chosenLanguage);
  };

  const handleOnClickNextRound = () => {
    setCurrentLanguageSample(languageSamples[roundNumber + 1]);
    setRoundNumber(roundNumber + 1);
    setIsRound(true);
  };

  const renderLoadingContent = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl">Loading...</h1>
      </div>
    );
  };

  const renderRoundContent = () => {
    return (
      <GameRoundScreen
        language={currentLanguageSample?.language}
        audioUrl={currentLanguageSample?.audioUrl}
        handleOnRoundClick={handleOnClickRound}
        roundNumber={roundNumber}
      />
    );
  };

  const renderResultContent = () => {
    return (
      <GameResultScreen
        isCorrect={isCorrect}
        handleOnClickNextRound={handleOnClickNextRound}
        score={score}
        maxScore={maxScore}
        roundNumber={roundNumber}
        languageChosen={languageChosen}
        languageActual={languageSamples[roundNumber].language}
      />
    );
  };

  const renderGameOverContent = () => {
    return <GameFinalResults score={score} maxScore={maxScore} />;
  };

  let content;

  if (isLoading) {
    content = renderLoadingContent();
  } else if (isRound && roundNumber < languageSamples.length) {
    content = renderRoundContent();
  } else if (!isRound && roundNumber < languageSamples.length) {
    content = renderResultContent();
  } else {
    content = renderGameOverContent();
  }

  return content;
}
