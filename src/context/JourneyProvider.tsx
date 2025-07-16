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
      // Import offline storage dynamically to avoid SSR issues
      const { offlineStorage } = await import('@/lib/offline-storage')
      
      // Mark as completed
      const completedJourney = { 
        ...currentData, 
        completedAt: currentData.completedAt || new Date() 
      }
      
      console.log('💾 [JOURNEY-SAVE] Saving to offline storage with contact:', completedJourney.contact);
      
      // Save to enhanced offline storage
      const offlineJourney = await offlineStorage.saveJourney(completedJourney)
      
      // Update state
      setData(completedJourney)
      
      console.log('✅ [JOURNEY-SAVE] Journey saved successfully:', {
        localId: offlineJourney.localId,
        profile: offlineJourney.profile,
        syncStatus: offlineJourney.syncStatus,
        hasContact: !!offlineJourney.contact,
        contactKeys: offlineJourney.contact ? Object.keys(offlineJourney.contact) : []
      });
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