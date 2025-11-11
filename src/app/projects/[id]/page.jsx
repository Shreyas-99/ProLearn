import React from 'react'
import { ArrowRight, Zap, BarChart3, Users, Sparkles, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';



export default async function ProjectPage() {
  
//   await connectDB();
 
const toggleCompleted = () =>{

}


const difficultyColors = {
    beginner: "text-green-400",
    intermediate: "text-yellow-400",
    advanced: "text-red-400",
  };
    const classname=''
  return (
    
    <div className="min-h-screen bg-black text-white overflow-hidden">
 
      <Navbar  />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div ><BackButton classname={classname}/></div>
         <div className='mt-4'>
          <h1 className="text-4xl font-bold mb-3">Project Details</h1>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Project Name:</h2>
            <p className="text-gray-400">Description:</p>
            <div className="mt-4">
              <span className="text-gray-400">Tech: </span>
              <span className="text-white">tech</span>  
              </div>
            <div className="mt-4">
              <span className="text-gray-400">Difficulty: </span>
              <span className={`font-semibold ${difficultyColors['beginner']}`}>beginner</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-400">What You Will Learn: </span>
              <ul className="list-disc list-inside">
                <li>point 1</li>
                <li>point 2</li>  
              </ul>
            </div>
            <div className="mt-4">
              <span className="text-gray-400">Duration: </span>
              <span className="text-white">duration</span>  
            </div>
            <div className="mt-4">   
              <span className="text-gray-400">Status: </span>
              <span className="text-white"> Completed</span>  
            </div>
            <div className="mt-6">
            {0?  <button
                // onClick={toggleCompleted}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Mark as Completed
              </button>:  <button
                // onClick={toggleCompleted}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Mark as Not Completed
              </button>
            }
            </div>
          </div>
          </div>

        </div>


         
        <Footer />
    </div>
  );
}