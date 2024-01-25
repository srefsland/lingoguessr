import clientPromise from "../../lib/mongodb";

import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        console.log("GET /api/game/[id]/route.ts");
        const id = params.id;

        const client = await clientPromise;
        const db = client.db("lingoguessr");

        const game = await db.collection("generalGame").findOne({ gameId: id });

        if (!game) {
            return Response.json({ error: "Game not found" }, { status: 404 });
        }

        const languageSampleIds = game.languageSampleIds;
        const languageSampleIdsObject = languageSampleIds.map((id: string) => new ObjectId(id));

        const languageSamples = await db.collection("languageSample").find({ _id: { $in: languageSampleIdsObject } }).toArray();

        return Response.json({ languageSamples }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
};