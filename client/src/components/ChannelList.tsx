import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchChannels } from "../lib/api";
import { formatDistanceToNow } from "date-fns";

export default function ChannelList() {
  const { data: channels, isLoading, refetch } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const handleRefresh = () => {
    void refetch().catch((error) => {
      console.error('Failed to refresh channels:', error);
    });
  };

  if (isLoading) return <div>Loading channels...</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh Channels"}
        </Button>
      </div>
      <div className="space-y-4">
        {channels?.map((channel) => (
          <Card key={channel.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{channel.title}</h3>
                  <Badge variant={channel.isActive ? "default" : "secondary"}>
                    {channel.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-500">{channel.link}</p>
                <div className="flex gap-4 text-sm text-zinc-400">
                  <span>Media: {channel.mediaCount || 0}</span>
                  {channel.lastChecked && (
                    <span>
                      Last check: {formatDistanceToNow(new Date(channel.lastChecked), { addSuffix: true })}
                    </span>
                  )}
                  {channel.addedAt && (
                    <span>
                      Added: {formatDistanceToNow(new Date(channel.addedAt), { addSuffix: true })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
