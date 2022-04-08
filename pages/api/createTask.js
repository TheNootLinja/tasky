import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    res.status(200);
    const taskData = JSON.parse(req.body);
    const response = await db.collection('tasks').insertOne(taskData);
}