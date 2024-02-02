"use client";

import React, { useState } from "react";
import GameButton from "@/components/game-button";
import Header from "@/components/header";

type GameRoundScreenProps = {
    language?: string;
    audioUrl?: string;
    handleOnRoundClick: (chosenLanguage: string) => void;
    roundNumber: number;
}

export default function GameRoundScreen(props: GameRoundScreenProps) {
    const [chosenLanguage, setChosenLanguage] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const handleOnChangeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChosenLanguage(event.target.value);
    }

    const handleOnClick = () => {
        props.handleOnRoundClick(chosenLanguage);
    }

    const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleOnClick();
        }
    }

    const handleOnPlayAudio = () => {
        const audio = document.querySelector("audio");
        if (!isPlaying) {
            audio?.play();
        } else {
            audio?.pause();
        }

        setIsPlaying(!isPlaying);
    }

    return (
        <div className="grow flex flex-col items-center justify-center h-full">
            <Header text={`Round ${props.roundNumber + 1}`} />
            <div className="flex flex-col items-center justify-center">
                <h2 className="m-2">Guess the language!</h2>

                <audio src={props.audioUrl} />
                <form>
                    <input className="m-4 p-2 rounded" type='text' value={chosenLanguage} onChange={handleOnChangeSelect} onKeyDown={handleOnEnter} autoFocus />
                </form>
                <div className="flex gap-2">
                    <button className="mb-2 px-4 py-2 text-2xl rounded-md bg-black text-white" onClick={handleOnPlayAudio}>
                        {!isPlaying ? "⏵" : "⏸"}
                    </button>
                    <GameButton handleOnClick={handleOnClick} buttonLabel="Guess" />
                </div>

            </div>
        </div>
    );
};
