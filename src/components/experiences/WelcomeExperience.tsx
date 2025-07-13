import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Sparkles, Shield, Globe, Zap } from 'lucide-react';

const WelcomeExperience: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Smooth introduction delay
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate({ to: '/profile' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#003087] via-[#0070E0] to-[#003087]">
      {/* Background Elements - Fixed Positions */}
      <div className="absolute inset-0">
        {/* Ambient background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-1000" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main Content Container - Fixed Layout */}
      <div className="relative h-full flex flex-col">
        
        {/* Header Section - Fixed Position */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-16 px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  {/* PayPal Logo */}
                  <div className="mb-4">
                    <img 
                      src="/src/assets/logo-paypal.png" 
                      alt="PayPal" 
                      className="h-12 mx-auto filter brightness-0 invert"
                    />
                  </div>
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4 text-white" />
                    Interactive Experience
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Central Content - Fixed Position */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-4xl px-8">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-center text-white"
              >
                {/* Main Headline */}
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Transforming
                  <br />
                  <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
                    Commerce
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Discover how PayPal empowers businesses worldwide with 
                  secure, innovative payment solutions
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="group px-8 py-4 bg-white text-[#003087] hover:bg-blue-50 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    Begin Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features Grid - Fixed Position */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 px-8">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {/* Feature 1 */}
                  <motion.div 
                    className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Secure Payments</h3>
                    <p className="text-blue-100 text-sm">Advanced fraud protection and encryption</p>
                  </motion.div>

                  {/* Feature 2 */}
                  <motion.div 
                    className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Global Reach</h3>
                    <p className="text-blue-100 text-sm">Accept payments in 200+ markets worldwide</p>
                  </motion.div>

                  {/* Feature 3 */}
                  <motion.div 
                    className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Fast Integration</h3>
                    <p className="text-blue-100 text-sm">Quick setup with powerful developer tools</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Particles - Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeExperience; 