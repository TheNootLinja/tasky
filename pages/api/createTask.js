import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const taskData = JSON.parse(req.body);
    await db.collection('tasks').insertOne(taskData, function(err, tasksCreated) {
        const createdTaskID = tasksCreated.insertedId.toString();
        return res.json({taskID: createdTaskID})
    });
}