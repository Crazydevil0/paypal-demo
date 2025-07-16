import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { PROFILE_CONTENT, CHANNELS_CONTENT, CHALLENGES_CONTENT } from '@/lib/content';
import { getBusinessIcon } from '@/lib/icons';
import { 
  ShoppingCart, 
  Clock, 
  Globe2, 
  ShieldAlert, 
  Users2, 
  CreditCard,
  Download,
  TrendingUp,
  Building,
  Store
} from 'lucide-react';
import iconSite from '@/assets/icon-site.png';
import iconRedes from '@/assets/icon-redes.png';
import iconCartao from '@/assets/icon-cartao.png';

function toCSV(journeys: any[]) {
  if (!journeys.length) return '';
  const header = ['profile', 'channels', 'challenges', 'contact.fullName', 'contact.email', 'contact.phone', 'contact.company'];
  const csv = [header.join(',')];
  for (const j of journeys) {
    csv.push([
      j.profile ?? '',
      j.channels?.join('; ') ?? '',
      j.challenges?.join('; ') ?? '',
      j.contact?.fullName ?? '',
      j.contact?.email ?? '',
      j.contact?.phone ?? '',
      j.contact?.company ?? '',
    ].map(val => JSON.stringify(val)).join(','));
  }
  return csv.join('\n');
}

