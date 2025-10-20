import React from 'react'
import {  Star,  CheckCircle,  } from 'lucide-react';


const HistoryCard = ({item}) => {
  return (
    
              <div
               
                className="p-4 border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  {item.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-yellow-400 rounded-full flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">{item.tech}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-gray-400">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        item.progress === 100 ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < item.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
            
  )
}

export default HistoryCard
