import React from 'react'
import { Github } from 'lucide-react';

function Footer() {
  return (
    
    <>
          {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold mb-4">
                ProLearn
              </div>
              <p className="text-gray-600 text-sm">Learn through real projects</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-300 transition">Features</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-300 transition">About</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Blog</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-300 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Terms</a></li>
                <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex justify-between items-center">
            <p className="text-gray-700 text-sm">© 2025 ProLearn. All rights reserved.</p>
            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-400 transition">
                <Github size={20} />
              </button>
            </div>
          </div>
        </div>
      </footer></>
  )
}

export default Footer