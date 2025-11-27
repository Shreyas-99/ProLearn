'use server';
import mongoose from 'mongoose';
import  connectDB  from '../lib/db.js';
import Project from '../models/Project.js';
import { auth } from "@clerk/nextjs/server";






export async function addProject(project,userId) {
  try{
    
    await connectDB();
  
  const newProject = await Project.create({ ...project,
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    difficulty: project.difficulty,
    whatYouLearn: project.whatYouLearn,
    duration: project.duration,
    userId: userId,
    id:project.id
   });
  await newProject.save();

  return { success: true, message: 'project added successfully!' };
  } catch (error) {
    console.error("❌ Error adding project:", error);
    return { success: false, message: 'Error adding project' };
  }
}


export async function getProjects() {
  try {
  await connectDB();

  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects)); // serialize for client
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
}

export async function getSingleProject(projectId) {
  try{
  await connectDB();

  const project = await Project.findOne({ id: projectId }).lean();
  return JSON.parse(JSON.stringify(project)); // serialize for client
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    return null;
  }

}

export async function updateProjectStatus(projectId, status) {
  try {
    await connectDB();
    const updatedProject = await Project.findOneAndUpdate(
      { id: projectId },
      { isCompleted: status }, 
      { new: true }
    );
    await updatedProject.save();
    return JSON.parse(JSON.stringify(updatedProject)); 
  } catch (error) {
    console.error("❌ Error updating project status:", error);
    return null;
  }
} 