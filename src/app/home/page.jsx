'use client';
import { nanoid } from "nanoid";
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Clock, Bookmark, TrendingUp, Filter, Search, Star, ExternalLink, ChevronRight, Zap, Users, Target, Play, CheckCircle, AlertCircle } from 'lucide-react';
import HistoryFooter from '@/components/HistoryFooter';
import HistoryCard from '@/components/HistoryCard';
import RecommendationCard from '@/components/RecommendationCard';

import { useUser } from '@clerk/nextjs';
import RecommendationHeader from '@/components/RecommendationHeader';
import { useRouter } from 'next/navigation';




export default  function page() {
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const router = useRouter();

  const  {isSignedIn,user,isLoaded}  = useUser();



  // console.log("User ID fetched in Home Page", user);// --------  working
  if (isSignedIn) {

    console.log("user SIGNED IN");
  }
 
  

  const filterFunction = (filter) => {
  setSelectedFilter(filter);

  if (filter === "all") {
    // show everything again
    setRecommendations(allRecommendations);
  } else {
    const regex = new RegExp(`^${filter}$`, "i"); // case-insensitive
    const filtered = allRecommendations.filter((project) =>
      regex.test(project.difficulty)
    );
    setRecommendations(filtered);
  }
};

  useEffect(() => {
    if (isSignedIn) {
      // Sync the user to your MongoDB after successful sign-in
      fetch("api/users/sync", { method: "POST" });
      router.push("/home"); // redirect manually as backup
    }
  }, [isSignedIn, router]);

const [userOb, setuserOb] = useState('')


useEffect(() => {
    if (isLoaded && user) {
      setuserOb(user);
    }
  }, [isLoaded, user]);





const handleLoadMore = async () => {
    const topic = searchQuery.trim();
    if (!topic) allRecommendations;

    setLoading(true);
    const res = await fetch("/api/project-recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const projects = await res.json();
    
    const data = projects?.map(project => ({
      ...project,
      id: nanoid(12),
    }));
    
    setAllRecommendations((prev) => {
  const combined = [...prev, ...data];
  const unique = Array.from(
    new Map(
      combined.map((p) => [p.title.toLowerCase(), p])
    ).values()
  );
  return unique;
});
    setRecommendations((prev) => {
  const combined = [...prev, ...data];
  const unique = Array.from(
    new Map(
      combined.map((p) => [p.title.toLowerCase(), p])
    ).values()
  );
  return unique;
});
  
    setLoading(false);
  };

  
 const handleSearch = async () => {
    const topic = searchQuery.trim();
    if (!topic) return;

    setLoading(true);
    const res = await fetch("/api/project-recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const projects = await res.json();
    console.log(" ROW Projects from API:", projects);

    if (!Array.isArray(projects)) {
  console.error("Error fetching projects:", projects.error || projects);
  setLoading(false);
  return;
}

    const data = projects?.map(project => ({
      ...project,
      id: nanoid(12),
    }));
    console.log("Received Recommendations:", data);
    setRecommendations(data);
    setAllRecommendations(data);
    setLoading(false);
  };



  const historyItems = [
    { id: 1, title: "Weather Dashboard App", tech: "React, API", progress: 100, date: "2 days ago", rating: 5, isCompleted: true },
  ];

  // const recommendations = [
  //   {
  //     id: 1,
  //     title: "Real-Time Chat Application",
  //     description: "Build a modern chat app with WebSocket integration, user authentication, and real-time messaging capabilities. Learn about socket programming and state management.",
  //     difficulty: "Intermediate",
  //     duration: "4-6 weeks",
  //     match: 98,
  //     tags: ["React", "Socket.io", "Node.js", "MongoDB"],
  //     learningPoints: ["WebSocket Protocol", "Real-time Data", "User Authentication"]
  //   },
  // ];

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
    
    <div className="  min-h-screen  bg-black text-white  ">

      <Navbar  />

     {loading?<div>
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>

      </div>
     </div> 
     :<div className="flex h-screen">
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
              <HistoryCard key={item.id} item={item}  />
            ))
           }
          </div>

          {/* Stats Footer */}
          <HistoryFooter />
        </div>

        {/* Right Main Content - Recommendations */}
        <div className="flex-1 overflow-y-auto bg-black">
          {/* Header */}
 
            <RecommendationHeader filterFunction={filterFunction} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />

          {/* Recommendations Grid */}
          <div className="p-6">
            {recommendations.length > 0 && <div className="max-w-5xl mx-auto space-y-6">
              {recommendations?.map((project) => (
                <RecommendationCard  key={project.id} project={project} bookmarkedProjects={bookmarkedProjects} toggleBookmark={toggleBookmark} getDifficultyColor={getDifficultyColor} />
              ))}
            </div>}

          {/* Load More */}
             {recommendations.length > 0 &&<div className="max-w-5xl mx-auto mt-8 text-center">
              <button onClick={handleLoadMore} className="px-8 py-3 bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-lg font-semibold transition-colors">
                Load More Projects
              </button>
            </div> }
          </div>
        </div>
      </div>}
    </div>
  );
}