import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { offlineStorage } from '@/lib/offline-storage';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import CacheStatus from '@/components/ui/CacheStatus';

export default function StatusPage() {
  const [stats, setStats] = useState<null | {
    totalJourneys: number;
    pendingSync: number;
    syncedJourneys: number;
    failedSync: number;
    completedJourneys: number;
    lastSync: Date | null;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    offlineStorage.getLocalStats().then(s => {
      setStats(s);
      setLoading(false);
    });
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <div className="text-gray-500 text-lg">Loading status...</div>
      </div>
    );
  }

  const allSynced = stats.pendingSync === 0 && stats.failedSync === 0;
  const percentSynced = stats.totalJourneys === 0 ? 100 : Math.round((stats.syncedJourneys / stats.totalJourneys) * 100);

  return (
    <div className="max-w-xl mx-auto py-16 px-4 space-y-6">
      <Card className="shadow-xl border-2 border-blue-100">
        <CardHeader className="flex flex-col items-center gap-2 pb-2">
          <CardTitle className="text-3xl font-bold tracking-tight">Sync Status</CardTitle>
          <CardDescription className="text-center text-base text-gray-500">
            Local journey data and sync health for this tablet
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-0">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total journeys</span>
              <Badge>{stats.totalJourneys}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Completed journeys</span>
              <Badge>{stats.completedJourneys}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Pending sync</span>
              <Badge variant={stats.pendingSync === 0 ? 'default' : 'secondary'}>{stats.pendingSync}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Synced</span>
              <Badge variant="default">{stats.syncedJourneys}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Failed sync</span>
              <Badge variant={stats.failedSync === 0 ? 'default' : 'destructive'}>{stats.failedSync}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Last sync</span>
              <span className="text-xs text-gray-500">{stats.lastSync ? new Date(stats.lastSync).toLocaleString() : '—'}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Sync Progress</span>
              <span className="text-xs text-gray-500">{percentSynced}%</span>
            </div>
            <Progress value={percentSynced} className={allSynced ? 'bg-green-100' : 'bg-yellow-100'} />
          </div>

          {allSynced ? (
            <Alert className="bg-green-50 border-green-200 text-green-800 flex items-center gap-3 mt-4">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
              <div>
                <AlertTitle className="font-bold">Everything is synced!</AlertTitle>
                <AlertDescription>
                  All journeys are safely stored in the cloud.
                </AlertDescription>
              </div>
            </Alert>
          ) : (
            <Alert className="bg-yellow-50 border-yellow-200 text-yellow-900 flex items-center gap-3 mt-4">
              <AlertTriangle className="w-7 h-7 text-yellow-600" />
              <div>
                <AlertTitle className="font-bold">Attention: Unsynced or Failed Journeys</AlertTitle>
                <AlertDescription>
                  Some journeys are not yet synced. Please connect to the internet to sync, or check for errors.
                </AlertDescription>
              </div>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Cache Status Card */}
      <CacheStatus />
    </div>
  );
} 