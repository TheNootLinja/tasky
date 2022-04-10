import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const projectData = JSON.parse(req.body);
    await db.collection('projects').insertOne(projectData, function(err, projectCreated) {
        const createdProjectID = projectCreated.insertedId.toString();
        return res.json({projectID: createdProjectID})
    });
}