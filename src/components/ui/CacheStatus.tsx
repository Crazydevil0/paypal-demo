import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCacheStatus } from '@/hooks/useBatteryStatus'
import { HardDrive, Video, Download, RefreshCw } from 'lucide-react'

export default function CacheStatus() {
  const { cacheStatus, loading, updateCacheStatus, cacheVideos } = useCacheStatus()

  if (loading) {
    return (
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Cache Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            Loading cache status...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!cacheStatus) {
    return (
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Cache Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500 text-center py-4">
            Cache status unavailable
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <HardDrive className="w-5 h-5" />
          Cache Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total assets</span>
            <Badge>{cacheStatus.assetCacheSize}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 flex items-center gap-1">
              <Video className="w-4 h-4" />
              Videos
            </span>
            <Badge variant={cacheStatus.videoCacheSize > 0 ? 'default' : 'secondary'}>
              {cacheStatus.videoCacheSize}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Static files</span>
            <Badge>{cacheStatus.staticCacheSize}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total cached</span>
            <Badge variant="default">{cacheStatus.cacheSize}</Badge>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={cacheVideos}
            disabled={cacheStatus.videoCacheSize >= 2}
            className="flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            {cacheStatus.videoCacheSize >= 2 ? 'Videos Cached' : 'Cache Videos'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={updateCacheStatus}
            className="flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {cacheStatus.videoCacheSize === 0 && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            📱 Videos not cached. Tap "Cache Videos" for offline access.
          </div>
        )}
        
        {cacheStatus.videoCacheSize >= 2 && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            ✅ All videos are cached for offline use!
          </div>
        )}
      </CardContent>
    </Card>
  )
}