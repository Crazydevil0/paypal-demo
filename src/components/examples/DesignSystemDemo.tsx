import React from 'react'
import { motion } from 'framer-motion'
import { useDesignSystem } from '@/providers/ThemeProvider'
import { getBusinessIcon, getAvatar, getIconSize } from '@/lib/icons'
import type { BusinessIconName, AvatarName } from '@/lib/icons'
import { Card } from '@/components/ui/card'

/**
 * Demo component showcasing the PayPal Design System
 * This demonstrates how easy it is to use design tokens consistently
 */
export default function DesignSystemDemo() {
  const { colors, spacing, animations, buildCardStyles } = useDesignSystem()

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: colors.background.secondary }}>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <motion.div
          {...animations.fadeIn}
          className="text-center space-y-4"
        >
          <h1 style={{ color: colors.paypal.blue }}>
            PayPal Design System Demo
          </h1>
          <p className="text-lg" style={{ color: colors.text.secondary }}>
            Demonstrando tokens de design, componentes consistentes e padrões reutilizáveis
          </p>
        </motion.div>

        {/* Color Palette Section */}
        <motion.section
          {...animations.fadeIn}
          className={buildCardStyles('elevated')}
        >
          <h2 className="mb-6" style={{ color: colors.text.primary }}>
            Paleta de Cores PayPal
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'PayPal Blue', color: colors.paypal.blue },
              { name: 'PayPal Navy', color: colors.paypal.navy },
              { name: 'PayPal Light', color: colors.paypal.lightBlue },
              { name: 'PayPal Yellow', color: colors.paypal.yellow },
            ].map((item) => (
              <div key={item.name} className="text-center">
                <div 
                  className="w-full h-16 rounded-lg mb-2"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm font-medium" style={{ color: colors.text.primary }}>
                  {item.name}
                </p>
                <p className="text-xs font-mono" style={{ color: colors.text.secondary }}>
                  {item.color}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Typography Section */}
        <motion.section
          {...animations.fadeIn}
          className={buildCardStyles('default')}
        >
          <h2 className="mb-6" style={{ color: colors.text.primary }}>
            Hierarquia Tipográfica
          </h2>
          
          <div className="space-y-4">
            <h1 className="heading-1" style={{ color: colors.text.primary }}>
              Heading 1 - PayPal Sans Bold
            </h1>
            <h2 className="heading-2" style={{ color: colors.text.primary }}>
              Heading 2 - PayPal Sans Bold
            </h2>
            <h3 className="heading-3" style={{ color: colors.text.primary }}>
              Heading 3 - PayPal Sans Bold
            </h3>
            <p className="text-lg" style={{ color: colors.text.primary }}>
              Corpo de texto grande - PayPal Sans Regular
            </p>
            <p style={{ color: colors.text.secondary }}>
              Corpo de texto normal com cor secundária
            </p>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Texto pequeno e discreto
            </p>
          </div>
        </motion.section>

        {/* Button Variants Section */}
        <motion.section
          {...animations.fadeIn}
          className={buildCardStyles('elevated')}
        >
          <h2 className="mb-6" style={{ color: colors.text.primary }}>
            Componentes de Botão PayPal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h4 style={{ color: colors.text.primary }}>Primary</h4>
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Small</button>
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Medium</button>
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Large</button>
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Extra Large</button>
            </div>
            
            <div className="space-y-4">
              <h4 style={{ color: colors.text.primary }}>Secondary</h4>
              <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Small</button>
              <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Medium</button>
              <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Large</button>
              <button className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">Extra Large</button>
            </div>
            
            <div className="space-y-4">
              <h4 style={{ color: colors.text.primary }}>Ghost</h4>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100">Small</button>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100">Medium</button>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100">Large</button>
              <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100">Extra Large</button>
            </div>
            
            <div className="space-y-4">
              <h4 style={{ color: colors.text.primary }}>States</h4>
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Loading</button>
              <button className="px-4 py-2 rounded-md bg-gray-300 cursor-not-allowed">Disabled</button>
            </div>
          </div>
        </motion.section>

        {/* Icons Section */}
        <motion.section
          {...animations.fadeIn}
          className={buildCardStyles('default')}
        >
          <h2 className="mb-6" style={{ color: colors.text.primary }}>
            Sistema de Ícones
          </h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="mb-4" style={{ color: colors.text.primary }}>
                Ícones de Negócio
              </h4>
              <div className="flex flex-wrap gap-6">
                {(['acquirer', 'card', 'fraud', 'global', 'networks', 'site'] as BusinessIconName[]).map((iconName) => (
                  <div key={iconName} className="text-center">
                    <img 
                      src={getBusinessIcon(iconName)}
                      alt={iconName}
                      className={getIconSize('lg')}
                    />
                    <p className="text-sm mt-2 capitalize" style={{ color: colors.text.secondary }}>
                      {iconName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="mb-4" style={{ color: colors.text.primary }}>
                Avatares
              </h4>
              <div className="flex gap-6">
                {(['ana', 'leo', 'robot'] as AvatarName[]).map((avatarName) => (
                  <div key={avatarName} className="text-center">
                    <img 
                      src={getAvatar(avatarName)}
                      alt={avatarName}
                      className={`${getIconSize('4xl')} rounded-full bg-white p-2`}
                    />
                    <p className="text-sm mt-2 capitalize" style={{ color: colors.text.secondary }}>
                      {avatarName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Spacing System Section */}
        <motion.section
          {...animations.fadeIn}
          className={buildCardStyles('elevated')}
        >
          <h2 className="mb-6" style={{ color: colors.text.primary }}>
            Sistema de Espaçamento
          </h2>
          
          <div className="space-y-4">
            {[
              { name: 'xs', value: spacing.xs },
              { name: 'sm', value: spacing.sm },
              { name: 'md', value: spacing.md },
              { name: 'lg', value: spacing.lg },
              { name: 'xl', value: spacing.xl },
              { name: '2xl', value: spacing['2xl'] },
            ].map((space) => (
              <div key={space.name} className="flex items-center gap-4">
                <span className="w-12 text-sm font-mono" style={{ color: colors.text.secondary }}>
                  {space.name}
                </span>
                <div 
                  className="bg-blue-200 rounded"
                  style={{ 
                    width: space.value,
                    height: '1rem',
                    backgroundColor: colors.paypal.blue + '40'
                  }}
                />
                <span className="text-sm font-mono" style={{ color: colors.text.secondary }}>
                  {space.value}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Animation Examples */}
        <motion.section
          {...animations.fadeIn}
          className={buildCardStyles('default')}
        >
          <h2 className="mb-6" style={{ color: colors.text.primary }}>
            Animações do Sistema
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              {...animations.slideInLeft}
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.paypal.blue + '20' }}
            >
              <h4 style={{ color: colors.text.primary }}>Slide In Left</h4>
              <p className="text-sm" style={{ color: colors.text.secondary }}>
                Animação suave da esquerda
              </p>
            </motion.div>
            
            <motion.div
              {...animations.scaleIn}
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.paypal.lightBlue + '20' }}
            >
              <h4 style={{ color: colors.text.primary }}>Scale In</h4>
              <p className="text-sm" style={{ color: colors.text.secondary }}>
                Animação de escala
              </p>
            </motion.div>
            
            <motion.div
              {...animations.slideInRight}
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.paypal.yellow + '20' }}
            >
              <h4 style={{ color: colors.text.primary }}>Slide In Right</h4>
              <p className="text-sm" style={{ color: colors.text.secondary }}>
                Animação suave da direita
              </p>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </div>
  )
} 