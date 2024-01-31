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

    const maxScore = 5;

    useEffect(() => {
        loadGame(gameId).then((data) => {
            if (data) {
                setLanguageSamples(data);
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

    const renderRoundContent = () => {
        if (isRound && roundNumber < languageSamples.length) {
            const currentSample = languageSamples[roundNumber];
            return (
                <GameRoundScreen
                    language={currentSample.language}
                    audioUrl={currentSample.audioUrl}
                    handleOnRoundClick={handleOnClickRound}
                    roundNumber={roundNumber}
                />
            );
        }
    };

    const renderResultContent = () => {
        if (!isRound && roundNumber < languageSamples.length) {
            return (
                <GameResultScreen
                    isCorrect={isCorrect}
                    handleOnClickNextRound={handleOnClickNextRound}
                    score={score}
                    maxScore={maxScore}
                    roundNumber={roundNumber}
                />
            );
        }
    };

    const renderGameOverContent = () => {
        if (roundNumber >= languageSamples.length) {
            return (
                <GameFinalResults
                    score={score}
                    maxScore={maxScore}
                />
            )
        }
    };

    return (
        <>
            {renderRoundContent()}
            {renderResultContent()}
            {renderGameOverContent()}
        </>
    );
};