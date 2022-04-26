import { connectToDatabase } from '../../lib/mongodb';

// declaring/exporting our handler function
export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const data = await db.collection('tasks').find({}).toArray();
    res.json(data);
};