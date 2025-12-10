'use client';

import React, { useEffect, useState } from 'react';
import {
  Zap,
  Sparkles,
  Github,
  CheckCircle2,
  Clock,
  Target,
  Lightbulb,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import Loading from './Loading';
import { getSingleProject, updateProjectStatus } from '../../actions/projectActions';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProjectPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        setLoading(true);
        const data = await getSingleProject(id);
        setProject(data);
      } catch (error) {
        console.error('❌ Error fetching project data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProjectData();
  }, [id]);

  const toggleCompleted = async () => {
    if (!project) return;

    try {
      const updatedStatus = !project.isCompleted;
      const updatedProject = await updateProjectStatus(project.id, updatedStatus);
      setProject(updatedProject);
      console.log('✅ Project status updated:', updatedProject);
    } catch (error) {
      console.error('❌ Error updating project status:', error);
    }
  };

  const difficultyColors = {
    beginner: 'from-green-600 to-emerald-700',
    intermediate: 'from-yellow-600 to-orange-600',
    advanced: 'from-red-600 to-pink-600',
  };

  const difficultyIcons = {
    beginner: '🌱',
    intermediate: '⚡',
    advanced: '🚀',
  };

  const difficulty = project?.difficulty?.toLowerCase?.() || 'beginner';
  const difficultyColorClass =
    difficultyColors[difficulty] || 'from-slate-600 to-slate-800';
  const difficultyIcon = difficultyIcons[difficulty] || '✨';

  const techStack = Array.isArray(project?.techStack) ? project.techStack : [];
  const learnPoints = Array.isArray(project?.whatYouLearn)
    ? project.whatYouLearn
    : [];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* FIXED BACK BUTTON AT TOP-LEFT (in that red-marked area) */}
      <motion.div
        className="fixed left-4 top-16 z-30" // adjust top if it overlaps your navbar
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BackButton />
      </motion.div>

      {loading ? (
        <div className="max-w-6xl mx-auto px-6 py-20 flex-1">
          <Loading />
        </div>
      ) : !project && !loading? (
        <div className="flex-1 flex justify-center items-center text-gray-400">
          Failed to load project data.
        </div>
      ) : (
        <main className="max-w-6xl mx-auto px-6 py-16 flex-1 w-full">
          {/* Heading */}
          <motion.div
            className="mb-12 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="p-2 rounded-2xl bg-purple-600/20 border border-purple-500/40"
            >
              <Sparkles className="text-purple-400" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Project Details</h1>
              <p className="text-gray-400 text-sm mt-1">
                Explore the overview, stack, and learning outcomes of this project.
              </p>
            </div>
          </motion.div>

          {/* MAIN CONTAINER WITH COLOR + ANIMATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ translateY: -4 }}
            className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-700/80 p-10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Subtle glow line at top */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-purple-400/70 to-transparent"
            />

            {/* STATUS BADGE */}
            <motion.div
              className="flex justify-end mb-4"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div
                className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold border backdrop-blur-sm ${
                  project.isCompleted
                    ? 'bg-green-500/15 border-green-500/70 text-green-300'
                    : 'bg-orange-500/15 border-orange-500/70 text-orange-300'
                }`}
              >
                {project.isCompleted ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                {project.isCompleted ? 'Completed' : 'In Progress'}
              </div>
            </motion.div>

            {/* TITLE */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
            >
              {project.title}
            </motion.h2>

            {/* DESCRIPTION */}
            <motion.p
              className="text-gray-300 leading-relaxed mb-10 text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {project.description}
            </motion.p>

            {/* GRID CARDS */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* DIFFICULTY */}
              <motion.div
                className="bg-gray-900/80 p-6 border border-gray-700 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Target className="text-purple-400" />
                  <h3 className="font-semibold text-gray-200 text-lg">Difficulty</h3>
                </div>

                <motion.div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${difficultyColorClass} text-white font-bold shadow-md`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{difficultyIcon}</span>
                  <span className="capitalize">{difficulty}</span>
                </motion.div>
              </motion.div>

              {/* DURATION */}
              <motion.div
                className="bg-gray-900/80 p-6 border border-gray-700 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-blue-400" />
                  <h3 className="font-semibold text-gray-200 text-lg">Duration</h3>
                </div>
                <motion.p
                  className="text-white text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                >
                  {project.duration}
                </motion.p>
              </motion.div>

              {/* TECHNOLOGIES */}
              <motion.div
                className="bg-gray-900/80 p-6 border border-gray-700 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="text-yellow-400" />
                  <h3 className="font-semibold text-gray-200 text-lg">Technologies</h3>
                </div>
                <motion.p
                  className="text-white text-2xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {techStack.length} Tool{techStack.length === 1 ? '' : 's'}
                </motion.p>
              </motion.div>
            </div>

            {/* TWO COLUMN SECTION */}
            <div className="grid md:grid-cols-2 gap-10">
              {/* TECH STACK */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                  <Github className="text-purple-400" />
                  Tech Stack
                </h3>

                {techStack.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No technologies added yet for this project.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-4 py-2 bg-purple-900/50 border border-purple-500/40 text-purple-100 rounded-xl text-sm font-semibold shadow-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: 0.5 + idx * 0.05 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* WHAT YOU WILL LEARN */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                  <Lightbulb className="text-yellow-400" />
                  What You Will Learn
                </h3>

                {learnPoints.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    Learning outcomes will be added soon.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {learnPoints.map((point, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-gray-800/60 border-l-2 border-blue-500 rounded-lg"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0. + idx * 0.06 }}
                        whileHover={{ x: 4 }}
                      >
                        <CheckCircle2
                          className="text-blue-400 mt-1 flex-shrink-0"
                          size={18}
                        />
                        <p className="text-gray-200 text-sm md:text-base">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* ACTION BUTTON */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.65 }}
            >
              <motion.button
                onClick={toggleCompleted}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-8 py-4 rounded-xl font-bold text-lg shadow-xl overflow-hidden ${
                  project.isCompleted
                    ? 'bg-gradient-to-r from-red-600 to-red-600'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600'
                }`}
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-120%' }}
                  whileHover={{ x: '120%' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <span className="relative z-10">
                  {project.isCompleted ? 'Mark as Not Completed' : 'Mark as Completed'}
                </span>
              </motion.button>
            </motion.div>
            
          </motion.div>
        </main>
      )}

      <Footer />
    </div>
  );
}
