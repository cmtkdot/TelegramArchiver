import React, { useState, useEffect } from 'react';
import { createApiKey, listApiKeys, revokeApiKey, ApiKeyConfig } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Key, Plus, Trash2, Copy, Shield } from 'lucide-react';

const AVAILABLE_SCOPES = [
  { value: 'read:media', label: 'Read Media' },
  { value: 'write:media', label: 'Write Media' },
  { value: 'delete:media', label: 'Delete Media' },
  { value: 'manage:tags', label: 'Manage Tags' },
  { value: 'read:channels', label: 'Read Channels' },
  { value: 'manage:channels', label: 'Manage Channels' },
];

export function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<Array<{
    id: string;
    name: string;
    scopes: string[];
    createdAt: Date;
    expiresAt: Date | null;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newKeyData, setNewKeyData] = useState<{
    name: string;
    scopes: string[];
    expiresIn?: number;
  }>({
    name: '',
    scopes: [],
  });
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      const keys = await listApiKeys();
      setApiKeys(keys);
    } catch (error) {
      console.error('Error loading API keys:', error);
      toast({
        title: 'Error',
        description: 'Failed to load API keys',
        variant: 'destructive',
      });
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyData.name || newKeyData.scopes.length === 0) {
      toast({
        title: 'Error',
        description: 'Please provide a name and select at least one scope',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const { key } = await createApiKey(newKeyData);
      setNewlyCreatedKey(key);
      await loadApiKeys();
      toast({
        title: 'Success',
        description: 'API key created successfully',
      });
    } catch (error) {
      console.error('Error creating API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to create API key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    try {
      setLoading(true);
      await revokeApiKey(id);
      await loadApiKeys();
      toast({
        title: 'Success',
        description: 'API key revoked successfully',
      });
    } catch (error) {
      console.error('Error revoking API key:', error);
      toast({
        title: 'Error',
        description: 'Failed to revoke API key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'API key copied to clipboard',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Keys
        </CardTitle>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#3c75ef]">
              <Plus className="h-4 w-4 mr-2" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Key Name</Label>
                <Input
                  placeholder="Enter key name..."
                  value={newKeyData.name}
                  onChange={(e) => setNewKeyData({ ...newKeyData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Expiration</Label>
                <Select
                  onValueChange={(value) =>
                    setNewKeyData({
                      ...newKeyData,
                      expiresIn: value ? parseInt(value) : undefined,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Never</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Scopes</Label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_SCOPES.map((scope) => (
                    <div key={scope.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={scope.value}
                        checked={newKeyData.scopes.includes(scope.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewKeyData({
                              ...newKeyData,
                              scopes: [...newKeyData.scopes, scope.value],
                            });
                          } else {
                            setNewKeyData({
                              ...newKeyData,
                              scopes: newKeyData.scopes.filter((s) => s !== scope.value),
                            });
                          }
                        }}
                      />
                      <Label htmlFor={scope.value}>{scope.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {newlyCreatedKey ? (
                <div className="space-y-2">
                  <Label>Your New API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newlyCreatedKey}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(newlyCreatedKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-red-500">
                    Make sure to copy your API key now. You won't be able to see it again!
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleCreateKey}
                  disabled={loading}
                  className="w-full bg-[#3c75ef]"
                >
                  Create API Key
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="space-y-1">
                <div className="font-medium">{key.name}</div>
                <div className="text-sm text-gray-500">
                  Created: {key.createdAt.toLocaleDateString()}
                  {key.expiresAt && ` • Expires: ${key.expiresAt.toLocaleDateString()}`}
                </div>
                <div className="flex flex-wrap gap-1">
                  {key.scopes.map((scope) => (
                    <Badge
                      key={scope}
                      variant="secondary"
                      className="text-xs bg-[#3c75ef]/10 text-[#3c75ef]"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRevokeKey(key.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {apiKeys.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No API keys created yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 