import React from 'react';
import { ApiKeyManager } from '@/components/ApiKeyManager';
import { ApiDocs } from '@/components/ApiDocs';
import { WebhookConfig } from '@/components/WebhookConfig';
import { StorageDiagnostic } from '@/components/StorageDiagnostic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Key, Webhook, Book, Settings as SettingsIcon, HardDrive } from 'lucide-react';

export function Settings() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings & API</h1>
      </div>

      <Tabs defaultValue="storage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            API Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage">
          <StorageDiagnostic />
        </TabsContent>

        <TabsContent value="api-keys">
          <ApiKeyManager />
        </TabsContent>

        <TabsContent value="webhooks">
          <WebhookConfig />
        </TabsContent>

        <TabsContent value="docs">
          <ApiDocs />
        </TabsContent>
      </Tabs>
    </div>
  );
} 