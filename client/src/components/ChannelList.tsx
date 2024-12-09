import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchChannels } from "../lib/api";

export default function ChannelList() {
  const { data: channels, isLoading } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  if (isLoading) return <div>Loading channels...</div>;

  return (
    <div className="space-y-4">
      {channels?.map((channel) => (
        <Card key={channel.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{channel.name}</h3>
              <p className="text-sm text-zinc-500">{channel.channelId}</p>
            </div>
            <Button
              variant="outline"
              className={channel.isActive ? "bg-green-500/10" : "bg-red-500/10"}
            >
              {channel.isActive ? "Active" : "Inactive"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
