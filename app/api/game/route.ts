import clientPromise from "../lib/mongodb";
import { md5 } from "js-md5";

const createGameId = (combined_ids: string) => {
    let gameId = md5.base64(combined_ids);

    gameId = gameId.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return gameId;
};

export async function GET(request: Request) {
    try {
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

        return Response.json({ data, gameId }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}