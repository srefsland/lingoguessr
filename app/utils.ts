import clientPromise from "@/lib/mongodb";
import { md5 } from "js-md5";
import { ObjectId } from "mongodb";

const createGameId = (combined_ids: string) => {
    let gameId = md5.base64(combined_ids);

    gameId = gameId.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return gameId;
};

export async function createGame() {
    const client = await clientPromise;
    const db = client.db("lingoguessr");

    const data = await db.collection("languageSample").aggregate([
        {
            $sample: { size: 5 }
        }
    ]).toArray();

    const combinedIds = data.map((languageSample: any) => languageSample._id.toString());
    const combinedIdsString = combinedIds.join("");
    const gameId = createGameId(combinedIdsString);

    await db.collection("generalGame").findOneAndUpdate(
        { gameId: gameId },
        { $setOnInsert: { gameId, languageSampleIds: combinedIds } },
        { upsert: true }
    );

    return gameId;
}

export async function getGame(gameId: string) {
    const client = await clientPromise;
    const db = client.db("lingoguessr");

    const game = await db.collection("generalGame").findOne({ gameId: gameId });

    if (!game) {
        throw new Error("Game not found");
    }

    const languageSampleIds = game.languageSampleIds;
    const languageSampleIdsObject = languageSampleIds.map((id: string) => new ObjectId(id));

    const languageSamples = await db.collection("languageSample").find({ _id: { $in: languageSampleIdsObject } }).toArray();

    return languageSamples;
}