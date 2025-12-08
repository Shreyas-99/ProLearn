'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Bookmark, Zap, Play, ChevronRight, BookmarkX, Sparkles } from 'lucide-react';
import Navbar from './Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';

const BookmarkedProjects = () => {
  const router = useRouter();
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkedProjects();
  }, []);

  const fetchBookmarkedProjects = async () => {
    try {
      setLoading(true);
    //   const response = await fetch('/api/bookmarks');
    //   const data = await response.json();
    //   setBookmarkedProjects(data.projects || []);
    // } catch (error) {
      // console.error('Failed to fetch bookmarked projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (projectId) => {
    try {
      await fetch('/api/bookmarks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      setBookmarkedProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-500/10 text-green-400 border-green-500/30',
      intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
    };
    return colors[difficulty?.toLowerCase()] || colors.beginner;
  };

  const startProject = (project) => {
    router.push(`/projects/${project.id}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
   
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"
        />
      </div>

      <Navbar />
      <motion.div
  className="fixed left-4 top-15 z-40"
  initial={{ opacity: 0, x: 0 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.3 }}
>
  <BackButton classname="mt-10"/>
</motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="text-purple-400" size={40} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Bookmarked Projects
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Your saved projects collection • {bookmarkedProjects.length} {bookmarkedProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        ) : bookmarkedProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <BookmarkX className="mx-auto mb-4 text-gray-600" size={64} />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              No bookmarked projects yet
            </h3>
            <p className="text-gray-500">
              Start bookmarking projects to see them here
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {bookmarkedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  layout
                  exit="exit"
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleBookmark(project.id)}
                      className="ml-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Bookmark className="w-5 h-5 fill-purple-400 text-purple-400" />
                    </motion.button>
                  </div>

                  {/* Project Details */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{project.duration}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project?.techStack?.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-3 py-1 bg-black border border-gray-800 rounded-full text-xs text-gray-300 hover:border-purple-500/50 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Learning Points */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      You'll Learn:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.whatYouLearn?.slice(0, 3).map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 text-xs text-gray-300 bg-gray-800/50 px-2 py-1 rounded-lg"
                        >
                          <Zap className="w-3 h-3 text-purple-400" />
                          <span>{point}</span>
                        </div>
                      ))}
                      {project?.whatYouLearn?.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{project.whatYouLearn.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startProject(project)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all group/btn"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Project</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookmarkedProjects;