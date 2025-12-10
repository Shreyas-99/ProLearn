'use server';
import mongoose from 'mongoose';
import connectDB from '../lib/db.js';
import Project from '../models/Project.js';
import { auth } from "@clerk/nextjs/server";

export async function addToBookmarks(project, userId) {
    if (!userId || !project || !project.id) {
    return { success: false, message: 'userId and project.id are required' };
  }
    try {

        await connectDB();

        const newProject = await Project.create({
            ...project,
            title: project.title,
            description: project.description,
            techStack: project.techStack,
            difficulty: project.difficulty,
            whatYouLearn: project.whatYouLearn,
            duration: project.duration,
            userId: userId,
            id: project.id,
            isBookmarked: true
        });
        await newProject.save();

        return { success: true, message: 'project added successfully!' };
    } catch (error) {
        console.error("❌ Error adding project:", error);
        return { success: false, message: 'Error adding project' };
    }
}


export async function getBookmarks() {
    try {
        await connectDB();

        const projects = await Project.find({
            userId: userId,
            isBookmarked: true
        }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(projects)); // serialize for client
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
        return [];
    }
}



