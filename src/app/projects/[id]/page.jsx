'use client';
import React from 'react'
import { ArrowRight, Zap, BarChart3, Users, Sparkles, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import Loading from './loading';
import {getSingleProject} from '../../actions/projectActions'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {updateProjectStatus} from '../../actions/projectActions';

export default  function ProjectPage({ params }) {
 const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({})


useEffect(() => {
  setLoading(true);
  async function fetchProductData(){
    try {
      const data=await getSingleProject(id);
      setProject(data);
      setLoading(false);
      console.log("Project data:", data);
  } catch (error) {
    console.error("❌ Error fetching project data:", error);
    setLoading(false);
  }}
  fetchProductData();

console.log ("Project state:", project);

}, [])





 
const toggleCompleted =async () =>{
  try {
    const updatedStatus = !project.isCompleted;
    const updatedProject = await updateProjectStatus(project.id, updatedStatus);
    setProject(updatedProject);
    console.log("✅ Project status updated:", updatedProject);

    
}catch (error) {
    console.error("❌ Error updating project status:", error);

}
}


const difficultyColors = {
    beginner: "text-green-400",
    intermediate: "text-yellow-400",
    advanced: "text-red-400",
  };
    const classname=''
  return (
  <div className="min-h-screen bg-black text-white overflow-hidden">
    <Navbar />

    {loading ? (
      <Loading />
    ) : (
      <div className="max-w-5xl mx-auto px-6 py-16">

        <BackButton classname={classname} />

        <h1 className="text-4xl font-bold mt-6 mb-10 tracking-tight">
          Project Details
        </h1>

        {/* Main Card */}
        <div className="bg-[#0f172a] border border-gray-800 p-10 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.4)]">

          {/* Project Title */}
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">
            {project?.title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            {project?.description}
          </p>

          {/* Two column layout */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-6">

              {/* Tech Stack */}
              <div>
                <h3 className="text-gray-300 text-lg font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">

                  {Array.isArray(project?.techStack) &&
                    project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-gray-800 border border-gray-700 text-gray-200 
                                   hover:bg-gray-700 transition-all font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))
                  }

                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h3 className="text-gray-300 text-lg font-semibold mb-2">Difficulty</h3>
                <p className={`text-xl font-bold ${difficultyColors[project?.difficulty]}`}>
                  {project?.difficulty}
                </p>
              </div>

              {/* Duration */}
              <div>
                <h3 className="text-gray-300 text-lg font-semibold mb-2">Duration</h3>
                <p className="text-gray-100 text-lg">{project?.duration}</p>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-gray-300 text-lg font-semibold mb-2">Status</h3>
                <p
                  className={`text-lg font-semibold ${
                    project?.isCompleted ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {project?.isCompleted ? "Completed" : "Not Completed"}
                </p>
              </div>

            </div>

            {/* RIGHT SIDE - WHAT YOU WILL LEARN */}
            <div>
              <h3 className="text-gray-300 text-lg font-semibold mb-3">
                What You Will Learn
              </h3>

              <ul className="space-y-3 pl-4 border-l border-gray-700">
                {project?.whatYouLearn?.map((point, index) => (
                  <li
                    key={index}
                    className="text-gray-300 text-base leading-relaxed"
                  >
                    • {point}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Button */}
          <div className="mt-12">
            {project?.isCompleted ? (
              <button onClick={toggleCompleted}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
                           transition-all shadow-lg hover:shadow-blue-600/40 
                           font-semibold text-white text-lg"
              >
                Mark as Not Completed
              </button>
            ) : (
              <button onClick={toggleCompleted}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
                           transition-all shadow-lg hover:shadow-blue-600/40 
                           font-semibold text-white text-lg"
              >
                Mark as Completed
              </button>
            )}
          </div>

        </div>
      </div>
    )}

    <Footer />
  </div>
);


}