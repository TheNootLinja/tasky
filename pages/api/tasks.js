import { connectToDatabase } from '../../lib/mongodb';

// declaring/exporting our handler function
export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const data = await db.collection('tasks').find({}).toArray();
    res.json(data);

    // const client = await clientPromise;
    // const db = client.db('tasky-dev-db');
    // switch(req.method) {
    //     case 'POST':
    //         let bodyObject = JSON.parse(req.body);
    //         let newTask = await db.collection('tasks').insertOne(bodyObject);
    //         res.json(newTask.ops[0]);
    //         break;
    //     case 'GET':
    //         const tasks = await db.collection('tasks').find({}).toArray();
    //         res.json({ status: 200, data: tasks});
    //         break;
    // }
}