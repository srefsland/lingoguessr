"use client";

import GameButton from "@/components/game-button";
import Header from "@/components/header";

type GameResultProps = {
    isCorrect: boolean;
    handleOnClickNextRound: () => void;
    score: number;
    maxScore: number;
    roundNumber: number;
}

export default function GameResultScreen(props: GameResultProps) {
    return (
        <div className="grow flex flex-col items-center justify-center h-full">
            <Header text={`Result round ${props.roundNumber + 1}`} />
            <div className="m-4">
                <p className="text-center mb-2">{props.isCorrect ? "Correct!" : "Incorrect!"}</p>
                <p className="text-center mb-2">Score: {props.score}/{props.maxScore}</p>
            </div>
            <GameButton handleOnClick={props.handleOnClickNextRound} buttonLabel={props.roundNumber + 1 === 5 ? "Final results" : "Next round"} />
        </div>
    )
}