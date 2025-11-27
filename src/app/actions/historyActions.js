'use server';
import mongoose from 'mongoose';
import  connectDB  from '@/app/lib/db.js';
import History from '../models/History.js';





export async function storeUserHistory(userId,projectId ) {
 try{
   await connectDB();

  const history =await History.create({ userId, projectId });
  await history.save();

  return { success: true };
  } catch (error) {
    console.error("❌ Error storing user history:", error);
    return { success: false, error: error.message };
  }
}


export async function getUserHistory(userId) {
  try{
    await connectDB();

    const historyWithProjects = await History.aggregate([
           { $match: { userId } },
      {
        $lookup: {
          from: "projects",
          localField: "projectId",
          foreignField: "id",
          as: "projectDetails",
          pipeline: [
            { $project: { title: 1, difficulty: 1, duration: 1, techStack: 1, id: 1 ,isCompleted: 1} }
          ]
        }
      },
      { $unwind: "$projectDetails" },
      { $sort: { createdAt: -1 } }
    ]);
      
      
    return JSON.parse(JSON.stringify(historyWithProjects));

  } catch (error) {
    console.error("❌ Error fetching user history:", error);
    return [];
  }
}