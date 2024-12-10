import React, { useState } from 'react';
import { configureWebhook, WebhookConfig as WebhookConfigType } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const AVAILABLE_EVENTS = [
  { id: 'media.created', label: 'Media Created' },
  { id: 'media.downloaded', label: 'Media Downloaded' },
  { id: 'channel.added', label: 'Channel Added' },
  { id: 'channel.updated', label: 'Channel Updated' }
];

export function WebhookConfig() {
  const [url, setUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: 'Error',
        description: 'Webhook URL is required',
        variant: 'destructive'
      });
      return;
    }

    if (selectedEvents.length === 0) {
      toast({
        title: 'Error',
        description: 'Select at least one event',
        variant: 'destructive'
      });
      return;
    }

    try {
      setLoading(true);
      const headerObj = headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const config: WebhookConfigType = {
        url,
        events: selectedEvents,
        headers: headerObj
      };

      await configureWebhook(config);
      toast({
        title: 'Success',
        description: 'Webhook configured successfully'
      });
      
      // Reset form
      setUrl('');
      setSelectedEvents([]);
      setHeaders([{ key: '', value: '' }]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to configure webhook',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure Webhook</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-api.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Events Selection */}
          <div className="space-y-2">
            <Label>Events</Label>
            <div className="grid grid-cols-2 gap-4">
              {AVAILABLE_EVENTS.map((event) => (
                <div key={event.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={event.id}
                    checked={selectedEvents.includes(event.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedEvents([...selectedEvents, event.id]);
                      } else {
                        setSelectedEvents(selectedEvents.filter(e => e !== event.id));
                      }
                    }}
                  />
                  <Label htmlFor={event.id}>{event.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <Label>Headers</Label>
            <div className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Header Key"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Header Value"
                    value={header.value}
                    onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleRemoveHeader(index)}
                    className="px-3"
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddHeader}
                className="w-full mt-2"
              >
                Add Header
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#3c75ef]" disabled={loading}>
            {loading ? 'Configuring...' : 'Configure Webhook'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 