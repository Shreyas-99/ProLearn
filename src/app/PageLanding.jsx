// app/LandingPageClient.jsx
"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowRight, Zap, BarChart3, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
  import { SignInButton } from '@clerk/nextjs';

export default function LandingPageClient() {
  const { user, isLoaded } = useUser();


  

return (
  <div className="min-h-screen bg-black text-white overflow-hidden">
    <Navbar user={user} />

    {/* Hero Section */}
    <section className="pt-32 pb-20 px-6 relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gray-900/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-900/30 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Floating Icons - Diagonal Pattern */}
        {/* Top-Left Icon */}
        <motion.div
          className="absolute hidden lg:flex flex-col items-center gap-2"
          style={{
         left: "-60px",   // changed from -120px
          top: "45px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.3 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(147, 51, 234, 0.15)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(167, 139, 250, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)",
            }}>
            <span style={{ fontSize: "32px" }}>⚡</span>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
            FAST
          </span>
        </motion.div>

        {/* Top-Right Icon */}
        <motion.div
          className="absolute hidden lg:flex flex-col items-center gap-2"
          style={{
           right: "-40px",  // changed from -120px
            top: "50px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.4 },
            scale: { duration: 0.6, delay: 0.4 },
            y: {
              duration: 3.3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(147, 51, 234, 0.15)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(167, 139, 250, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)",
            }}>
            <span style={{ fontSize: "32px" }}>📊</span>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
            TRACK
          </span>
        </motion.div>

        {/* Bottom-Left Icon */}
        <motion.div
          className="absolute hidden lg:flex flex-col items-center gap-2"
          style={{
              left: "15px",   // changed from -120px
             bottom: "-39px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            scale: { duration: 0.6, delay: 0.5 },
            y: {
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(147, 51, 234, 0.15)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(167, 139, 250, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)",
            }}>
            <span style={{ fontSize: "32px" }}>🎯</span>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
            GOALS
          </span>
        </motion.div>

        {/* Bottom-Right Icon */}
        <motion.div
          className="absolute hidden lg:flex flex-col items-center gap-2"
          style={{
              right: "30px",  // changed from -120px
              bottom: "-55px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.6 },
            scale: { duration: 0.6, delay: 0.6 },
            y: {
              duration: 3.9,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(147, 51, 234, 0.15)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(167, 139, 250, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.3)",
            }}>
            <span style={{ fontSize: "32px" }}>🚀</span>
          </div>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}>
            GROW
          </span>
        </motion.div>

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Learn Through{" "}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              background: "linear-gradient(90deg, #A78BFA 0%, #E9D5FF 50%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            className="text-white">
            Real Projects
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
          AI-powered project recommendations tailored to your learning goals. Master skills by building what matters.
        </motion.p>
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
        
        <SignInButton>
          <button className="bg-white text-black px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition transform hover:scale-105">
            Start Your Learning Journey
          </button>
        </SignInButton>
      </div>
    </section>

    <Footer />
  </div>
);
}
