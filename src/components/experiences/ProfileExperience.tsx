import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { useNavigate } from '@tanstack/react-router'
import { useJourney } from '@/context/JourneyProvider'
import type { BusinessProfile } from '@/types/journey'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { PROFILE_CONTENT } from '@/lib/content'
import { getBusinessIcon } from '@/lib/icons'
import { useBackground } from '@/hooks/useBackground'
import { useTabletOptimization } from '@/hooks/useTabletOptimization'

const ProfileExperience: React.FC = () => {
  const navigate = useNavigate()
  const { updateData } = useJourney()
  const { colors } = useDesignSystem()
  const { getBackgroundStyle } = useBackground()
  const { 
    getProfileContainerClass, 
    getProfileHeaderClass, 
    getProfileSubtitleClass, 
    getProfileTitleClass, 
    getProfileCardsGridClass,
    getProfileCardClass,
    getProfileIconContainerClass,
    getProfileIconClass,
    getProfileCardTitleClass 
  } = useTabletOptimization()

  const selectProfile = (profileId: BusinessProfile) => {
    updateData({ profile: profileId })
    navigate({ to: '/channels' })
  }

  const backgroundStyle = getBackgroundStyle()

  return (
    <div 
      className={`${backgroundStyle.className} profile-page`}
      style={backgroundStyle.style}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full filter blur-3xl animate-pulse"
             style={{ backgroundColor: colors.paypal.lightBlue }} />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full filter blur-3xl animate-pulse delay-1000"
             style={{ backgroundColor: colors.paypal.blue }} />
      </div>

      <div className={getProfileContainerClass("relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 xl:px-16 py-12")}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={getProfileHeaderClass("text-center mb-16")}
        >
          <p className={getProfileSubtitleClass("text-2xl md:text-4xl font-semibold mb-4")}
             style={{ color: colors.paypal.lightBlue }}>
            {PROFILE_CONTENT.subtitle}
          </p>
          <h1 className={getProfileTitleClass("text-5xl md:text-6xl font-bold text-white leading-tight")}>
            {PROFILE_CONTENT.title}
          </h1>
        </motion.div>

        {/* Profile Cards */}
        <div className={getProfileCardsGridClass("grid gap-8 w-full max-w-3xl mx-auto")}>
          {PROFILE_CONTENT.options.map((option, index) => {
            // Get icon based on profile type
            const iconSrc = option.id === 'small-medium' 
              ? getBusinessIcon('smallMedium')
              : getBusinessIcon('large')
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
              >
                <Card 
                  className={getProfileCardClass("p-8 bg-white/5 backdrop-blur-xl border-2 border-white/10 hover:border-white/20 hover:bg-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group hover:scale-102 focus:outline-none focus:ring-4 focus:ring-blue-200/50 active:scale-98")}
                  onClick={() => selectProfile(option.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      selectProfile(option.id)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Selecionar perfil: ${option.title}`}
                >
                  <div className={getProfileCardClass("flex items-center gap-6 justify-center")}>
                    {/* Icon Section - Always shown (hardcoded default) */}
                    <div className="flex justify-center items-center">
                      <div className={getProfileIconContainerClass("bg-white rounded-xl p-6 shadow-lg")}>
                        <img
                          src={iconSrc}
                          alt={option.title}
                          className={getProfileIconClass("w-24 h-24 object-contain")}
                        />
                      </div>
                    </div>

                    {/* Title Section - Always shown (hardcoded default) */}
                    <div className="flex-1 text-center">
                      <h3 className={getProfileCardTitleClass("text-3xl font-bold text-white")}>
                        {option.title}
                      </h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProfileExperience 