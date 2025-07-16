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

  const saveJourney = useCallback(async (overrideData?: Partial<JourneyData>) => {
    // Use current state plus any override data passed in
    const currentData = overrideData ? { ...data, ...overrideData } : data;
    
    console.log('💾 [JOURNEY-SAVE] Starting journey save process...', {
      profile: currentData.profile,
      channels: currentData.channels?.length || 0,
      challenges: currentData.challenges?.length || 0,
      hasContact: !!(currentData.contact?.fullName || currentData.contact?.email || currentData.contact?.phone),
      contactData: currentData.contact
    });
    
    try {
      // Import sync service dynamically to avoid SSR issues
      const { syncService } = await import('@/lib/sync-service')
      
      // Mark as completed
      const completedJourney = { 
        ...currentData, 
        completedAt: currentData.completedAt || new Date() 
      }
      
      console.log('💾 [JOURNEY-SAVE] Saving journey with sync service:', completedJourney.contact);
      
      // Save using sync service which handles both local storage and immediate sync
      const result = await syncService.saveJourney(completedJourney)
      
      if (result.success) {
        console.log('✅ [JOURNEY-SAVE] Journey saved successfully with ID:', result.id);
      } else {
        console.error('❌ [JOURNEY-SAVE] Failed to save journey:', result.error);
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('❌ [JOURNEY-SAVE] Failed to save journey:', error)
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