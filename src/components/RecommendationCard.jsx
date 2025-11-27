import React from 'react'
import { Clock, Bookmark, Zap, Play, ChevronRight } from 'lucide-react';

const RecommendationCard = ({project, toggleBookmark, bookmarkedProjects,getDifficultyColor, historyItems, funcStratProject}) => {
 
 
  const addToHistory = async () => {
    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: project.id }),
      });
    } catch (error) {
      console.error('Failed to add project to history:', error);
    }
  }


  return (
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
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
                    <button
                      onClick={() => toggleBookmark(project.id)}
                      className="ml-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          bookmarkedProjects.includes(project.id)
                            ? 'fill-purple-400 text-purple-400'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
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
                      <span
                        key={idx}
                        className="px-3 py-1 bg-black border border-gray-800 rounded-full text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Learning Points */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.whatYouLearn?.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 text-xs text-gray-300"
                        >
                          <Zap className="w-3 h-3 text-purple-400" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button onClick={() => funcStratProject(project)} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all group/btn">
                      <Play className="w-4 h-4" />
                      <span >Start Project</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                   
                  </div>
                 </div>
  )
}

export default RecommendationCard
