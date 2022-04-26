import { connectToDatabase } from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectID;
export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const bodyData = JSON.parse(req.body);
    const taskId = bodyData.taskId;
    await db.collection('tasks').deleteOne({"_id": ObjectId(taskId)});
    res.status(200).json({message: "Success"});
}