import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { JourneyData, JourneyContextType } from '@/types/journey'

const JourneyContext = createContext<JourneyContextType | null>(null)

const initialJourneyData: JourneyData = {
  profile: null,
  channels: [],
  challenges: [],
  startedAt: new Date(),
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<JourneyData>(initialJourneyData)

  const updateData = useCallback((updates: Partial<JourneyData>) => {
    setData(current => ({ ...current, ...updates }))
  }, [])

  const resetJourney = useCallback(() => {
    setData({ ...initialJourneyData, startedAt: new Date() })
  }, [])

  const saveJourney = useCallback(async () => {
    try {
      // Mark as completed
      const completedJourney = { 
        ...data, 
        completedAt: new Date() 
      }
      
      // Save to localStorage for offline-first approach
      const existingJourneys = JSON.parse(
        localStorage.getItem('paypal-journeys') || '[]'
      )
      
      const updatedJourneys = [...existingJourneys, completedJourney]
      localStorage.setItem('paypal-journeys', JSON.stringify(updatedJourneys))
      
      // Update state
      setData(completedJourney)
      
      console.log('Journey saved successfully:', completedJourney)
    } catch (error) {
      console.error('Failed to save journey:', error)
      throw error
    }
  }, [data])

  const value: JourneyContextType = {
    data,
    updateData,
    resetJourney,
    saveJourney,
  }

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider')
  }
  return context
} 