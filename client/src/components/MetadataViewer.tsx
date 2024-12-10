import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Image, Info } from 'lucide-react';

interface MetadataViewerProps {
  metadata: Record<string, any>;
  fileType: string;
}

export function MetadataViewer({ metadata, fileType }: MetadataViewerProps) {
  const [activeTab, setActiveTab] = useState<string>('basic');

  // Helper function to format metadata values
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  // Group metadata by category
  const groupedMetadata = {
    basic: {
      'File Name': metadata.filename,
      'File Size': metadata.fileSize,
      'MIME Type': metadata.mimeType,
      'Created At': metadata.createdAt,
      'Last Modified': metadata.lastModified,
    },
    exif: metadata.exif || {},
    technical: {
      ...metadata.technical,
      Resolution: metadata.resolution,
      Duration: metadata.duration,
      Codec: metadata.codec,
      'Bit Rate': metadata.bitRate,
    },
  };

  const renderMetadataTable = (data: Record<string, any>) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Property</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(data).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{key}</TableCell>
            <TableCell className="font-mono text-sm">
              {formatValue(value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          File Metadata
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Basic Info
            </TabsTrigger>
            {fileType === 'image' && (
              <TabsTrigger value="exif" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                EXIF Data
              </TabsTrigger>
            )}
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Technical
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="basic">
              {renderMetadataTable(groupedMetadata.basic)}
            </TabsContent>
            
            {fileType === 'image' && (
              <TabsContent value="exif">
                {Object.keys(groupedMetadata.exif).length > 0 ? (
                  renderMetadataTable(groupedMetadata.exif)
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No EXIF data available
                  </div>
                )}
              </TabsContent>
            )}
            
            <TabsContent value="technical">
              {Object.keys(groupedMetadata.technical).length > 0 ? (
                renderMetadataTable(groupedMetadata.technical)
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No technical metadata available
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
} 