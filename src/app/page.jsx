import { ArrowRight, Zap, BarChart3, Users, Sparkles, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export default async function LandingPage() {
  
  const user = await currentUser();
  if (user) {
    redirect('/home');
  }

  return (
    
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gray-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-900/30 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Learn Through <span className="text-white">Real Projects</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            AI-powered project recommendations tailored to your learning goals. Master skills by building what matters.
          </p>
          
          
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ProLearn?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-gray-950 border border-gray-800 hover:border-gray-600 transition group">
              <Zap className="text-gray-300 mb-4 group-hover:scale-110 transition" size={32} />
              <h3 className="text-xl font-bold mb-3">Smart Recommendations</h3>
              <p className="text-gray-500">AI analyzes your skills and goals to suggest projects that perfectly match your learning pace.</p>
            </div>

            <div className="p-8 rounded-xl bg-gray-950 border border-gray-800 hover:border-gray-600 transition group">
              <BarChart3 className="text-gray-300 mb-4 group-hover:scale-110 transition" size={32} />
              <h3 className="text-xl font-bold mb-3">Track Progress</h3>
              <p className="text-gray-500">Visualize your learning journey with detailed progress tracking and skill development metrics.</p>
            </div>

            <div className="p-8 rounded-xl bg-gray-950 border border-gray-800 hover:border-gray-600 transition group">
              <Users className="text-gray-300 mb-4 group-hover:scale-110 transition" size={32} />
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-gray-500">Connect with other learners, share projects, and get feedback from experienced developers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "1", title: "Define Goals", desc: "Tell us what you want to learn" },
              { num: "2", title: "Get Projects", desc: "Receive tailored project ideas" },
              { num: "3", title: "Build & Learn", desc: "Execute projects with guided steps" },
              { num: "4", title: "Grow Skills", desc: "Track progress and level up" }
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="bg-gray-950 p-6 rounded-lg border border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center font-bold text-lg mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
                {step.num !== "4" && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="text-gray-700" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-gray-500 mb-8 text-lg">Join thousands of developers mastering skills through real-world projects.</p>
          <button className="bg-white text-black px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition transform hover:scale-105">
            Start Your Learning Journey
          </button>
        </div>
      </section>

            <Footer />
    </div>
  );
}