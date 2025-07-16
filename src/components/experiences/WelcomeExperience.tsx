import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useDesignSystem } from '@/providers/ThemeProvider';
import { useBackground } from '@/hooks/useBackground';
import { WELCOME_CONTENT, MEDIA } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { GradientHighlight } from '@/components/ui/GradientHighlight'

const WelcomeExperience: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { colors } = useDesignSystem();
  const { getBackgroundStyle } = useBackground();

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
    <div 
      className={backgroundStyle.className}
      style={backgroundStyle.style}
    >
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
                {/* Both Monogram + Logo (hardcoded default) */}
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
        <div className="pb-16 flex justify-center">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  variant="paypal-primary"
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    {WELCOME_CONTENT.cta.text}
                    <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
                  </span>
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