import clientPromise from "/lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix")
    switch (req.method) {
        case "GET":
            const counters = await db.collection("counters").find({}).toArray();
            res.json({  data: counters });
            break;
    }
}