type Journey = {
  _id: string;
  profile: string;
  channels: string[];
  challenges: string[];
  contact?: {
    fullName?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
};

export default function AdminJourneys() {
  const journeys = useQuery(api.journeys.getAllJourneys, {}) as Journey[] | undefined;
  const [exporting, setExporting] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize] = useState(10);

  const columns = useMemo<ColumnDef<Journey>[]>(
    () => [
      {
        accessorKey: 'profile',
        header: 'Profile',
        cell: (info) => {
          const value = info.getValue() as string;
          const profileData = PROFILE_CONTENT.options.find(p => p.id === value);
          return (
            <Badge variant="secondary" className="font-medium">
              {profileData?.title || value || 'N/A'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'channels',
        header: 'Channels',
        cell: (info) => {
          const channels = info.getValue() as string[];
          if (!Array.isArray(channels) || channels.length === 0) return <span className="text-muted-foreground">—</span>;
          
          return (
            <div className="flex flex-wrap gap-1">
              {channels.map((channelId, index) => {
                const channelData = CHANNELS_CONTENT.options.find(c => c.id === channelId);
                return (
                  <Badge key={index} variant="outline" className="text-xs">
                    {channelData?.title || channelId}
                  </Badge>
                );
              })}
            </div>
          );
        },
        sortingFn: (a, b) => {
          const aVal = (a.getValue('channels') as string[]) || [];
          const bVal = (b.getValue('channels') as string[]) || [];
          return (aVal.length ? aVal.join(',') : '').localeCompare(bVal.length ? bVal.join(',') : '');
        },
      },
      {
        accessorKey: 'challenges',
        header: 'Challenges',
        cell: (info) => {
          const challenges = info.getValue() as string[];
          if (!Array.isArray(challenges) || challenges.length === 0) return <span className="text-muted-foreground">—</span>;
          
          return (
            <div className="flex flex-wrap gap-1">
              {challenges.map((challengeId, index) => {
                const challengeData = CHALLENGES_CONTENT.options.find(c => c.id === challengeId);
                return (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {challengeData?.title || challengeId}
                  </Badge>
                );
              })}
            </div>
          );
        },
        sortingFn: (a, b) => {
          const aVal = (a.getValue('challenges') as string[]) || [];
          const bVal = (b.getValue('challenges') as string[]) || [];
          return (aVal.length ? aVal.join(',') : '').localeCompare(bVal.length ? bVal.join(',') : '');
        },
      },
      {
        id: 'contact',
        header: 'Contact Info',
        cell: (info) => {
          const contact = (info.row.original as Journey).contact;
          if (!contact || (!contact.fullName && !contact.email && !contact.phone)) {
            return <span className="text-muted-foreground">No contact info</span>;
          }
          
          return (
            <div className="space-y-1 text-sm">
              {contact.fullName && (
                <div className="font-medium">{contact.fullName}</div>
              )}
              {contact.email && (
                <div className="text-muted-foreground">{contact.email}</div>
              )}
              {contact.phone && (
                <div className="text-muted-foreground">{contact.phone}</div>
              )}
              {contact.company && (
                <div className="text-xs text-muted-foreground">{contact.company}</div>
              )}
            </div>
          );
        },
        sortingFn: (a, b) => {
          const ca = a.original.contact?.fullName || '';
          const cb = b.original.contact?.fullName || '';
          return ca.localeCompare(cb);
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: journeys || [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: journeys ? Math.ceil(journeys.length / pageSize) : 0,
    manualPagination: false,
  });

  const handleExport = () => {
    if (!journeys) return;
    setExporting(true);
    const csv = toCSV(journeys);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journeys_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      setExporting(false);
    }, 1000);
  };

  // Stats calculations
  const totalJourneys = journeys?.length || 0;
  
  const profileStats = PROFILE_CONTENT.options.map(option => ({
    ...option,
    count: journeys?.filter(j => j.profile === option.id).length || 0,
    icon: option.id === 'small-medium' ? getBusinessIcon('smallMedium') : getBusinessIcon('large'),
  }));

  const channelIconMap = {
    website: iconSite,
    'social-media': iconRedes,
    ecommerce: iconCartao,
  };

  const channelStats = CHANNELS_CONTENT.options.map(option => ({
    ...option,
    count: journeys?.filter(j => j.channels?.includes(option.id)).length || 0,
    icon: channelIconMap[option.id],
  }));

  const challengeIconMap = {
    'cart-abandonment': ShoppingCart,
    'slow-checkout': Clock,
    'global-scaling': Globe2,
    'payment-reliability': CreditCard,
    'social-commerce': Users2,
    'fraud-chargebacks': ShieldAlert,
  };

  const challengeStats = CHALLENGES_CONTENT.options.map(option => ({
    ...option,
    count: journeys?.filter(j => j.challenges?.includes(option.id)).length || 0,
    Icon: challengeIconMap[option.id],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Customer journey insights and data export</p>
          </div>
          <Button onClick={handleExport} disabled={!journeys || exporting} size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Journeys</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalJourneys}</div>
              <p className="text-xs text-muted-foreground">Customer interactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Small/Medium</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profileStats[0]?.count || 0}</div>
              <p className="text-xs text-muted-foreground">SMB customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enterprise</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profileStats[1]?.count || 0}</div>
              <p className="text-xs text-muted-foreground">Large enterprises</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With Contact</CardTitle>
              <Users2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {journeys?.filter(j => j.contact?.fullName || j.contact?.email).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Leads captured</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Business Profiles + Sales Channels */}
          <div className="space-y-6">
            {/* Business Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Profiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileStats.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-md border">
                        <img src={profile.icon} alt={profile.title} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{profile.title}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-semibold px-3 py-1">
                      {profile.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sales Channels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sales Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {channelStats.map((channel) => (
                  <div key={channel.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded-md border">
                        <img src={channel.icon} alt={channel.title} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{channel.title}</div>
                        <div className="text-xs text-muted-foreground">{channel.description}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg font-semibold px-3 py-1">
                      {channel.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Business Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Challenges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challengeStats.map((challenge) => (
                <div key={challenge.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-md border">
                      {challenge.Icon && <challenge.Icon className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{challenge.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{challenge.description}</div>
                    </div>
                  </div>
                  <Badge variant="destructive" className="text-lg font-semibold px-3 py-1 ml-2">
                    {challenge.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Journey Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Customer Journeys</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            {!journeys ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="text-lg text-muted-foreground">Loading journeys...</div>
                </div>
              </div>
            ) : journeys.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="text-lg text-muted-foreground">No journeys found</div>
                  <p className="text-sm text-muted-foreground mt-1">Customer data will appear here once journeys are completed</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map(header => (
                            <TableHead 
                              key={header.id} 
                              className="cursor-pointer select-none hover:bg-muted/50 transition-colors" 
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <div className="flex items-center gap-2">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.getIsSorted() === 'asc' && <span className="text-xs">▲</span>}
                                {header.column.getIsSorted() === 'desc' && <span className="text-xs">▼</span>}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} className="hover:bg-muted/25">
                          {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id} className="py-4">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {table.getRowModel().rows.length} of {journeys.length} journey{journeys.length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 