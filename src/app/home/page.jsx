'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Clock, Bookmark, TrendingUp, Filter, Search, Star, ExternalLink, ChevronRight, Zap, Users, Target, Play, CheckCircle, AlertCircle } from 'lucide-react';
import HistoryFooter from '@/components/HistoryFooter';
import HistoryCard from '@/components/HistoryCard';
import RecommendationCard from '@/components/RecommendationCard';

import { redirect } from "next/navigation";
import { getAuth } from "@clerk/nextjs/server";
import { SignedOut } from '@clerk/nextjs'
import RecommendationHeader from '@/components/RecommendationHeader';





export default  function page() {

//   useEffect(async() => {
    
//     const { userId } =  await getAuth(); // works on server
//    if (!userId) redirect("/"); 

 
  
// }, [])


  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

  const historyItems = [
    { id: 1, title: "Weather Dashboard App", tech: "React, API", progress: 100, date: "2 days ago", rating: 5, status: "completed" },
    { id: 2, title: "E-commerce Cart System", tech: "Next.js, Stripe", progress: 75, date: "5 days ago", rating: 4, status: "in-progress" },
    { id: 3, title: "Task Management Tool", tech: "Vue.js, Firebase", progress: 100, date: "1 week ago", rating: 5, status: "completed" },
    { id: 4, title: "Portfolio Website", tech: "HTML, CSS, JS", progress: 100, date: "2 weeks ago", rating: 4, status: "completed" },
    { id: 5, title: "Blog CMS Platform", tech: "Node.js, MongoDB", progress: 60, date: "3 weeks ago", rating: 3, status: "in-progress" },
    { id: 6, title: "REST API Server", tech: "Express, PostgreSQL", progress: 100, date: "1 month ago", rating: 5, status: "completed" }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Real-Time Chat Application",
      description: "Build a modern chat app with WebSocket integration, user authentication, and real-time messaging capabilities. Learn about socket programming and state management.",
      difficulty: "Intermediate",
      duration: "4-6 weeks",
      match: 98,
      tags: ["React", "Socket.io", "Node.js", "MongoDB"],
      learningPoints: ["WebSocket Protocol", "Real-time Data", "User Authentication"]
    },
    {
      id: 2,
      title: "AI-Powered Recipe Finder",
      description: "Create an intelligent recipe recommendation system using machine learning. Integrate with food APIs and implement smart search functionality.",
      difficulty: "Advanced",
      duration: "6-8 weeks",
      match: 95,
      tags: ["Python", "TensorFlow", "FastAPI", "React"],
      learningPoints: ["Machine Learning", "API Integration", "Data Processing"]
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description: "Develop a comprehensive analytics dashboard for social media metrics. Visualize data with interactive charts and real-time updates.",
      difficulty: "Intermediate",
      duration: "3-5 weeks",
      match: 92,
      tags: ["Vue.js", "Chart.js", "Express", "MySQL"],
      learningPoints: ["Data Visualization", "REST APIs", "Database Design"]
    },
    {
      id: 4,
      title: "Mobile Fitness Tracker",
      description: "Build a cross-platform fitness tracking app with workout logging, progress tracking, and personalized recommendations.",
      difficulty: "Intermediate",
      duration: "5-7 weeks",
      match: 89,
      tags: ["React Native", "Firebase", "Redux", "Health API"],
      learningPoints: ["Mobile Development", "Cloud Storage", "Push Notifications"]
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Create a secure and transparent voting platform using blockchain technology. Implement smart contracts and decentralized storage.",
      difficulty: "Advanced",
      duration: "8-10 weeks",
      match: 86,
      tags: ["Solidity", "Ethereum", "Web3.js", "React"],
      learningPoints: ["Blockchain", "Smart Contracts", "Cryptography"]
    }
  ];

  const toggleBookmark = (projectId) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getDifficultyColor = (difficulty) => {

   
    switch(difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    
    <div className="  min-h-screen  bg-black text-white">
      
      <Navbar />

      <div className="flex h-screen">
        {/* Left Sidebar - History */}
        <div className="w-80 border-r border-gray-800 flex flex-col bg-black">
          {/* History Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold">Learning History</h2>
            </div>
            <div className="flex gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>4 Completed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <span>2 In Progress</span>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto">
           {
            historyItems.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))
           }
          </div>

          {/* Stats Footer */}
          <HistoryFooter />
        </div>

        {/* Right Main Content - Recommendations */}
        <div className="flex-1 overflow-y-auto bg-black">
          {/* Header */}
 
            <RecommendationHeader selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Recommendations Grid */}
          <div className="p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {recommendations.map((project) => (
                <RecommendationCard key={project.id} project={project} bookmarkedProjects={bookmarkedProjects} toggleBookmark={toggleBookmark} getDifficultyColor={getDifficultyColor} />
              ))}
            </div>

            {/* Load More */}
            <div className="max-w-5xl mx-auto mt-8 text-center">
              <button className="px-8 py-3 bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-lg font-semibold transition-colors">
                Load More Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}