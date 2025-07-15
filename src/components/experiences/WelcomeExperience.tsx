import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useDesignSystem } from '@/providers/ThemeProvider';
import { useHelper } from '@/context/HelperProvider';
import { useBackground } from '@/hooks/useBackground';
import { WELCOME_CONTENT, MEDIA } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { GradientHighlight } from '@/components/ui/GradientHighlight'

const WelcomeExperience: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { colors, gradients } = useDesignSystem();
  const { settings } = useHelper();
  const { getBackgroundStyle, isGradientBackground } = useBackground();

  useEffect(() => {
    // Smooth introduction delay
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate({ to: '/profile' });
  };

  const backgroundStyle = getBackgroundStyle()
  
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-cover bg-no-repeat" style={isGradientBackground() ? { background: gradients.heroBackground } : backgroundStyle.style}>
      {/* Background Elements - Absolute */}
      {isGradientBackground() && (
        <div className="absolute inset-0 z-0">
          {/* Ambient background effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-1000" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.paypal.lightBlue} 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Floating Particles */}
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
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      )}

      {/* Main Flex Layout */}
      <div className="relative z-10 flex flex-col flex-1 justify-around min-h-screen">
        {/* Logo at top */}
        <div className="pt-8 flex justify-center">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center space-y-4"
              >
                {/* Conditional Logo Rendering based on Helper Settings */}
                {settings.homePage.logoVariant === 'monogram' && (
                  <img 
                    src={MEDIA.logo} 
                    alt="PayPal Monogram" 
                    className="h-24 md:h-28 lg:h-32 w-auto"
                  />
                )}
                
                {settings.homePage.logoVariant === 'logo' && (
                  <img 
                    src={MEDIA.logoSvg} 
                    alt="PayPal Logo" 
                    className="h-12 md:h-16 lg:h-20 w-auto"
                  />
                )}
                
                {settings.homePage.logoVariant === 'both' && (
                  <>
                    {/* PayPal Monogram */}
                    <img 
                      src={MEDIA.logo} 
                      alt="PayPal Monogram" 
                      className="h-20 md:h-24 lg:h-28 w-auto"
                    />
                    
                    {/* PayPal Logo */}
                    <img 
                      src={MEDIA.logoSvg} 
                      alt="PayPal Logo" 
                      className="h-12 md:h-16 lg:h-20 w-auto opacity-90"
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main content (centered) */}
        <div className="flex flex-col items-center text-center max-w-1440 mx-auto px-4 md:px-8 xl:px-16">
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
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {WELCOME_CONTENT.mainHeadlines[0]}
                  <br />
                  <GradientHighlight>
                    {WELCOME_CONTENT.mainHeadlines[1]}
                  </GradientHighlight>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  {WELCOME_CONTENT.mainHeadlines[2]}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button - Separate flexbox item */}
        <div className="flex justify-center px-10 md:px-16 xl:px-24">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button
                  onClick={handleGetStarted}
                  variant="ghost"
                  className="group h-auto px-12 py-8 text-xl font-semibold text-white hover:text-white border-2 border-white/30 bg-transparent hover:bg-white/10 hover:border-white/50 backdrop-blur-sm shadow-2xl hover:shadow-white/10 transition-all duration-300 hover:scale-105 rounded-full"
                >
                  {WELCOME_CONTENT.cta.text}
                  <ArrowRight className="ml-4 w-7 h-7 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </div>
    </div>
  );
};

export default WelcomeExperience; 