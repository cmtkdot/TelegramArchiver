import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MediaGrid from "../components/MediaGrid";

export default function MediaBrowser() {
  const [channelFilter, setChannelFilter] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Media Browser</h1>
      
      <Card className="p-4 mb-6">
        <div className="flex gap-4">
          <Input
            placeholder="Filter by channel ID..."
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
          />
        </div>
      </Card>

      <MediaGrid
        channelId={channelFilter || undefined}
        page={page}
      />
    </div>
  );
}
