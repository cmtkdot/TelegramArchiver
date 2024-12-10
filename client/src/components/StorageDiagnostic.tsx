import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { initializeStorage, checkStorageHealth, StorageHealth, StorageStatus } from '@/lib/api';

export function StorageDiagnostic() {
  const [health, setHealth] = useState<StorageHealth | null>(null);
  const [status, setStatus] = useState<StorageStatus | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const healthData = await checkStorageHealth();
      setHealth(healthData);
    } catch (error) {
      console.error('Error checking storage health:', error);
      toast({
        title: 'Error',
        description: 'Failed to check storage health',
        variant: 'destructive',
      });
    }
  };

  const handleInitialize = async () => {
    try {
      setIsInitializing(true);
      const healthData = await initializeStorage();
      setHealth(healthData);
      toast({
        title: 'Success',
        description: 'Storage system initialized successfully',
      });
    } catch (error) {
      console.error('Error initializing storage:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize storage system',
        variant: 'destructive',
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const formatStorageSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Storage Diagnostic</h3>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={checkHealth}
              disabled={isInitializing}
            >
              Check Health
            </Button>
            <Button
              onClick={handleInitialize}
              disabled={isInitializing}
            >
              {isInitializing ? 'Initializing...' : 'Initialize Storage'}
            </Button>
          </div>
        </div>

        {/* Health Status */}
        {health && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div
                className={`h-3 w-3 rounded-full ${
                  health.isHealthy ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="font-medium">
                {health.isHealthy ? 'Healthy' : 'Issues Detected'}
              </span>
            </div>

            {/* Directory Status */}
            <div className="space-y-2">
              <h4 className="font-medium">Directory Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {health.directories.map((dir, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border bg-card text-card-foreground"
                  >
                    <div className="text-sm font-medium truncate">
                      {dir.path}
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      <span
                        className={`text-xs ${
                          dir.exists && dir.writable
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {dir.exists
                          ? dir.writable
                            ? '✓ Ready'
                            : '⚠ Not Writable'
                          : '✗ Missing'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Messages */}
            {health.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-red-500">Issues Found</h4>
                <ul className="space-y-1 text-sm text-red-500">
                  {health.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Storage Status */}
        {status && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Database Stats */}
              <div className="space-y-2">
                <h4 className="font-medium">Database</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Media Count</span>
                    <span>{status.database.mediaCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Size</span>
                    <span>{status.database.totalSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Sync</span>
                    <span>
                      {status.database.lastSync
                        ? new Date(status.database.lastSync).toLocaleString()
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Object Storage Stats */}
              <div className="space-y-2">
                <h4 className="font-medium">Object Storage</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Provider</span>
                    <span>{status.objectStorage.provider}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bucket</span>
                    <span>{status.objectStorage.bucket}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span>
                        {status.objectStorage.usedSpace} /{' '}
                        {status.objectStorage.availableSpace}
                      </span>
                    </div>
                    <Progress
                      value={status.objectStorage.usagePercent}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
} 