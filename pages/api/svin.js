import clientPromise from "/lib/mongodb";
import {ObjectID} from "mongodb";


export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix")
    switch (req.method) {
        case "PUT":
            let bodyObject = JSON.parse(req.body);
            let newCounter = await db.collection("counters").updateOne({_id: new ObjectID('624eea1d113c5bb1bc539dfa')}, {$set: bodyObject}, {upsert: true});
            res.json(newCounter);
            break;
        case "GET":
            const counters = await db.collection("counters").find({}).toArray();
            res.json({data: counters});
            break;
    }
}

