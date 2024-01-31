"use server";

import { redirect } from "next/navigation";
import { createGame, getGame } from "@/utils";

export async function createNewGame() {
    const gameId = await createGame();

    redirect(`/game/${gameId}`);
}

export async function loadGame(gameId: string): Promise<LanguageSample[]> {
    const game = await getGame(gameId);

    const transformedGame = game.map((languageSample: any) => {
        return {
            language: languageSample.language,
            audioUrl: languageSample.audioUrl
        };
    });

    return transformedGame;
}