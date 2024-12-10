import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Code } from '@/components/ui/code';
import { Book, Lock, Webhook, Tag, FileText, Database } from 'lucide-react';

const API_ENDPOINTS = {
  media: [
    {
      method: 'GET',
      path: '/api/media',
      description: 'List all media files with pagination and filtering',
      auth: true,
      params: [
        { name: 'page', type: 'number', description: 'Page number (default: 1)' },
        { name: 'limit', type: 'number', description: 'Items per page (default: 20)' },
        { name: 'query', type: 'string', description: 'Search query' },
        { name: 'mediaTypes', type: 'string[]', description: 'Filter by media types (photo,video,document)' },
        { name: 'tags', type: 'string[]', description: 'Filter by tags' },
      ],
      response: {
        total: 100,
        page: 1,
        limit: 20,
        media: [
          {
            id: 1,
            mediaType: 'photo',
            fileSize: '1.2 MB',
            caption: 'Example photo',
            createdAt: '2024-01-01T00:00:00Z',
            tags: ['example', 'photo']
          }
        ]
      }
    },
    {
      method: 'GET',
      path: '/api/media/{id}',
      description: 'Get single media item details',
      auth: true,
      params: [
        { name: 'id', type: 'number', description: 'Media ID', required: true }
      ],
      response: {
        id: 1,
        mediaType: 'photo',
        fileSize: '1.2 MB',
        caption: 'Example photo',
        createdAt: '2024-01-01T00:00:00Z',
        tags: ['example', 'photo']
      }
    },
    {
      method: 'GET',
      path: '/api/media/{id}/download',
      description: 'Download media file',
      auth: true,
      params: [
        { name: 'id', type: 'number', description: 'Media ID', required: true }
      ],
      response: 'Binary file content'
    }
  ],
  channels: [
    {
      method: 'GET',
      path: '/api/channels',
      description: 'List all channels',
      auth: true,
      response: [
        {
          id: 1,
          title: 'Example Channel',
          mediaCount: 100,
          totalSize: '1.2 GB',
          isActive: true
        }
      ]
    },
    {
      method: 'GET',
      path: '/api/channels/{id}/media',
      description: 'List media in a channel',
      auth: true,
      params: [
        { name: 'id', type: 'number', description: 'Channel ID', required: true },
        { name: 'page', type: 'number', description: 'Page number (default: 1)' },
        { name: 'limit', type: 'number', description: 'Items per page (default: 20)' }
      ],
      response: {
        total: 100,
        page: 1,
        limit: 20,
        media: [/* Same as media list response */]
      }
    }
  ],
  tags: [
    {
      method: 'GET',
      path: '/api/tags',
      description: 'List all tags with counts',
      auth: true,
      response: [
        {
          tag: 'example',
          count: 42
        }
      ]
    },
    {
      method: 'POST',
      path: '/api/media/{id}/tags',
      description: 'Add tags to media',
      auth: true,
      params: [
        { name: 'id', type: 'number', description: 'Media ID', required: true }
      ],
      body: {
        tags: ['tag1', 'tag2']
      }
    },
    {
      method: 'DELETE',
      path: '/api/media/{id}/tags',
      description: 'Remove tags from media',
      auth: true,
      params: [
        { name: 'id', type: 'number', description: 'Media ID', required: true }
      ],
      body: {
        tags: ['tag1', 'tag2']
      }
    }
  ],
  webhooks: [
    {
      method: 'POST',
      path: '/api/webhooks/configure',
      description: 'Configure webhook endpoint',
      auth: true,
      body: {
        url: 'https://your-server.com/webhook',
        events: ['media.created', 'media.tagged'],
        headers: {
          'X-Custom-Header': 'value'
        }
      }
    }
  ]
};

export function ApiDocs() {
  const [selectedCategory, setSelectedCategory] = useState('media');

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderEndpoint = (endpoint: any) => (
    <AccordionItem value={endpoint.path} className="border rounded-lg mb-2">
      <AccordionTrigger className="px-4 py-2 hover:bg-gray-50">
        <div className="flex items-center gap-4">
          <Badge className={getMethodColor(endpoint.method)}>
            {endpoint.method}
          </Badge>
          <code className="text-sm">{endpoint.path}</code>
          {endpoint.auth && (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-2 space-y-4">
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-gray-600">{endpoint.description}</p>
        </div>

        {endpoint.params && endpoint.params.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Parameters</h4>
            <div className="space-y-2">
              {endpoint.params.map((param: any) => (
                <div key={param.name} className="flex items-start gap-2">
                  <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                    {param.name}
                  </code>
                  <span className="text-sm text-gray-600">
                    ({param.type}){param.required && '*'} - {param.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {endpoint.body && (
          <div>
            <h4 className="font-medium mb-2">Request Body</h4>
            <Code language="json">
              {JSON.stringify(endpoint.body, null, 2)}
            </Code>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2">Response</h4>
          <Code language="json">
            {JSON.stringify(endpoint.response, null, 2)}
          </Code>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          API Documentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="media" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Channels
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <Accordion type="single" collapsible>
              {API_ENDPOINTS[selectedCategory as keyof typeof API_ENDPOINTS].map(renderEndpoint)}
            </Accordion>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
} 