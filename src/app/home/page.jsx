'use client';
import { nanoid } from "nanoid";
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Clock, Bookmark, TrendingUp, Filter, Search, Star, ExternalLink, ChevronRight, Zap, Users, Target, Play, CheckCircle, AlertCircle } from 'lucide-react';
import HistoryFooter from '@/components/HistoryFooter';
import HistoryCard from '@/components/HistoryCard';
import RecommendationCard from '@/components/RecommendationCard';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import RecommendationHeader from '@/components/RecommendationHeader';
import { storeUserHistory, getUserHistory } from "../actions/historyActions";
import { addProject } from '../actions/projectActions';
import { set } from "mongoose";


export default function page() {
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [historyItems, setHistoryItems] = useState([])
   

  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [loadingProjects, setloadingProjects] = useState(false )


  console.log("User ID fetched in Home Page", user?.id);// --------  working
  if (isSignedIn) {

    console.log("user SIGNED IN");
  }

  useEffect(() => {

    async function fetchHistory() {
      if (!isLoaded || !isSignedIn || !user?.id) return;
      try {
        const historyData = await getUserHistory(user?.id);
        console.log("User History Data:", historyData);
        if (historyData && historyData.length > 0) {

          const data = historyData.map(item => item.projectDetails);
          console.log("Fetched Project Details:", data);

          setHistoryItems(data);

        } else {
          console.log("No history data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching history items:", error);
      }
    }

    fetchHistory();

  }, [isLoaded, isSignedIn, user?.id])


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
  if (!isLoaded) return;
  if (!isSignedIn) return;

  fetch("/api/users/sync", { method: "POST" });
}, [isLoaded, isSignedIn]);


  const [userOb, setuserOb] = useState(null);


useEffect(() => {
  if (!isLoaded) return; // wait until Clerk is ready

  if (!isSignedIn) {
    router.replace("/"); // go to landing page when logged out
  }
}, [isLoaded, isSignedIn, router]);




  const handleSearch = async () => {
    const topic = searchQuery.trim();
    if (!topic) return;

    setloadingProjects(true);
    const res = await fetch("/api/project-recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const projects = await res.json();
    console.log(" ROW Projects from API:", projects);

    if (!Array.isArray(projects)) {
      console.error("Error fetching projects:", projects.error || projects);
     setloadingProjects(false);
      return;
    }

    const data = projects.map(project => ({
      ...project,
      id: nanoid(13),
    }));
    console.log("Received Recommendations:", data);
    setRecommendations(data);
    setAllRecommendations(data);
  setloadingProjects(false);
  };


  const handleLoadMore = async () => {
    const topic = searchQuery.trim();
    if (!topic) allRecommendations;

    setloadingProjects(true);

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

    setloadingProjects(false);
  };



  const toggleBookmark = (projectId) => {
    setBookmarkedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };



  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {

      case 'Beginner': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Advanced': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };


  const funcStratProject = async (project) => {
    setLoading(true);
    console.log("Starting project:", project);
    if (isSignedIn) {
      // Store user history
      await storeUserHistory(user.id, project.id);
      await addProject(project, user.id);
    }
    setLoading(false);
    router.push(`/projects/${project.id}`);


  }


  return (

    <div className="  min-h-screen  bg-black text-white  ">

      <Navbar />

      {loading ? <div>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>

        </div>
      </div>
        : <div className="flex h-screen">
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
                (historyItems.length > 0) && historyItems?.map((item) => (
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

            <RecommendationHeader filterFunction={filterFunction}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />

{
  loadingProjects? <div>
        <div className="flex items-center justify-center h-[65vh]">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>

        </div>
      </div>:
            <div>
              {/* Recommendations Grid */}
              <div className="p-6">
                {recommendations.length > 0 && <div className="max-w-5xl mx-auto space-y-6">
                  {recommendations?.map((project) => (
                    <RecommendationCard key={project.id}
                      project={project}
                      bookmarkedProjects={bookmarkedProjects}
                      toggleBookmark={toggleBookmark}
                      getDifficultyColor={getDifficultyColor}
                      funcStratProject={funcStratProject}
                    />
                  ))}
                </div>}

                {/* Load More */}
                {recommendations.length > 0 && <div className="max-w-5xl mx-auto mt-8 text-center">
                  <button onClick={handleLoadMore} className="px-8 py-3 bg-gray-900 border border-gray-800 hover:border-purple-500 rounded-lg font-semibold transition-colors">
                    Load More Projects
                  </button>
                </div>}
              </div>

            </div>
}

          </div>
        </div>}
    </div>
  );
}