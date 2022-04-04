import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    const taskData = req.body;

    // const response = await db.collection('tasks').insertOne(taskData);
    console.log(taskData);

    // res.json(response);
}