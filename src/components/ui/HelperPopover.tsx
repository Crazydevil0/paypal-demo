import React from 'react'
import { Settings, Palette, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Switch } from '@/components/ui/switch'
import { useHelper } from '@/context/HelperProvider'
import type { 
  LogoVariant, 
  ProfileCardElements, 
  ChannelsDisplayVariant,
  ChallengesDisplayVariant
} from '@/context/HelperProvider'

const HelperPopover: React.FC = () => {
  const { settings, currentPage, updatePageSettings, resetPageSettings } = useHelper()

  const logoVariantOptions: { value: LogoVariant; label: string; description: string }[] = [
    { value: 'logo', label: 'Logo Only', description: 'Show only PayPal logo' },
    { value: 'monogram', label: 'Monogram Only', description: 'Show only PayPal monogram' },
    { value: 'both', label: 'Both', description: 'Show monogram + logo' }
  ]

  const channelsDisplayVariantOptions: { value: ChannelsDisplayVariant; label: string }[] = [
    { value: 'full', label: 'Full' },
    { value: 'title-description-only', label: 'Title/Description Only' }
  ]

  const challengesDisplayVariantOptions: { value: ChallengesDisplayVariant; label: string }[] = [
    { value: 'full', label: 'Full' },
    { value: 'title-description-only', label: 'Title/Description Only' }
  ]

  const handleLogoVariantChange = (variant: LogoVariant) => {
    updatePageSettings('homePage', { logoVariant: variant })
  }

  const handleCardElementToggle = (element: keyof ProfileCardElements, checked: boolean) => {
    updatePageSettings('profilePage', { 
      cardElements: { 
        ...settings.profilePage.cardElements, 
        [element]: checked 
      } 
    })
  }

  const handleChannelsDisplayVariantChange = (variant: ChannelsDisplayVariant) => {
    updatePageSettings('channelsPage', { displayVariant: variant })
  }

  const handleChallengesDisplayVariantChange = (variant: ChallengesDisplayVariant) => {
    updatePageSettings('challengesPage', { displayVariant: variant })
  }

  // Page detection
  const isHomePage = currentPage === 'homePage'
  const isProfilePage = currentPage === 'profilePage'
  const isChannelsPage = currentPage === 'channelsPage'
  const isChallengesPage = currentPage === 'challengesPage'
  const isSolutionsPage = currentPage === 'solutionsPage'
  const currentLogoVariant = settings.homePage.logoVariant
  const currentCardElements = settings.profilePage.cardElements
  const currentChannelsDisplayVariant = settings.channelsPage.displayVariant
  const currentChallengesDisplayVariant = settings.challengesPage.displayVariant

  return (
    <div className="fixed top-4 right-4 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="!h-12 !w-12 !rounded-full !bg-blue-600 hover:!bg-blue-700 !border-0 shadow-lg hover:shadow-xl transition-all duration-200 !text-white !p-0 !px-0 !py-0 flex items-center justify-center !gap-0"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-96 p-0 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl" 
          align="end"
          sideOffset={8}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-gray-900">PayPal Helper</h3>
              </div>
              <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                Current page: {isHomePage ? 'Home' : isProfilePage ? 'Profile' : isChannelsPage ? 'Channels' : isChallengesPage ? 'Challenges' : isSolutionsPage ? 'Solutions' : 'Other Page'}
              </div>
            </div>

            {/* Page-specific content */}
            {isHomePage ? (
              <>
                {/* Logo Variant Section */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-3">Logo Display</h4>
                  </div>
                  
                  <ToggleGroup
                    type="single"
                    value={currentLogoVariant}
                    onValueChange={(value: string) => {
                      if (value) handleLogoVariantChange(value as LogoVariant)
                    }}
                    variant="outline"
                    className="w-full justify-stretch"
                  >
                    {logoVariantOptions.map((option) => (
                      <ToggleGroupItem
                        key={option.value}
                        value={option.value}
                        className="flex-1 px-4 py-2 text-sm font-medium data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {option.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                <Separator className="my-4" />

                {/* Reset Button */}
                <Button
                  onClick={() => resetPageSettings('homePage')}
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reset Home Page
                </Button>
              </>
            ) : isProfilePage ? (
              <>
                {/* Card Elements Section */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-3">Card Elements</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Icon Toggle */}
                    <div className="flex items-center justify-between">
                      <label htmlFor="icon-toggle" className="text-sm font-medium text-gray-900">
                        Show Icon
                      </label>
                      <Switch
                        id="icon-toggle"
                        checked={currentCardElements.showIcon}
                        onCheckedChange={(checked) => handleCardElementToggle('showIcon', checked)}
                      />
                    </div>
                    
                    {/* Title Toggle */}
                    <div className="flex items-center justify-between">
                      <label htmlFor="title-toggle" className="text-sm font-medium text-gray-900">
                        Show Title
                      </label>
                      <Switch
                        id="title-toggle"
                        checked={currentCardElements.showTitle}
                        onCheckedChange={(checked) => handleCardElementToggle('showTitle', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Reset Button */}
                <Button
                  onClick={() => resetPageSettings('profilePage')}
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reset Profile Page
                </Button>
              </>
            ) : isChannelsPage ? (
              <>
                {/* Channels Display Variant Section */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-3">Card Display</h4>
                  </div>
                  
                  <ToggleGroup
                    type="single"
                    value={currentChannelsDisplayVariant}
                    onValueChange={(value: string) => {
                      if (value) handleChannelsDisplayVariantChange(value as ChannelsDisplayVariant)
                    }}
                    variant="outline"
                    className="w-full justify-stretch"
                  >
                    {channelsDisplayVariantOptions.map((option) => (
                      <ToggleGroupItem
                        key={option.value}
                        value={option.value}
                        className="flex-1 px-4 py-2 text-sm font-medium data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {option.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                <Separator className="my-4" />

                {/* Reset Button */}
                <Button
                  onClick={() => resetPageSettings('channelsPage')}
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reset Channels Page
                </Button>
              </>
            ) : isChallengesPage ? (
              <>
                {/* Challenges Display Variant Section */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-3">Card Display</h4>
                  </div>
                  
                  <ToggleGroup
                    type="single"
                    value={currentChallengesDisplayVariant}
                    onValueChange={(value: string) => {
                      if (value) handleChallengesDisplayVariantChange(value as ChallengesDisplayVariant)
                    }}
                    variant="outline"
                    className="w-full justify-stretch"
                  >
                    {challengesDisplayVariantOptions.map((option) => (
                      <ToggleGroupItem
                        key={option.value}
                        value={option.value}
                        className="flex-1 px-4 py-2 text-sm font-medium data-[state=on]:bg-blue-600 data-[state=on]:text-white data-[state=on]:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {option.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                <Separator className="my-4" />

                {/* Reset Button */}
                <Button
                  onClick={() => resetPageSettings('challengesPage')}
                  variant="outline"
                  size="sm"
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reset Challenges Page
                </Button>
              </>
            ) : isSolutionsPage ? (
              <div className="text-center py-8">
                <div className="text-gray-500 text-sm">
                  Solutions page has no configurable options.
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  The recommended solution is automatically selected.
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-sm">
                  No options available for this page yet.
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  More options coming soon!
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default HelperPopover 