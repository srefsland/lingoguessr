"use client";

import { useState, useEffect } from 'react';
import GameRoundScreen from './components/round-screen';
import GameResultScreen from './components/result-screen';
import GameFinalResults from './components/final-results';
import { loadGame } from '@/actions';
import { redirect } from 'next/navigation';

export default function Game({ params }: { params: { id: string } }) {
    const gameId = params.id;

    const [languageSamples, setLanguageSamples] = useState<LanguageSample[]>([]);
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
            } else {
                redirect('/not-found');
            }
        })
    }, [gameId]);

    const handleOnClickRound = (isCorrect: boolean) => {
        if (isCorrect) {
            setIsCorrect(true);
            setScore(score + 1);
        } else {
            setIsCorrect(false);
        }
        setIsRound(false);
    };

    const handleOnClickNextRound = () => {
        setRoundNumber(roundNumber + 1);
        setIsRound(true);
    }

    const renderLoadingContent = () => {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-4xl">Loading...</h1>
            </div>
        );
    };

    const renderRoundContent = () => {
        const currentSample = languageSamples[roundNumber];
        return (
            <GameRoundScreen
                language={currentSample.language}
                audioUrl={currentSample.audioUrl}
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
            />
        );
    };

    const renderGameOverContent = () => {
        return (
            <GameFinalResults
                score={score}
                maxScore={maxScore}
            />
        )
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
};