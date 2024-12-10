import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { HardDrive, Database, Cloud, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StorageStatus {
  database: {
    connected: boolean;
    mediaCount: number;
    totalSize: string;
    lastSync: Date | null;
  };
  objectStorage: {
    connected: boolean;
    provider: string;
    bucket: string;
    availableSpace: string;
    usedSpace: string;
    usagePercent: number;
  };
}

export function StorageDiagnostic() {
  const [status, setStatus] = useState<StorageStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/storage/status');
      if (!response.ok) throw new Error('Failed to fetch storage status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error checking storage status:', error);
      toast({
        title: 'Error',
        description: 'Failed to check storage status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setTesting(true);
      const response = await fetch('/api/storage/test', { method: 'POST' });
      if (!response.ok) throw new Error('Connection test failed');
      
      toast({
        title: 'Success',
        description: 'Storage connection test passed',
      });
      
      // Refresh status after test
      await checkStatus();
    } catch (error) {
      console.error('Error testing storage connection:', error);
      toast({
        title: 'Error',
        description: 'Storage connection test failed',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#3c75ef] border-t-transparent" />
            <span>Checking storage status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5" />
          Storage Diagnostic
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Database Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <h3 className="font-medium">Database Storage</h3>
            </div>
            <Badge
              variant={status?.database.connected ? 'default' : 'destructive'}
              className="capitalize"
            >
              {status?.database.connected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          {status?.database.connected && (
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Media Count</div>
                <div className="font-medium">{status.database.mediaCount}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Total Size</div>
                <div className="font-medium">{status.database.totalSize}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Last Sync</div>
                <div className="font-medium">
                  {status.database.lastSync
                    ? new Date(status.database.lastSync).toLocaleString()
                    : 'Never'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Object Storage Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              <h3 className="font-medium">Object Storage</h3>
            </div>
            <Badge
              variant={status?.objectStorage.connected ? 'default' : 'destructive'}
              className="capitalize"
            >
              {status?.objectStorage.connected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
          
          {status?.objectStorage.connected && (
            <>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Provider</div>
                  <div className="font-medium capitalize">
                    {status.objectStorage.provider}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Bucket</div>
                  <div className="font-medium">{status.objectStorage.bucket}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500">Used Space</div>
                  <div className="font-medium">{status.objectStorage.usedSpace}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Storage Usage</span>
                  <span>{status.objectStorage.usagePercent}%</span>
                </div>
                <Progress value={status.objectStorage.usagePercent} />
              </div>
            </>
          )}
        </div>

        {/* Status Summary */}
        <div className="rounded-lg border p-4 mt-4">
          <div className="flex items-start gap-3">
            {status?.database.connected && status?.objectStorage.connected ? (
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            )}
            <div>
              <h4 className="font-medium">
                {status?.database.connected && status?.objectStorage.connected
                  ? 'Storage System Healthy'
                  : 'Storage System Issues Detected'}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {status?.database.connected && status?.objectStorage.connected
                  ? 'All storage systems are connected and functioning properly.'
                  : 'One or more storage systems are not functioning properly. Check the connection details above.'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={checkStatus}
            disabled={loading}
          >
            Refresh Status
          </Button>
          <Button
            onClick={testConnection}
            disabled={testing}
            className="bg-[#3c75ef]"
          >
            {testing ? 'Testing...' : 'Test Connection'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 