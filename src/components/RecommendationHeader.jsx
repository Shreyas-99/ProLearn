import React from 'react'
import { Search, Filter } from 'lucide-react';

const RecommendationHeader = ({ selectedFilter, setSelectedFilter, searchQuery, setSearchQuery }) => {
  return (
            <div className="sticky top-0 z-10 bg-black border-b border-gray-800 p-6">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">Recommended Projects</h1>
              <p className="text-gray-400 mb-6">
                Personalized project recommendations based on your learning goals and progress
              </p>

              {/* Search and Filter Bar */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-500 transition-colors">
                  <Filter className="w-5 h-5" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 mt-4">
                {['all', 'beginner', 'intermediate', 'advanced'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-900 text-gray-400 hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
  )
}

export default RecommendationHeader
